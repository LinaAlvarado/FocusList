import "../App.css";
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTaskContext } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

const TaskForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addTask } = useTaskContext();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "baja",
    category: "personal",
    dueDate: "",
    notifications: false,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (!form.title.trim()) {
      alert("El título es obligatorio");
      return;
    }
    if (!form.dueDate.trim()) {
      alert("Debes elegir una fecha de vencimiento");
      return;
    }
    
    const selectedDate = new Date(form.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      alert("La fecha de vencimiento no puede ser en el pasado");
      return;
    }
    
    if (!user) {
      alert("Error: Usuario no autenticado");
      return;
    }

  try {
    await addTask(form, user.uid);
    console.log("Tarea creada:", form);
    
    // Resetea el formulario correctamente
    setForm({
      title: "",
      description: "",
      priority: "baja",
      category: "personal",
      dueDate: "",
      notifications: false,
    });

    setIsOpen(false);
  } catch (error) {
    console.error("Error al agregar tarea:", error);
  }
  };
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="!rounded-button w-full md:w-auto button-gradient text-white px-6 py-2.5 flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
      >
        <i className="fas fa-plus mr-2"></i>
        <span>Agregar Tarea</span>
        <i className="fas fa-sparkles"></i>
      </button>

      {isOpen && createPortal(
        <form onSubmit={handleSubmit} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-[0_8px_32px_rgba(99,102,241,0.1)] border border-white/30 transform transition-all duration-300 scale-100 animate-fadeIn">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 gradient rounded-xl flex items-center justify-center transform rotate-3">
                <i className="fas fa-magic text-white text-lg"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gradient bg-clip-text text-transparent">
                Nueva Tarea
              </h2>
            </div>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fas fa-tasks text-gray-400 text-lg"></i>
              </div>
              <input
                type="text"
                placeholder="Título de la tarea"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full bg-white/50 border border-[#E2E8F0] rounded-xl pl-12 pr-11 py-3.5 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none transition-all duration-300 text-base hover:shadow-md focus:shadow-lg focus:bg-white"
              />
              <button className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <i className="fas fa-microphone text-gray-400 hover:text-[#6366F1] cursor-pointer"></i>
              </button>
            </div>
            <div className="relative mb-4">
              <div className="absolute top-3 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fas fa-align-left text-gray-400"></i>
              </div>
              <textarea
                placeholder="Descripción"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full bg-white/50 border border-[#E2E8F0] rounded-xl pl-11 pr-11 py-3 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none transition-all duration-300 hover:shadow-md focus:shadow-lg focus:bg-white"
                rows={3}
              />
              <button className="absolute top-3 right-0 pr-4 flex items-center">
                <i className="fas fa-microphone text-gray-400 hover:text-[#6366F1] cursor-pointer"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridad
                </label>
                <div className="relative">
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}                  
                    className="w-full bg-white/50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 appearance-none hover:shadow-md focus:shadow-lg transition-all duration-300 focus:bg-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none"
                  >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i className="fas fa-chevron-down text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <div className="relative">
                  <select
                    name="category"                  
                    value={form.category}
                    onChange={handleChange}                    
                    className="w-full bg-white/50 border border-[#E2E8F0] rounded-xl px-3 py-2.5 appearance-none hover:shadow-md focus:shadow-lg transition-all duration-300 focus:bg-white focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none"
                  >
                    <option value="personal">Personal</option>
                    <option value="trabajo">Trabajo</option>
                    <option value="proyecto">Proyecto</option>
                    <option value="familia">Familia</option>
                    <option value="otros">Otros</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i className="fas fa-chevron-down text-gray-400"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de vencimiento
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="far fa-calendar-alt text-gray-400"></i>
                </div>
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange} 
                  className="w-full bg-white/50 border border-[#E2E8F0] rounded-xl pl-10 py-2.5 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none hover:shadow-md focus:shadow-lg transition-all duration-300 focus:bg-white"
                />
              </div>
            </div>
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={form.notifications}
                onChange={handleCheckboxChange}
                className="h-5 w-5 text-[#6366F1] focus:ring-[#6366F1] focus:ring-offset-0 border-gray-300 rounded-lg transition-all duration-300 cursor-pointer"
              />
              <label
                htmlFor="notifications"
                className="ml-2 block text-sm text-gray-700"
              >
                Activar notificaciones de vencimiento
              </label>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setIsOpen(false)}
                className="!rounded-button px-6 py-2.5 text-gray-600 hover:bg-gray-100 transition-all duration-300 cursor-pointer whitespace-nowrap hover:shadow-md border border-gray-200"
              >
                <i className="fas fa-times mr-2"></i>
                Cancelar
              </button>
              <button
                type="submit"
                className="!rounded-button gradient text-white px-6 py-2.5 hover:from-[#4F46E5] hover:to-[#4338CA] transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform flex items-center"
              >
                <i className="fas fa-magic mr-2"></i>
                Crear Tarea
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </form>,
        document.getElementById('portal')
      )}
    </>
  )
}

export default TaskForm
