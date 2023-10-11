const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API running"));

// Define Routes
app.use("/api/users", require("./routes/API/users"));
app.use("/api/auth", require("./routes/API/auth"));
app.use("/api/profile", require("./routes/API/profile"));
app.use("/api/posts", require("./routes/API/posts"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

