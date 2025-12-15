import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Modhu from "./pages/Modhu";

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
        }
    ]
  },
]);

export default router;