import Background from "../components/Background";
import Form from "../components/Form";

const Login = () => {

  return (
    <section className="min-h-screen relative overflow-hidden">
      <Background />
      <Form
        title="¡Qué chevere verte otra vez!"
        subtitle="Por favor ingresa tus credenciales para continuar"
        buttonText="Iniciar Sesión"
        altText="¿No tienes una cuenta?"
        altLinkText="Regístrate aquí"
        altLinkHref="/register"
        isRegister={false}
      />
    </section>
  );
};

export default Login;
