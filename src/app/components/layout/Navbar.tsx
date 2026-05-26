import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { BookOpen, Moon, Sun, User as UserIcon, LogOut, Settings, ShoppingCart, Trash2 } from 'lucide-react';
import { COURSES } from '../../data/mockData';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-indigo-600 ${
      isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-600 dark:text-slate-300'
    } py-2`;

  const cartCourses = cartItems.map(id => COURSES.find(c => c.id === id)).filter(Boolean) as typeof COURSES;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">EduPlat</span>
        </Link>

        {/* Center/Right Navigation based on Auth state */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              {/* Logged In Nav */}
              <nav className="hidden md:flex items-center gap-6">
                <NavLink to="/courses" className={navLinkClass}>Cursos</NavLink>
                <NavLink to="/dashboard" className={navLinkClass} end>Mis cursos</NavLink>
                <NavLink to="/progress" className={navLinkClass}>Progreso</NavLink>
                <NavLink to="/certificates" className={navLinkClass}>Certificados</NavLink>
              </nav>

              <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-4">
                
                {/* Cart Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="p-2 relative text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Shopping cart"
                  >
                    <ShoppingCart size={20} />
                    {cartItems.length > 0 && (
                      <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        {cartItems.length}
                      </span>
                    )}
                  </button>

                  {isCartOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-md shadow-lg border border-slate-200 dark:border-slate-800 py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <span className="font-semibold text-slate-900 dark:text-white">Carrito ({cartItems.length})</span>
                        <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm">Cerrar</button>
                      </div>
                      
                      {cartItems.length === 0 ? (
                        <div className="p-6 text-center text-sm text-slate-500">Tu carrito está vacío</div>
                      ) : (
                        <>
                          <div className="max-h-60 overflow-y-auto px-2">
                            {cartCourses.map(course => (
                              <div key={course.id} className="flex gap-3 p-2 border-b border-slate-50 dark:border-slate-800/50 last:border-0">
                                <img src={course.image} alt={course.title} className="w-12 h-12 rounded object-cover" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{course.title}</p>
                                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">${course.price}</p>
                                </div>
                                <button onClick={() => removeFromCart(course.id)} className="text-slate-400 hover:text-red-500 px-1">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total:</span>
                              <span className="text-lg font-bold text-slate-900 dark:text-white">${cartTotal.toFixed(2)}</span>
                            </div>
                            <button 
                              onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                              className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium text-sm hover:bg-indigo-700 transition-colors"
                            >
                              Proceder al pago
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle theme">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                
                {/* User Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center justify-center h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 dark:bg-indigo-900 dark:text-indigo-300"
                  >
                    {user.initials}
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-md shadow-lg border border-slate-200 dark:border-slate-800 py-1 z-50">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-left">
                        <LogOut size={16} /> Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Logged Out Nav */}
              <div className="flex items-center gap-4">
                <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle theme">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <Link to="/login" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2 transition-colors">
                  Iniciar sesión
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
