import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Modhu from "./pages/Modhu";
import ConfirmOrder from "./pages/ConfirmOrder";

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
        }
    ]
  },
]);

export default router;