import { Login } from '@mui/icons-material';
import './App.css'
import LoginPage from './elegantee/pages/LoginPage'
import {createBrowserRouter,Navigate,Outlet,RouterProvider} from "react-router-dom";
import SamplePage from './elegantee/pages/rar';
import AuthProvider, { useAuth } from './elegantee/provider/AuthProvider';
import RegistrationPage from './elegantee/pages/RegistrationPage';
import Navbar from './elegantee/component/navbar/Navbar';
import About from './elegantee/routes/NavbarRoute/About';
import Contact from './elegantee/routes/NavbarRoute/Contact';
import Category from './elegantee/routes/NavbarRoute/Category';



const Layout = ()=>{
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}
function App() {

  const AuthenticatedRoute = ({children})=>{
    const {isAuthenticated} = useAuth();

    if(isAuthenticated)
      return children;

    return <Navigate to="/"/>
  }


  const router = createBrowserRouter([
    {
      element: <Layout/>,
      children:[
        {
          path: '/',
          element: <LoginPage/>
        },
        {
          path:'/rar',
          element: (<AuthenticatedRoute>
                      <SamplePage/>
                    </AuthenticatedRoute>)
        },
        {
          path: '/register',
          element: <RegistrationPage />
        },
        {
          path: '/category',
          element: <Category />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/contact',
          element: <Contact />
        },
      ]
    },
    
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
