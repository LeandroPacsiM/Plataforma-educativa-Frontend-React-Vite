export const COURSES = [
  {
    id: 'c1',
    title: 'Desarrollo Web Frontend',
    description: 'Aprende a crear sitios web modernos con HTML, CSS, JavaScript y React.',
    image: 'https://images.unsplash.com/photo-1762329352849-f4d0c9e7696a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvdXJzZXxlbnwxfHx8fDE3Nzg0Mjk4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 45,
    price: 49.99,
    modules: [
      {
        id: 'm1', title: 'Fundamentos', items: [
          { id: 'l1', type: 'lesson', title: 'Introducción a la web', completed: true },
          { id: 'l2', type: 'lesson', title: 'HTML Básico', completed: true },
          { id: 'q1', type: 'quiz', title: 'Quiz de Fundamentos', completed: true, passed: true },
        ]
      },
      {
        id: 'm2', title: 'Estilos y CSS', items: [
          { id: 'l3', type: 'lesson', title: 'CSS Box Model', completed: false },
          { id: 'l4', type: 'lesson', title: 'Flexbox y Grid', completed: false },
          { id: 'q2', type: 'quiz', title: 'Quiz de CSS', completed: false, passed: false },
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Diseño UX/UI Avanzado',
    description: 'Domina los principios de experiencia de usuario y diseño de interfaces con Figma.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbiUyMGNvdXJzZXxlbnwxfHx8fDE3Nzg0Mjk4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 100,
    price: 59.99,
    modules: [
       {
        id: 'm3', title: 'Investigación', items: [
          { id: 'l5', type: 'lesson', title: 'User Personas', completed: true },
          { id: 'q3', type: 'quiz', title: 'Quiz de UX', completed: true, passed: true },
        ]
      }
    ]
  },
  {
    id: 'c3',
    title: 'Ciencia de Datos con Python',
    description: 'Inicia tu camino en el mundo de los datos aprendiendo Python, Pandas y Machine Learning básico.',
    image: 'https://images.unsplash.com/photo-1634464660153-468d44306ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGNvdXJzZXxlbnwxfHx8fDE3Nzg0Mjk4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 0,
    price: 69.99,
    modules: [
       {
        id: 'm4', title: 'Introducción a Python', items: [
          { id: 'l6', type: 'lesson', title: 'Sintaxis básica', completed: false },
          { id: 'q4', type: 'quiz', title: 'Quiz de Python', completed: false, passed: false },
        ]
      }
    ]
  }
];
