import Background from "../components/Background";
import Form from "../components/Form";

const Register = () => {

  return (
    <section className="min-h-screen relative overflow-hidden">
      <Background />
      <Form
        title="¡Te damos la bienvenida!"
        subtitle="Crea tu cuenta para empezar"
        buttonText="Registrarse"
        altText="¿Ya tienes cuenta?"
        altLinkText="Inicia sesión aquí"
        altLinkHref="/"
        isRegister={true}
      />
    </section>
  );
};

export default Register;
