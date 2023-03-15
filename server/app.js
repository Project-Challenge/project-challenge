const express = require("express");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
require('dotenv').config();

const app = express();

// Connect to database
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  logger.info("Connected to MongoDB");
}).catch((error) => {
  logger.error(error);
});
  
// Middleware
app.use(express.json());

// Routes
app.use("/registerUser", require("./routes/auth/registerUser"));
app.use("/loginUser", require("./routes/auth/loginUser"));
app.use("/verifyToken", require("./routes/auth/verifyToken"));
app.use("/createTask", require("./routes/task/createTask"));
app.use("/pendingTask", require("./routes/task/pendingTask"));
app.use("/finishedTask", require("./routes/task/finishedTask"));
app.use("/revertTask", require("./routes/task/revertTask"));

// Error handling middleware
app.use((error, req, res, next) => {
  logger.error(`Error occurred: ${error}`);
  res.status(500).json({ message: "An error occurred" });
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});