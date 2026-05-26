import React, { useState } from "react";
import {
  useParams,
  useOutletContext,
  Navigate,
  useNavigate,
} from "react-router";
import { COURSES } from "../../data/mockData";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

export const QuizView = () => {
  const { quizId } = useParams();
  const { course } = useOutletContext<{
    course: (typeof COURSES)[0];
  }>();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<
    number | null
  >(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Find quiz details
  let currentQuiz = null;
  for (const mod of course.modules) {
    const found = mod.items.find((i) => i.id === quizId);
    if (found) currentQuiz = found;
  }

  if (!currentQuiz) {
    return <div>Quiz not found.</div>;
  }

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const isCorrect = selectedOption === 1; // Mock: Option 1 is always correct

  return (
    <div className="max-w-3xl mx-auto w-full p-6 md:p-12 pb-24">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-medium rounded-full mb-4">
          Cuestionario Obligatorio
        </span>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {currentQuiz.title}
        </h1>
        <p className="text-slate-500">
          Responde correctamente para avanzar en el curso.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6 text-sm font-medium text-slate-500">
          <span>Pregunta 1 de 1</span>
          <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            Progreso: 0%
          </span>
        </div>

        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-6">
          ¿Cuál de las siguientes afirmaciones es la más
          acertada basándose en el contenido anterior?
        </h3>

        <div className="space-y-3">
          {[
            "Es una herramienta obsoleta para el desarrollo moderno.",
            "Es fundamental para construir la estructura y el diseño inicial.",
            "Solo se utiliza en aplicaciones móviles nativas.",
            "No requiere ningún conocimiento previo de lógica.",
          ].map((text, idx) => {
            const isSelected = selectedOption === idx;
            let optionClass =
              "border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800";

            if (isSubmitted) {
              if (idx === 1)
                optionClass =
                  "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-500/50 text-emerald-900 dark:text-emerald-100";
              else if (isSelected)
                optionClass =
                  "border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-500/50 text-red-900 dark:text-red-100";
              else
                optionClass =
                  "border-slate-200 dark:border-slate-800 opacity-50";
            } else if (isSelected) {
              optionClass =
                "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-500";
            }

            return (
              <label
                key={idx}
                className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${optionClass} ${isSubmitted ? "pointer-events-none" : ""}`}
              >
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="radio"
                    name="quiz-option"
                    className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-600"
                    checked={isSelected}
                    onChange={() => setSelectedOption(idx)}
                    disabled={isSubmitted}
                  />
                </div>
                <div className="flex-1 text-sm font-medium">
                  {text}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {isSubmitted && (
        <div
          className={`p-6 rounded-xl border ${isCorrect ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800" : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"} flex items-start gap-4 mb-8`}
        >
          {isCorrect ? (
            <CheckCircle2 className="text-emerald-500 mt-1 shrink-0" />
          ) : (
            <XCircle className="text-red-500 mt-1 shrink-0" />
          )}
          <div>
            <h4
              className={`font-bold ${isCorrect ? "text-emerald-900 dark:text-emerald-100" : "text-red-900 dark:text-red-100"}`}
            >
              {isCorrect
                ? "¡Correcto! Has aprobado el cuestionario."
                : "Incorrecto. Debes intentarlo de nuevo."}
            </h4>
            <p
              className={`text-sm mt-1 ${isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}
            >
              {isCorrect
                ? "Puedes avanzar a la siguiente sección del curso."
                : "Revisa el material de la lección anterior e inténtalo nuevamente para poder avanzar."}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 md:left-80 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center z-20">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="ml-auto bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-2 rounded-md font-medium text-sm transition-colors"
          >
            Enviar respuestas
          </button>
        ) : (
          <>
            {!isCorrect && (
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedOption(null);
                }}
                className="border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 px-5 py-2 rounded-md font-medium text-sm transition-colors"
              >
                Reintentar
              </button>
            )}
            <button
              disabled={!isCorrect}
              className="ml-auto flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:bg-slate-300 text-white px-5 py-2 rounded-md font-medium text-sm transition-colors"
            >
              Siguiente <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};