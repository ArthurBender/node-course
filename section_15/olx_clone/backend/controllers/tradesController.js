const Item = require("../models/Item");

const { renderError, renderSuccess } = require("../helpers/requests");
const { findUser, findItem, canUpdate } = require("../helpers/resources");

const ObjectId = require("mongoose").Types.ObjectId;

const tradesController = class {
  static async userTrades(req, res) {
    const items = await Item.find({ "buyer._id": new ObjectId(req.user.id) }).sort("-createdAt");

    return renderSuccess(res, 200, { data: items });
  }

  static async schedule(req, res) {
    const item = await findItem(req.params.id);
    if (!item) {
      return renderError(res, 404, "Item not found.");
    }

    const user = await findUser(req.user.id);
    if (!user) {
      return renderError(res, 404, "User not found.");
    }

    // Validations
    if (item.owner._id.toString() === req.user.id) {
      return renderError(res, 422, "You can't trade with yourself.");
    }
    if (item.buyer && item.buyer._id) {
      return renderError(res, 422, "Item already has a buyer.");
    }

    const buyerData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatarPath: user.avatarPath
    }

    try {
      const updatedItem = await Item.findOneAndUpdate({ _id: item._id }, { buyer: buyerData }, { returnDocument: "after" });
  
      return renderSuccess(res, 200, { message: `Trade scheduled successfully. Reach the owner at ${item.owner.email} or ${item.owner.phone}.`, data: updatedItem });
    } catch (error) {
      return renderError(res, 500, `Couldn't schedule trade. Error: ${error.message}`);
    }
  }

  static async conclude(req, res) {
    const item = await findItem(req.params.id);
    if (!item) {
      return renderError(res, 404, "Item not found.");
    }

    // Ability
    if (!canUpdate(req, res, item, "item")) return;

    // Validations
    if (!item.buyer) {
      return renderError(res, 422, "Item doesn't have a buyer.");
    }
    if (!item.available) {
      return renderError(res, 422, "Item is not available.");
    }

    try {
      const updatedItem = await Item.findOneAndUpdate({ _id: item._id }, { available: false }, { returnDocument: "after" });
  
      return renderSuccess(res, 200, { message: "Congratulations! Trade concluded successfully.", data: updatedItem });
    } catch (error) {
      return renderError(res, 500, `Couldn't conclude trade. Error: ${error.message}`);
    }
  }
}

module.exports = tradesController;