import compression from "compression";
import express from "express";
import lusca from "lusca";
import { registerRoutes } from "./routes";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Primary app routes
registerRoutes(app);

export default app;
