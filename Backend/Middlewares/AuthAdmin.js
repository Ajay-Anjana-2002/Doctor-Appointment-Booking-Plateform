import jwt from "jsonwebtoken";

// Admin Authentication Middleware
const authAdmin = async (req, res, next) => {
    try {
        const token = req.headers.atoken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, login again",
            });
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (
            decoded.email !== process.env.ADMIN_EMAIL ||
            decoded.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        };

        req.admin = decoded;

        next();
    } catch (error) {
        console.error("AuthAdmin Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    };
};

export default authAdmin;
