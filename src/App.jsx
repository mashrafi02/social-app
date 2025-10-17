import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Registration from "./pages/registration/Registration";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Home />}/>
        <Route path="/registration" element={<Registration />}/>
        <Route path="/login" element={<Login />}/>
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
