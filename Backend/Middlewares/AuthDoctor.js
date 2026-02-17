import jwt from "jsonwebtoken";

// Doctor Authentication Middleware
const authDoctor = async (req, res, next) => {
    try {
        const token = req.headers.dtoken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, login again",
            });
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id || decoded.role !== "doctor") {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        };

        req.doctor = { id: decoded.id };

        next();
    } catch (error) {
        console.error("AuthDoctor Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    };
};

export default authDoctor;
