import React from 'react';
import { useNavigate } from 'react-router';
import { COURSES } from '../data/mockData';
import { Play } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20 px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white">
            Aprende a tu ritmo, <span className="text-indigo-600">domina tu futuro</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Únete a nuestra plataforma educativa y descubre un flujo de aprendizaje diseñado para que nunca te pierdas y siempre avances.
          </p>
          <button onClick={() => navigate('/login')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md font-medium text-lg transition-colors shadow-sm">
            Comenzar ahora
          </button>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Cursos Destacados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map(course => (
              <div key={course.id} className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white line-clamp-2">{course.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
                    {course.description}
                  </p>
                  <button onClick={handleCourseClick} className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white py-2.5 rounded-md font-medium transition-colors mt-auto">
                    <Play size={18} /> Ver curso
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
