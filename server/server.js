import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'; // Import the auth routes
import healthRecordRoutes from "./routes/healthRecordRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

dotenv.config(); // Initialize environment variables

const app = express();

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0", // OpenAPI version
        info: {
            title: "FitMi API",
            version: "1.0.0",
            description: "API documentation for the FitMi application",
        },
        servers: [
            {
                url: "http://localhost:5000", // Your API server URL
            },
        ],
    },
    apis: ["./routes/*.js"], // Path to the API docs
};

// Initialize Swagger JSDoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.json()); // JSON parser

connectDB();

// Routes
app.use('/api', authRoutes);
app.use("/api/health-records", healthRecordRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to the Health Tracking App API");
});

// Handle 404 errors (for undefined routes)
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler (for unhandled errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
