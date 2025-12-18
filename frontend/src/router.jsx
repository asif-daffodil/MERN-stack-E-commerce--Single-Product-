import { createBrowserRouter, redirect } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Modhu from "./pages/Modhu";
import ConfirmOrder from "./pages/ConfirmOrder";
import Admin from "./pages/Admin";
import SignIn from "./pages/SignIn";

const requireLogin = () => {
  try {
    const raw = localStorage.getItem('auth');
    const parsed = raw ? JSON.parse(raw) : null;
    if (!parsed?.token) {
      return redirect('/signin?next=/admin');
    }
    return null;
  } catch {
    return redirect('/signin?next=/admin');
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/modhu",
            element: <Modhu />
        },
        {
          path: "/confirm-order",
          element: <ConfirmOrder />
        },
        {
          path: "/admin",
          loader: requireLogin,
          element: <Admin />
        },
        {
          path: "/signin",
          element: <SignIn />
        }
    ]
  },
]);

export default router;