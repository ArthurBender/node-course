const router = require("express").Router();
const usersController = require("../controllers/usersController");
const { verifyAuthorization } = require("../helpers/sessions");
const { imageUpload } = require("../helpers/images");

router.patch("/:id", verifyAuthorization, imageUpload.single("avatar"), usersController.update);
router.post("/", usersController.create);
router.get("/:id", usersController.show);

module.exports = router;