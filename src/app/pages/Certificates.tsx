import React from 'react';
import { COURSES } from '../data/mockData';
import { Award, Download } from 'lucide-react';

export const Certificates = () => {
  // A course is complete if progress is 100 (which implies all lessons and quizzes are done and passed)
  const completedCourses = COURSES.filter(c => c.progress === 100);

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Mis Certificados</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Descarga los certificados de los cursos que has completado al 100% y con los cuestionarios aprobados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedCourses.map(course => (
            <div key={course.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center p-8 text-center hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
                <Award size={40} className="text-amber-500" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{course.title}</h3>
              <p className="text-sm text-slate-500 mb-8">Completado con éxito. Todas las evaluaciones aprobadas.</p>
              
              <button className="mt-auto w-full flex justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 py-2.5 rounded-md font-medium transition-colors">
                <Download size={18} /> Descargar PDF
              </button>
            </div>
          ))}
          
          {completedCourses.length === 0 && (
            <div className="col-span-full py-16 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center">
              <Award size={48} className="text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Aún no tienes certificados</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                Completa un curso al 100% y aprueba sus cuestionarios para desbloquear tu certificado aquí.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
