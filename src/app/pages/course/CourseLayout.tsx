import React, { useState } from 'react';
import { Outlet, useParams, useNavigate, NavLink, Navigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { COURSES } from '../../data/mockData';
import { PlayCircle, CheckCircle2, Circle, HelpCircle, Menu, X, ArrowLeft } from 'lucide-react';

export const CourseLayout = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const course = COURSES.find(c => c.id === courseId);

  // If course doesn't exist, or user hasn't purchased it, redirect
  if (!course || !user?.purchasedCourses?.includes(course.id)) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-white dark:bg-slate-950 h-[calc(100vh-64px)] overflow-hidden">
      
      {/* Mobile Sidebar Toggle & Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <button onClick={() => navigate('/dashboard')} className="text-slate-500">
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-semibold text-sm truncate px-4">{course.title}</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-500">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        absolute md:static inset-0 z-40 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
        w-full md:w-80 flex-shrink-0 flex flex-col transition-transform transform md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header (Desktop) */}
        <div className="hidden md:flex p-6 border-b border-slate-200 dark:border-slate-800 items-start gap-3">
          <button onClick={() => navigate('/dashboard')} className="mt-1 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="Volver al dashboard">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white leading-tight mb-2">{course.title}</h2>
            <div className="flex items-center gap-2">
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden flex-1">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
              <span className="text-xs font-medium text-slate-500">{course.progress}%</span>
            </div>
          </div>
        </div>

        {/* Course Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {course.modules.map(mod => (
            <div key={mod.id}>
              <h3 className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-3 px-2">
                {mod.title}
              </h3>
              <div className="space-y-1">
                {mod.items.map(item => (
                  <NavLink
                    key={item.id}
                    to={item.type === 'lesson' ? `/course/${course.id}/lesson/${item.id}` : `/course/${course.id}/quiz/${item.id}`}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) => `
                      flex items-start gap-3 p-3 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50'
                      }
                    `}
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.completed ? (
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      ) : (
                        item.type === 'lesson' 
                          ? <PlayCircle size={16} className="opacity-60" />
                          : <HelpCircle size={16} className="opacity-60" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium leading-tight">{item.title}</div>
                      <div className="text-xs opacity-70 mt-1">{item.type === 'lesson' ? 'Lección' : 'Cuestionario'}</div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-950 relative">
        <Outlet context={{ course }} />
      </main>
      
    </div>
  );
};
