const router = require("express").Router();

const tradesController = require("../controllers/tradesController");
const { verifyAuthorization } = require("../helpers/sessions");

router.patch("/schedule/:id", verifyAuthorization, tradesController.schedule);
router.patch("/conclude/:id", verifyAuthorization, tradesController.conclude);
router.get("/my-trades", verifyAuthorization, tradesController.userTrades);

module.exports = router;