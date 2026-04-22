const { renderError } = require("./requests");

const User = require("../models/User");
const Item = require("../models/Item");

async function findUser(id) {
  try {
    return await User.findOne({ _id: id });
  } catch (error) {
    return null;
  }
}

async function findItem(id) {
  try {
    return await Item.findOne({ _id: id });
  } catch (error) {
    return null;
  }
}

function canUpdate (req, res, resource, resourceType) {
  if (!req.user || !req.user.id) {
    renderError(res, 403, "You need to be logged in to perform this action.");
    return false;

  } else {
    if (resourceType === "user" && req.user.id === resource._id.toString()) {
      return true;
    } else if (resourceType === "item" && req.user.id === resource.owner._id.toString()) {
      return true;
    }

    renderError(res, 422, "You don't have permission to perform this action.");
    return false;
  }
}

function clearFields (obj) {
  for (let key in obj) {
    if (!obj[key] || obj[key].length == 0) {
      delete obj[key];
    }
  }

  return obj;
}

module.exports = { findUser, findItem, canUpdate, clearFields };