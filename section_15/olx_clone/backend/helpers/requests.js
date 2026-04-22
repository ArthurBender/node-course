function checkRequiredFields(fields, requiredFields) {
  let missingFields = [];
  for (const field of requiredFields) {
    if (!fields[field]) {
      missingFields.push(field);
    }
  }
  return missingFields;
}

function renderError(res, status, message) {
  if (status >= 500) console.error(`[API] ${message}`);

  return res.status(status).json({ status: "error", message });
}

function renderSuccess(res, status, { message, data }) {
  let response = { status: "success" };
  if (message) {
    response.message = message;
  }
  if (data) {
    response.data = data;
  }

  return res.status(status).json(response);
}

module.exports = { checkRequiredFields, renderError, renderSuccess };