import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Registration from "./pages/registration/Registration";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import NotLoggedIn from "./components/Private_RouteLayouts/NotLoggedIn";
import LoggedIn from "./components/Private_RouteLayouts/LoggedIn";
import Rootlayout from "./Layout/Rootlayout";
import 'swiper/css';
import Verification from "./pages/Verification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./features/authentication/authSlice";
import ForgotPassIndex from "./pages/Forget passwrod/ForgotPassIndex";



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'currentLoggedUser') {
        const newUser = JSON.parse(e.newValue);
        dispatch(setUser(newUser));
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch]);
  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoggedIn />}>
          <Route element={<Rootlayout />}>
            <Route index element={<Home />}/>
          </Route>
        </Route>
        <Route element={<NotLoggedIn />}>
          <Route path="/registration" element={<Registration />}/>
          <Route path="/login" element={<Login />}/>
        </Route>
        <Route path="/verify/:token" element={<Verification />} />
        <Route path="/forgot-password" element={<ForgotPassIndex />} />
      </Route>
    )
  )


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
