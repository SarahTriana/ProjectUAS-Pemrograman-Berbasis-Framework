const express = require("express");
const prisma = require("../prisma");
const auth = require("../middlewares/auth");

const router = express.Router();

/*  FORM TAMBAH DETAIL AKTIVITAS */
router.get("/add/:activityId", auth, async (req, res, next) => {
  try {
    const activityId = Number(req.params.activityId);

    const activity = await prisma.activity.findFirst({
      where: {
        id: activityId,
        user_id: req.session.user.id
      }
    });

    if (!activity) {
      return res.send("❌ Aktivitas tidak ditemukan!");
    }

    res.render("add-detail", { activityId });
  } catch (err) {
    next(err);
  }
});

/* SIMPAN DETAIL BARU  */
router.post("/add/:activityId", auth, async (req, res, next) => {
  try {
    const activityId = Number(req.params.activityId);
    const { deskripsi_detail, durasi, status } = req.body;

    if (!deskripsi_detail || !durasi || !status) {
      return res.send("❌ Semua field wajib diisi!");
    }

    // 🔐 Pastikan aktivitas milik user login
    const activity = await prisma.activity.findFirst({
      where: {
        id: activityId,
        user_id: req.session.user.id
      }
    });

    if (!activity) {
      return res.send("❌ Aktivitas tidak valid!");
    }

    const lastDetail = await prisma.activityDetail.findFirst({
      where: { aktivitas_id: activityId },
      orderBy: { nomor_detail: "desc" }
    });

    const nomor_detail = lastDetail ? lastDetail.nomor_detail + 1 : 1;

    // 💾 Simpan detail baru
    await prisma.activityDetail.create({
      data: {
        aktivitas_id: activityId,
        nomor_detail,
        deskripsi_detail: deskripsi_detail.trim(),
        durasi: Number(durasi),
        status
      }
    });

    res.redirect(`/activities/${activityId}`);
  } catch (err) {
    next(err);
  }
});

/*  FORM EDIT DETAIL */
router.get("/edit/:detailId/:activityId", auth, async (req, res, next) => {
  try {
    const detailId = Number(req.params.detailId);
    const activityId = Number(req.params.activityId);

    const detail = await prisma.activityDetail.findUnique({
      where: { id: detailId },
      include: { activity: true }
    });

    if (!detail || detail.activity.user_id !== req.session.user.id) {
      return res.send("❌ Data tidak ditemukan!");
    }

    res.render("edit-detail", {
      detail,
      activityId
    });
  } catch (err) {
    next(err);
  }
});

/* UPDATE DETAIL */
router.post("/edit/:detailId/:activityId", auth, async (req, res, next) => {
  try {
    const detailId = Number(req.params.detailId);
    const activityId = Number(req.params.activityId);
    const { deskripsi_detail, durasi, status } = req.body;

    if (!deskripsi_detail || !durasi || !status) {
      return res.send("❌ Semua field wajib diisi!");
    }

    const detail = await prisma.activityDetail.findUnique({
      where: { id: detailId },
      include: { activity: true }
    });

    if (!detail || detail.activity.user_id !== req.session.user.id) {
      return res.send("❌ Tidak memiliki akses!");
    }

    await prisma.activityDetail.update({
      where: { id: detailId },
      data: {
        deskripsi_detail: deskripsi_detail.trim(),
        durasi: Number(durasi),
        status
      }
    });

    res.redirect(`/activities/${activityId}`);
  } catch (err) {
    next(err);
  }
});

/* HAPUS DETAIL */
router.get("/delete/:detailId/:activityId", auth, async (req, res, next) => {
  try {
    const detailId = Number(req.params.detailId);
    const activityId = Number(req.params.activityId);

    const detail = await prisma.activityDetail.findUnique({
      where: { id: detailId },
      include: { activity: true }
    });

    if (!detail || detail.activity.user_id !== req.session.user.id) {
      return res.send("❌ Tidak memiliki akses!");
    }

    await prisma.activityDetail.delete({
      where: { id: detailId }
    });

    res.redirect(`/activities/${activityId}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
