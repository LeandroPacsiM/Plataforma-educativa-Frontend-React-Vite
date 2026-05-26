import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { COURSES } from '../data/mockData';
import { PlayCircle, Clock } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filter courses based on user purchases
  const myCourses = COURSES.filter(c => user?.purchasedCourses?.includes(c.id));
  const availableCourses = COURSES.filter(c => !user?.purchasedCourses?.includes(c.id));

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Mis Cursos */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mis cursos</h2>
            <button onClick={() => navigate('/progress')} className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium">
              Ver todo mi progreso
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myCourses.map(course => (
              <div key={course.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row hover:shadow-md transition-shadow">
                <div className="w-full sm:w-48 h-40 sm:h-auto shrink-0 relative">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 line-clamp-2">{course.title}</h3>
                  <div className="flex items-center text-sm text-slate-500 mb-4 gap-2">
                    <Clock size={14} />
                    <span>Última actividad hace 2 días</span>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-slate-600 dark:text-slate-400">Progreso</span>
                      <span className="text-slate-900 dark:text-white">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <button 
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="w-full flex justify-center items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      <PlayCircle size={16} /> Continuar aprendiendo
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {myCourses.length === 0 && (
              <div className="col-span-full py-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500">
                Aún no has comenzado ningún curso.
              </div>
            )}
          </div>
        </section>

        {/* Cursos Disponibles */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Cursos disponibles</h2>
            <button onClick={() => navigate('/courses')} className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium">
              Explorar catálogo
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map(course => (
              <div key={course.id} className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white line-clamp-2">{course.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
                    {course.description}
                  </p>
                  <button 
                    onClick={() => navigate(`/course-details/${course.id}`)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 py-2.5 rounded-md text-sm font-medium transition-colors"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
};
