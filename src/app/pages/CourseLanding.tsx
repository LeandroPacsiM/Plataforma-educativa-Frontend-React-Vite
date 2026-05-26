import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { COURSES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Check, ShoppingCart, PlayCircle, Star, Clock, Book } from 'lucide-react';

export const CourseLanding = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, addToCart } = useCart();
  
  const course = COURSES.find(c => c.id === courseId);
  
  if (!course) {
    return <div className="p-10 text-center">Curso no encontrado</div>;
  }

  const isPurchased = user?.purchasedCourses?.includes(course.id);
  const isInCart = cartItems.includes(course.id);

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto max-w-5xl px-4 flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{course.title}</h1>
            <p className="text-lg text-slate-300 max-w-xl">{course.description}</p>
            
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1"><Star size={16} className="text-amber-400" /> 4.8 (2.5k reseñas)</span>
              <span className="flex items-center gap-1"><Book size={16} /> {course.modules.length} módulos</span>
              <span className="flex items-center gap-1"><Clock size={16} /> 12 horas</span>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <span className="text-3xl font-bold">${course.price}</span>
              <span className="text-lg text-slate-500 line-through">${(course.price * 1.5).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-6 shadow-sm" />
              
              {isPurchased ? (
                <button 
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold text-lg transition-colors"
                >
                  <PlayCircle size={20} /> Ir al curso
                </button>
              ) : isInCart ? (
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-bold text-lg transition-colors"
                >
                  <Check size={20} /> En el carrito - Pagar
                </button>
              ) : (
                <div className="space-y-3">
                  <button 
                    onClick={() => { addToCart(course.id); navigate('/checkout'); }}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold text-lg transition-colors"
                  >
                    Comprar ahora
                  </button>
                  <button 
                    onClick={() => addToCart(course.id)}
                    className="w-full flex items-center justify-center gap-2 border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 py-2.5 rounded-lg font-bold transition-colors"
                  >
                    <ShoppingCart size={20} /> Añadir al carrito
                  </button>
                </div>
              )}
              
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Acceso de por vida</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Certificado de finalización</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Proyectos prácticos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus / Content Section */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Contenido del curso</h2>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          {course.modules.map((mod, index) => (
            <div key={mod.id} className={`border-b border-slate-100 dark:border-slate-800 last:border-0 p-6 ${index % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-900/50' : 'bg-white dark:bg-slate-900'}`}>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">{mod.title}</h3>
              <ul className="space-y-3">
                {mod.items.map(item => (
                  <li key={item.id} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <PlayCircle size={18} className="mt-0.5 opacity-50 shrink-0" />
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
