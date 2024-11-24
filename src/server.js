require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const rateLimiter = require("express-rate-limit");
const slowDown = require("express-slow-down");
const { authUser } = require("./middleware/user.mw");
const connect = require("./models/db");
const app = express();

// Middleware
const { NODE_ENV, WEB_URL } = process.env;
const notProduction = NODE_ENV !== "production";
app.use(helmet());
app.use(
  cors({
    origin: notProduction ? "http://localhost:3000" : WEB_URL,
  })
);
app.use(express.json());
if (notProduction) {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
  app.enable("trust proxy");
  app.set("trust proxy", 1);
}

// Rate & Speed Limiter Info
const timeLimit = 1000 * 60 * 15;
const maxReq = 75;
const limiter = rateLimiter({
  windowMs: timeLimit,
  max: maxReq,
});
const speedLimiter = slowDown({
  windowMs: timeLimit,
  delayAfter: maxReq / 2,
  delayMs: () => 500,
});

// Rate & Speed Limiters
app.use(speedLimiter);
app.use(limiter);

// Mongoose Connection
connect();

// Routes
const API_VERSION = `v${process.env.API_VERSION}`;

// Landing Page Route
app.get("/", (req, res) => {
  res.send("Dummy Bank is Up and Running !");
});

// API Routes

// Users
app.use(`/${API_VERSION}/api/users`, require("./routes/user.rt"));

// Bank
app.use(`/${API_VERSION}/api/bank/:id`, authUser, require("./routes/bank.rt"));

// PORT and Sever
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`CORS Enabled Server, Listening to port: ${PORT}...`);
});

// Export the Express API
module.exports = server;
