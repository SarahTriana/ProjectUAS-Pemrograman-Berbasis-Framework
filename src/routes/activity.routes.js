const express = require("express");
const prisma = require("../prisma");
const auth = require("../middlewares/auth");

const router = express.Router();

/* LIST + FILTER AKTIVITAS */
router.get("/", auth, async (req, res, next) => {
  try {
    const { kategori, tanggal } = req.query;

    const where = {
      user_id: req.session.user.id,
      ...(kategori && { kategori }),
      ...(tanggal && !isNaN(new Date(tanggal)) && {
        tanggal: new Date(tanggal)
      })
    };

    const activities = await prisma.activity.findMany({
      where,
      orderBy: { tanggal: "asc" } 
    });

    res.render("activities", {
      activities,
      filter: { kategori, tanggal }
    });
  } catch (err) {
    next(err);
  }
});

/*  FORM TAMBAH AKTIVITAS */
router.get("/add", auth, (req, res) => {
  res.render("add-activity");
});

/*  SIMPAN AKTIVITAS BARU */
router.post("/add", auth, async (req, res, next) => {
  try {
    const { judul_aktivitas, kategori, tanggal } = req.body;

    if (!judul_aktivitas || !kategori || !tanggal) {
      return res.send("❌ Semua field wajib diisi!");
    }

    const parsedDate = new Date(tanggal);
    if (isNaN(parsedDate)) {
      return res.send("❌ Format tanggal tidak valid!");
    }

    await prisma.activity.create({
      data: {
        judul_aktivitas: judul_aktivitas.trim(),
        kategori: kategori.trim(),
        tanggal: parsedDate,
        user_id: req.session.user.id
      }
    });

    res.redirect("/activities");
  } catch (err) {
    next(err);
  }
});

/*  FORM EDIT AKTIVITAS */
router.get("/edit/:id", auth, async (req, res, next) => {
  try {
    const activity = await prisma.activity.findFirst({
      where: {
        id: Number(req.params.id),
        user_id: req.session.user.id
      }
    });

    if (!activity) {
      return res.status(404).send("❌ Aktivitas tidak ditemukan!");
    }

    res.render("edit-activity", { activity });
  } catch (err) {
    next(err);
  }
});

/*  UPDATE AKTIVITAS */
router.post("/edit/:id", auth, async (req, res, next) => {
  try {
    const { judul_aktivitas, kategori, tanggal } = req.body;

    if (!judul_aktivitas || !kategori || !tanggal) {
      return res.send("❌ Semua field wajib diisi!");
    }

    const parsedDate = new Date(tanggal);
    if (isNaN(parsedDate)) {
      return res.send("❌ Format tanggal tidak valid!");
    }

    const updated = await prisma.activity.updateMany({
      where: {
        id: Number(req.params.id),
        user_id: req.session.user.id
      },
      data: {
        judul_aktivitas: judul_aktivitas.trim(),
        kategori: kategori.trim(),
        tanggal: parsedDate
      }
    });

    if (updated.count === 0) {
      return res.status(404).send("❌ Data tidak ditemukan atau tidak punya akses!");
    }

    res.redirect("/activities");
  } catch (err) {
    next(err);
  }
});

/*  HAPUS AKTIVITAS */
router.get("/delete/:id", auth, async (req, res, next) => {
  try {
    const deleted = await prisma.activity.deleteMany({
      where: {
        id: Number(req.params.id),
        user_id: req.session.user.id
      }
    });

    if (deleted.count === 0) {
      return res.status(404).send("❌ Data tidak ditemukan atau tidak punya akses!");
    }

    res.redirect("/activities");
  } catch (err) {
    next(err);
  }
});

/*  DETAIL AKTIVITAS */
router.get("/:id", auth, async (req, res, next) => {
  try {
    const activity = await prisma.activity.findFirst({
      where: {
        id: Number(req.params.id),
        user_id: req.session.user.id
      },
      include: {
        details: {
          orderBy: { nomor_detail: "asc" } // ✅ DETAIL TETAP URUT
        }
      }
    });

    if (!activity) {
      return res.status(404).send("❌ Aktivitas tidak ditemukan!");
    }

    res.render("activity-detail", { activity });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
