const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../prisma");

const router = express.Router();

// halaman login
router.get("/", (req, res) => {
  res.render("login");
});

// seed user pertama (sekali pakai)
router.get("/seed", async (req, res) => {
  const password = await bcrypt.hash("123456", 10);
  await prisma.user.create({
    data: { username: "admin", password }
  });
  res.send("User admin dibuat");
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username }
    });

    if (!user) return res.send("User tidak ditemukan");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.send("Password salah");

    req.session.user = user;
    res.redirect("/activities");
  } catch (err) {
    next(err);
  }
});

// logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
