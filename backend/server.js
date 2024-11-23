const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api/me", require("./routes/me"));
app.use("/api/destinations", require("./routes/destinations"));
app.use("/api/auth/register", require("./routes/auth/register"));
app.use("/api/auth/login", require("./routes/auth/login"));

// Add the reviews route
app.use("/api/destinations", require("./routes/reviews")); // Ensure this path points to your reviews.js file

// Add more routes as needed...

app.listen(process.env.BACKEND_PORT || 5000, () => {
  console.log(`Server running on port ${process.env.BACKEND_PORT || 5000}`);
});
