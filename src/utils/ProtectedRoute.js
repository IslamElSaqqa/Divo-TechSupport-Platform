import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";

const ProtectedRoute = ({ children, requiredAdmin = false }) => {
    const { user } = useAuthContext();

    if (!user?.token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const base64Url = user.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(window.atob(base64));
        const userPresence = decodedPayload.user_presence;

        if (requiredAdmin && userPresence !== 1) {
        return <Navigate to="/home" replace />;
        }

        return children;
    } catch (err) {
        console.error("Token decoding failed:", err);
        sessionStorage.removeItem("user");
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
