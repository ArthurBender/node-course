const router = require("express").Router();
const sessionsController = require("../controllers/sessionsController");
const { verifyAuthorization } = require("../helpers/sessions");

router.post("/login", sessionsController.create);
router.get("/me", verifyAuthorization, sessionsController.getCurrentUser);

module.exports = router;