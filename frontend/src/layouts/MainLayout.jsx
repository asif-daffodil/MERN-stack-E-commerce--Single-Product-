import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="bg-green-100">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;