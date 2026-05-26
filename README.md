# EduPlat — Plataforma Educativa

EduPlat es un prototipo funcional de plataforma de aprendizaje en línea (e-learning) construido con **React 18**, **TypeScript**, **Vite 6** y **Tailwind CSS 4**. Es una SPA frontend sin backend — todos los datos son simulados con datos mock y la autenticación es ficticia.

## Funcionalidades

- **Landing pública** — Hero section con cursos destacados y CTA.
- **Autenticación simulada** — Inicio de sesión con un clic (Google mock) con usuario hardcodeado.
- **Catálogo de cursos** — Vista completa de todos los cursos con botones contextuales (continuar / ver información).
- **Detalle de curso** — Página de aterrizaje por curso con descripción, temario, precio y acciones de compra.
- **Carrito de compras** — Carrito global en el navbar con resumen y enlace al checkout.
- **Checkout / Pago** — Formulario de pago falso con campos de tarjeta, estado de carga y confirmación.
- **Dashboard** — Cursos comprados del usuario con barras de progreso + cursos disponibles.
- **Reproductor de curso** — Layout con sidebar de módulos/temas, navegación entre lecciones y quizzes.
- **Lecciones** — Reproductor de video simulado con contenido textual y marcado de completado.
- **Quizzes** — Cuestionario de una pregunta con retroalimentación inmediata y reintento.
- **Progreso** — Estadísticas generales (promedio, en progreso, completados) y desglose por curso.
- **Certificados** — Certificados descargables (mock) para cursos completados al 100 %.
- **Modo oscuro / claro** — Alternable desde el navbar.

## Tecnologías

| Categoría | Librerías |
|---|---|
| Framework | React 18, TypeScript 6 |
| Build | Vite 6, `@vitejs/plugin-react` |
| Estilos | Tailwind CSS 4, `tw-animate-css`, `tailwind-merge`, `clsx`, `class-variance-authority` |
| Routing | `react-router` 7.13 |
| UI | Radix UI (20+ paquetes), shadcn-style components, Lucide React |
| Charts | `recharts` |
| Formularios | `react-hook-form`, `input-otp` |
| Animaciones | `motion` (framer-motion), `canvas-confetti` |
| Carousel | `embla-carousel-react` |
| Calendario | `react-day-picker`, `date-fns` |
| Drag & Drop | `react-dnd` |
| Otros | `cmdk`, `vaul`, `sonner`, `react-resizable-panels`, `react-popper` |

## Estructura del proyecto

```
src/
  main.tsx                         — Punto de entrada
  app/
    App.tsx                        — Providers: Auth → Cart → Router
    routes.tsx                     — Definición de rutas con guards
    data/mockData.ts               — Datos mock de cursos
    context/
      AuthContext.tsx              — Estado de usuario (login/logout)
      CartContext.tsx              — Estado del carrito
    components/
      layout/                      — RootLayout, Navbar, Footer, AuthRoute
      ui/                          — 41 componentes tipo shadcn/ui
      figma/                       — ImageWithFallback
    pages/
      Home.tsx, Login.tsx, Dashboard.tsx, Courses.tsx,
      CourseLanding.tsx, Checkout.tsx, Progress.tsx, Certificates.tsx
      course/
        CourseLayout.tsx, LessonView.tsx, QuizView.tsx
```

## Requisitos

- **Node.js** 18+
- **pnpm** 8+

## Ejecutar en desarrollo

```bash
pnpm install
pnpm run dev
```

## Build de producción

```bash
pnpm run build
```

El output se genera en la carpeta `dist/`.
  