import React from 'react';
import { BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <span className="font-bold text-lg text-slate-900 dark:text-white">EduPlat</span>
        </div>
        
        <div className="text-sm">
          &copy; {new Date().getFullYear()} EduPlat. Todos los derechos reservados.
        </div>
        
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-indigo-600 transition-colors">Términos Legales</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Privacidad</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
};
