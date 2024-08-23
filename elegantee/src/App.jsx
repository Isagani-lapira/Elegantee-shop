import { Login } from '@mui/icons-material';
import './App.css'
import LoginPage from './elegantee/pages/LoginPage'
import {createBrowserRouter,Navigate,RouterProvider} from "react-router-dom";
import SamplePage from './elegantee/pages/rar';
import AuthProvider, { useAuth } from './elegantee/auth/AuthProvider';


function App() {

  const AuthenticatedRoute = ({children})=>{
    const {isAuthenticated} = useAuth();

    if(isAuthenticated)
      return children;

    return <Navigate to="/"/>
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage/>
    },
    {
      path:'/rar',
      element: (<AuthenticatedRoute>
                  <SamplePage/>
                </AuthenticatedRoute>)
    }
  ])
    return (
      <div className="App h-full">
        <AuthProvider>
          <RouterProvider router={router}/>
        </AuthProvider>
        
      </div>
    )
}

export default App
