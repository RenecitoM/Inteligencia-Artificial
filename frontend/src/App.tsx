import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { routes } from './routes/Routes';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.name} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
