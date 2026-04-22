const itemsController = require("../controllers/itemsController");
const { verifyAuthorization } = require("../helpers/sessions");
const { imageUpload } = require("../helpers/images");

const router = require("express").Router();

router.delete("/:id", verifyAuthorization, itemsController.delete);
router.get("/my-items", verifyAuthorization, itemsController.userItems);
router.patch("/:id", verifyAuthorization, imageUpload.array("images"), itemsController.update);
router.post("/", verifyAuthorization, imageUpload.array("images"), itemsController.create);
router.get("/:id", itemsController.show);
router.get("/", itemsController.index);

module.exports = router;