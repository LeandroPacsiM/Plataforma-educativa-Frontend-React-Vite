import React from 'react';
import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/layout/RootLayout';
import { ProtectedRoute, PublicRoute } from './components/layout/AuthRoute';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { CourseLayout } from './pages/course/CourseLayout';
import { LessonView } from './pages/course/LessonView';
import { QuizView } from './pages/course/QuizView';
import { Progress } from './pages/Progress';
import { Certificates } from './pages/Certificates';
import { CourseLanding } from './pages/CourseLanding';
import { Checkout } from './pages/Checkout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      // Public routes (accessible only if NOT logged in)
      {
        element: <PublicRoute />,
        children: [
          { index: true, Component: Home },
          { path: 'login', Component: Login },
        ],
      },
      
      // Protected routes (accessible only if logged in)
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard', Component: Dashboard },
          { path: 'courses', Component: Courses },
          { path: 'course-details/:courseId', Component: CourseLanding },
          { path: 'checkout', Component: Checkout },
          { path: 'progress', Component: Progress },
          { path: 'certificates', Component: Certificates },
          {
            path: 'course/:courseId',
            Component: CourseLayout,
            children: [
              // By default, redirect to first lesson or just let LessonView handle it
              { index: true, Component: LessonView },
              { path: 'lesson/:lessonId', Component: LessonView },
              { path: 'quiz/:quizId', Component: QuizView },
            ]
          }
        ],
      },
    ],
  },
]);
