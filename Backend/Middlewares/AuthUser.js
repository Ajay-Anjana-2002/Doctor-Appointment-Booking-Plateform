import jwt from "jsonwebtoken";

// User Authentication Middleware
const authUser = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, login again",
            });
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id || decoded.role !== "user") {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        };

        req.user = { id: decoded.id };

        req.userID = decoded.id;

        next();
    } catch (error) {
        console.error("AuthUser Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    };
};

export default authUser;
