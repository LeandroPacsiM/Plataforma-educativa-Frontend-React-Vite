import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { COURSES } from '../data/mockData';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';

export const Checkout = () => {
  const { user, purchaseCourses } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cartCourses = cartItems.map(id => COURSES.find(c => c.id === id)).filter(Boolean) as typeof COURSES;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      purchaseCourses(cartItems);
      clearCart();
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center border border-slate-200 dark:border-slate-800">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">¡Pago exitoso!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Tus cursos han sido añadidos a tu cuenta y ya puedes comenzar a estudiar.
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Ir a mi Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Tu carrito está vacío</h2>
        <p className="text-slate-500 mb-8">No has añadido ningún curso para comprar.</p>
        <button onClick={() => navigate('/courses')} className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
          Explorar cursos
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Finalizar Compra</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Payment Form */}
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <CreditCard className="text-indigo-600" /> Método de pago
            </h2>
            
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre en la tarjeta</label>
                <input 
                  type="text" 
                  required 
                  defaultValue={user?.name}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Número de tarjeta</label>
                <div className="relative">
                  <input 
                    type="text" 
                    required 
                    maxLength={19}
                    className="w-full px-4 py-3 pl-12 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                    placeholder="0000 0000 0000 0000"
                  />
                  <CreditCard className="absolute left-4 top-3.5 text-slate-400" size={20} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Vencimiento</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="MM/AA"
                    maxLength={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">CVC</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isProcessing ? 'Procesando pago...' : `Pagar $${cartTotal.toFixed(2)}`}
              </button>
              
              <p className="text-xs text-center text-slate-500 flex items-center justify-center gap-1 mt-4">
                <Lock size={12} /> Pagos seguros y encriptados. Esto es una demo.
              </p>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-[400px]">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Resumen del pedido</h2>
              
              <div className="space-y-4 mb-6">
                {cartCourses.map(course => (
                  <div key={course.id} className="flex gap-4">
                    <img src={course.image} alt="" className="w-16 h-12 object-cover rounded shadow-sm shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">{course.title}</h4>
                      <p className="text-sm text-slate-500">${course.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Impuestos</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
