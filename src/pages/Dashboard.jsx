import logo from '../assets/logoApp.svg'
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TasList';
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <section className="min-h-screen relative">
      <header className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 items-center justify-center">
              <img src={logo} alt="Logo" />
            </div>
            <span className="text-xl font-semibold text-[#1E293B] hidden sm:block">
              FocusList
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">¡Hola, {user?.displayName || user?.email}!</span>
            <div className="w-8 h-8 bg-gray-200 object-cover rounded-full flex items-center justify-center">
              {user?.photoURL ? 
                <img src={user.photoURL} alt="Foto de perfil" className="w-full h-full object-cover rounded-full"/> 
                : <i className="fas fa-user text-gray-600"></i>
              }
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-[#6366F1] transition-colors duration-300"
              title="Cerrar sesión"
            >
              <i className="fas fa-sign-out-alt text-xl"></i>
            </button>
          </div>
        </div>
      </header>
      <main className="pt-24 pb-8 px-4 max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/20">
          <div className="flex flex-col space-y-4">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-semibold text-gray-800">Tareas</h1>
              <div className="flex flex-col items-end">
                <span className="text-gray-500">
                  {/* {tasks.filter((t) => t.completed).length}/{tasks.length}{" "} */}
                  tareas realizadas
                </span>
                <span className="text-sm text-[#6366F1] font-medium mt-1">
                  {/* {getMotivationalMessage()} */}
                  Vas bien!
                </span>
              </div>
            </div>
            <div className="w-full">
              <TaskForm />
            </div>
          </div>
        </div>
      </main>
      <TaskList/>
    </section>
  )
}

export default Dashboard
