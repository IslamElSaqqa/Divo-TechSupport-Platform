import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/layout";
import Login from "../Pages/login";
import SignUp from "../Pages/signup";
import MaintenanceStores from "../components/Home_Components/MaintenanceStores/MaintenanceStores";
import Home from "../Pages/Home";
import Header from "../components/header&footer/header";
import Footer from "../components/header&footer/footer";

// Helper for routes with header and footer
const RouteWithHeaderFooter = ({ element }) => (
    <>
        <Header />
        {element}
        <Footer />
    </>
);

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<RouteWithHeaderFooter element={<Layout />} />} />
            <Route path="/login" element={<RouteWithHeaderFooter element={<Login />} />} />
            <Route path="/signup" element={<RouteWithHeaderFooter element={<SignUp />} />} />
            <Route path="/home" element={<RouteWithHeaderFooter element={<Home />} />} />


            <Route path="/maintenance-stores" element={<MaintenanceStores />} />
        </Routes>
    );
};

export default AppRoutes;
