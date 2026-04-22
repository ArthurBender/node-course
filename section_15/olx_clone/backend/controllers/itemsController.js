const User = require("../models/User");
const Item = require("../models/Item");
const ObjectId = require("mongoose").Types.ObjectId;

const { renderSuccess, renderError, checkRequiredFields } = require("../helpers/requests");
const { findUser, findItem, canUpdate, clearFields } = require("../helpers/resources");

const itemsController = class {
  static async index(req, res) {
    const items = await Item.find().sort("-createdAt");

    return renderSuccess(res, 200, { data: items });
  }

  static async show(req, res) {
    try {
      const item = await Item.findById(new ObjectId(req.params.id));

      if (!item) {
        return renderError(res, 404, "Item not found.");
      }
      
      return renderSuccess(res, 200, { data: item });
    } catch (error) {
      return renderError(res, 400, "Invalid item id.");
    }
  }

  static async userItems(req, res) {
    const items = await Item.find({ "owner._id": new ObjectId(req.user.id) }).sort("-createdAt");

    return renderSuccess(res, 200, { data: items });
  }

  static async create(req, res) {
    const { title, description, price, category, condition } = req.body || {};
    let itemData = { title, description, price, category, condition };

    // Validations
    let missingFields = checkRequiredFields(itemData, ["title", "description", "price", "category", "condition"]);
    if (missingFields.length > 0) {
      return renderError(res, 400, "Couldn't create item. Missing fields: " + missingFields.join(", "));
    }

    let imagesPaths = [];
    if (req.files && req.files.length > 0 && req.files.length <= 5) {
      imagesPaths = req.files.map(file => file.filename);
    } else {
      return renderError(res, 400, "Couldn't create item. Please upload between 1 and 5 images.");
    }
    itemData.imagesPaths = imagesPaths;

    const user = await User.findById(req.user.id);
    if (!user) {
      return renderError(res, 404, "User not found.");
    }

    itemData.available = true;
    itemData.owner = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatarPath: user.avatarPath
    }

    const item = new Item(itemData);

    try {
      const createdItem = await item.save();
      return renderSuccess(res, 201, { message: "Item created successfully.", data: createdItem });
    } catch (error) {
      return renderError(res, 500, `Couldn't create item. Error: ${error.message}`);
    }
  }

  static async update(req, res) {
    const { title, description, price, category, condition } = req.body || {};

    let imagesPaths = [];
    if (req.files && req.files.length > 0 && req.files.length <= 5) {
      imagesPaths = req.files.map(file => file.filename);
    } else if (req.files && req.files.length > 5) {
      return renderError(res, 400, "Couldn't update item. Please upload a maximum of 5 images.");
    }

    const item = await findItem(req.params.id);

    if (!item) {
      return renderError(res, 404, "Item not found.");
    }

    // Ability
    if (!canUpdate(req, res, item, "item")) return;

    const itemData = clearFields({ title, description, price, category, condition, imagesPaths });

    try {
      const updatedItem = await Item.findOneAndUpdate({ _id: item._id }, itemData, { returnDocument: "after" });

      return renderSuccess(res, 200, { message: "Item updated successfully.", data: updatedItem });
    } catch (error) {
      return renderError(res, 500, `Couldn't update item. Error: ${error.message}`);
    }
  }

  static async delete(req, res) {
    const item = await findItem(req.params.id);

    if (!item) {
      return renderError(res, 404, "Item not found.");
    }

    // Ability
    if (!canUpdate(req, res, item, "item")) return;

    await Item.deleteOne({ _id: item._id });

    return renderSuccess(res, 200, { message: "Item deleted successfully." });
  }
};

module.exports = itemsController;