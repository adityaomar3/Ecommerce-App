import { Counter } from './features/counter/Counter';
import './App.css';

import LoginPage from './features/pages/LoginPage';
import SignupPage from './features/pages/SignupPage';
import Home from './features/pages/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;