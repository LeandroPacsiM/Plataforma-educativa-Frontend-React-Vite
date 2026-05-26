import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { COURSES } from '../data/mockData';
import { Play, Info } from 'lucide-react';

export const Courses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Catálogo de Cursos</h1>
          <p className="text-slate-600 dark:text-slate-400">Explora todos los cursos disponibles en la plataforma.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map(course => (
            <div key={course.id} className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white line-clamp-2">{course.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
                  {course.description}
                </p>
                
                {user?.purchasedCourses?.includes(course.id) ? (
                  <button 
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-md font-medium transition-colors mt-auto"
                  >
                    <Play size={18} /> Continuar curso
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate(`/course-details/${course.id}`)}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 py-2.5 rounded-md font-medium transition-colors mt-auto"
                  >
                    <Info size={18} /> Ver información
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
