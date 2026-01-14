const express = require("express");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const activityRoutes = require("./routes/activity.routes");
const detailRoutes = require("./routes/detail.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

/* VIEW ENGINE CONFIG */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

app.use(express.static(path.join(__dirname, "public")));

/* MIDDLEWARE */
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "aktivitas-secret",
  resave: false,
  saveUninitialized: false
}));

/* ROUTES */
app.use("/", authRoutes);
app.use("/activities", activityRoutes);
app.use("/details", detailRoutes);

/* ERROR HANDLER */
app.use(errorHandler);

/* SERVER */
app.listen(3000, () =>
  console.log("✅ Server running: http://localhost:3000")
);
