const express = require("express");
const cors = require("cors");

// ENVs
require("dotenv").config();
const HOST = process.env.HOST ?? "localhost";
const PORT = process.env.PORT ?? 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? "http://localhost:3000";

// App config
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: FRONTEND_ORIGIN }));
app.use(express.static("public"));

// Routes
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");
const tradesRoutes = require("./routes/trades");
const authRoutes = require("./routes/auth");

app.use("/items", itemRoutes);
app.use("/users", userRoutes);
app.use("/trades", tradesRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", date: new Date() });
});

app.listen(PORT, HOST, () => {
  console.log("Server running on http://" + HOST + ":" + PORT + "!");
})