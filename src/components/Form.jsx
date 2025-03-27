import "../App.css";
import logo from "../assets/logoApp.svg";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
} from "../firebase/auth";

const Form = ({
  title,
  subtitle,
  buttonText,
  altText,
  altLinkText,
  altLinkHref,
  isRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) newErrors.email = "Por favor, ingresa un correo.";
    if (!trimmedPassword)
      newErrors.password = "Por favor, ingresa una contraseña.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmedEmail && !emailRegex.test(trimmedEmail))
      newErrors.email = "Formato de correo inválido.";

    if (trimmedPassword && trimmedPassword.length < 6)
      newErrors.password = "Debe tener al menos 6 caracteres.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const getFirebaseErrorMessage = (code) => {
      switch (code) {
        case "auth/email-already-in-use":
          return "Este correo ya está registrado. Intenta con otro.";
        case "auth/invalid-email":
          return "El formato del correo no es válido.";
        case "auth/weak-password":
          return "La contraseña debe tener al menos 6 caracteres.";
        case "auth/missing-password":
          return "Por favor, ingresa una contraseña.";
        case "auth/user-not-found":
          return "No existe una cuenta con este correo.";
        case "auth/wrong-password":
          return "La contraseña es incorrecta.";
        case "auth/popup-closed-by-user":
          return "Cerraste la ventana de Google antes de completar el proceso.";
        case "auth/cancelled-popup-request":
          return "Ya tienes una ventana emergente abierta.";
        default:
          return "Ocurrió un error. Intenta de nuevo.";
      }
    };

    try {
      if (isRegister) {
        await registerWithEmail(trimmedEmail, trimmedPassword);
        alert("Registro exitoso");
      } else {
        await loginWithEmail(trimmedEmail, trimmedPassword);
        alert("Inicio de sesión exitoso");
      }

      navigate("/dashboard");
    } catch (error) {
      setErrors({ general: getFirebaseErrorMessage(error.code) });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      setErrors({ general: getFirebaseErrorMessage(error.code) });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 relative z-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center animate-fade-in">
          <img src={logo} alt="Logo" className="h-12 mx-auto mb-4" />
          <h2 className="text-gradient text-3xl font-bold">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-purple-100 hover:shadow-xl transition-all duration-300">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-indigo-400"></i>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${
                    errors.email
                      ? "border-red-500 block w-full pl-10 !rounded-button bg-white text-gray-900 shadow-sm focus:ring-custom focus:border-custom sm:text-sm"
                      : "block w-full pl-10 !rounded-button border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-custom focus:border-custom sm:text-sm"
                  }`}
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-indigo-400"></i>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${
                    errors.password
                      ? "border-red-500 block w-full pl-10 !rounded-button bg-white text-gray-900 shadow-sm focus:ring-custom focus:border-custom sm:text-sm"
                      : "block w-full pl-10 !rounded-button border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-custom focus:border-custom sm:text-sm"
                  }`}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            {errors.general && (
              <p className="text-red-500 text-sm mt-2">{errors.general}</p>
            )}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 button-gradient"
              >
                {buttonText}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  O continúa con
                </span>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 !rounded-button shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom transition-all duration-300"
                onClick={handleGoogleLogin}
              >
                <img
                  className="h-5 w-5 mr-2"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                />
                <span>Google</span>
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
              {altText}
              <Link
                to={altLinkHref}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {altLinkText}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
