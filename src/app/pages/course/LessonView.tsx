import React from 'react';
import { useParams, useOutletContext, Navigate, useNavigate } from 'react-router';
import { COURSES } from '../../data/mockData';
import { Check, ArrowRight } from 'lucide-react';

export const LessonView = () => {
  const { lessonId } = useParams();
  const { course } = useOutletContext<{ course: typeof COURSES[0] }>();
  const navigate = useNavigate();

  // Find lesson details
  let currentLesson = null;
  for (const mod of course.modules) {
    const found = mod.items.find(i => i.id === lessonId);
    if (found) currentLesson = found;
  }

  if (!currentLesson) {
    // Fallback to first item if lesson not found or no lesson selected
    const firstItem = course.modules[0]?.items[0];
    if (firstItem) {
       return <Navigate to={`/course/${course.id}/${firstItem.type}/${firstItem.id}`} replace />;
    }
    return <div>No content found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto w-full p-6 md:p-12 pb-24">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 text-xs font-medium rounded-full mb-4">
          Lección
        </span>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{currentLesson.title}</h1>
      </div>

      {/* Mock Video Player */}
      <div className="w-full aspect-video bg-slate-900 rounded-xl mb-10 relative flex items-center justify-center overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img src={course.image} alt="" className="w-full h-full object-cover blur-sm" />
        </div>
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors z-10">
          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent ml-1"></div>
        </div>
      </div>

      {/* Mock Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p>
          En esta lección cubriremos los conceptos fundamentales de <strong>{currentLesson.title}</strong>. 
          Asegúrate de tomar notas y revisar los materiales adjuntos antes de pasar al siguiente módulo o cuestionario.
        </p>
        <h3>Puntos clave</h3>
        <ul>
          <li>Comprender la base teórica.</li>
          <li>Aplicar los conceptos en ejercicios prácticos.</li>
          <li>Prepararse para la evaluación de la sección.</li>
        </ul>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 md:left-80 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center z-20">
        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
            currentLesson.completed 
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
              : 'border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Check size={18} />
          {currentLesson.completed ? 'Completada' : 'Marcar como completada'}
        </button>

        <button 
          onClick={() => { /* In a real app, find next route */ }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md font-medium text-sm transition-colors"
        >
          Siguiente <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
