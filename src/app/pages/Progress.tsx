import React from 'react';
import { COURSES } from '../data/mockData';
import { CheckCircle2, Circle, TrendingUp, Book, Award } from 'lucide-react';

export const Progress = () => {
  const startedCourses = COURSES.filter(c => c.progress > 0);
  
  // Mock overall stats
  const totalCompleted = startedCourses.filter(c => c.progress === 100).length;
  const totalInProgress = startedCourses.filter(c => c.progress < 100).length;
  
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Mi Progreso</h1>
        
        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Promedio general</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">65%</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Book size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Cursos en progreso</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalInProgress}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Cursos completados</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalCompleted}</p>
            </div>
          </div>
        </div>

        {/* Detailed Progress */}
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Detalle por curso</h2>
        <div className="space-y-6">
          {startedCourses.map(course => (
            <div key={course.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <img src={course.image} alt="" className="w-16 h-12 object-cover rounded shadow-sm" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{course.title}</h3>
                    <p className="text-sm text-slate-500">{course.modules.length} módulos en total</p>
                  </div>
                </div>
                <div className="w-full md:w-48 text-right">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-500">Completado</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Modules breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                {course.modules.map(mod => (
                  <div key={mod.id} className="flex flex-col gap-2">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{mod.title}</span>
                    <div className="space-y-1.5 pl-2 border-l-2 border-slate-100 dark:border-slate-800">
                      {mod.items.map(item => (
                        <div key={item.id} className="flex items-center gap-2 text-sm">
                          {item.completed ? (
                            <CheckCircle2 size={14} className="text-emerald-500" />
                          ) : (
                            <Circle size={14} className="text-slate-300 dark:text-slate-600" />
                          )}
                          <span className={item.completed ? 'text-slate-900 dark:text-white' : 'text-slate-500'}>
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {startedCourses.length === 0 && (
            <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500">
              No tienes cursos en progreso. Empieza uno para ver tus estadísticas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
