const express = require("express");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const cors = require('cors')

require('dotenv').config();

const app = express();
app.use(cors());


// Connect to database
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  logger.info("Connected to MongoDB");
}).catch((error) => {
  logger.error(error);
  console.log(error);
});
  
// Middleware
app.use(express.json());

// Routes
app.use("/api/auth/register", require("./routes/auth/register"));
app.use("/api/auth/login", require("./routes/auth/login"));
app.use("/api/auth/verify", require("./routes/auth/verify"));
app.use("/api/auth/refresh", require("./routes/auth/refresh"));
app.use("/api/tasks/create", require("./routes/tasks/create"));
app.use("/api/tasks/pending", require("./routes/tasks/pending"));
app.use("/api/tasks/finish", require("./routes/tasks/finish"));
app.use("/api/tasks/revert", require("./routes/tasks/revert"));
app.use("/api/tasks", require("./routes/tasks/tasks"));

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