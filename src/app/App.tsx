import { MotionConfig } from 'framer-motion';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { router } from './router';

export function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </ThemeProvider>
  );
}
