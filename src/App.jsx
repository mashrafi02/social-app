import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Registration from "./pages/registration/Registration";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import NotLoggedIn from "./components/Private_RouteLayouts/NotLoggedIn";
import LoggedIn from "./components/Private_RouteLayouts/LoggedIn";
import Rootlayout from "./Layout/Rootlayout";
import 'swiper/css';


function App() {

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
