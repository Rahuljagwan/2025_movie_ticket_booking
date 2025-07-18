import express, { application, json } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";

import adminRouter from "./routes/adminRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { stripeWebhooks } from "./controller/stripeWebhooks.js";

const app = express();
const port = 3000;

await connectDB();
//stripe webhook route
app.use(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);
// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// API Routes
app.get("/", (req, res) => res.send("Server is Live!"));

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
