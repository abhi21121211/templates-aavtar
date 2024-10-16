// src/index.js
const Mustache = require("mustache");
const { parseData } = require("./dataParser");
const fs = require("fs");

// Main rendering function
async function renderTemplate(template, data, type, filePath = "") {
  // First, parse the input data based on its type (JSON, CSV, Excel)
  let parsedData;
  if (filePath) {
    // If reading from a file (CSV or Excel), read file contents
    const fileData = fs.readFileSync(filePath, "utf8");
    parsedData = await parseData(fileData, type, filePath);
  } else {
    // For JSON data directly as string input
    parsedData = await parseData(data, type);
  }

  // Then, render the template using the parsed data
  return Mustache.render(template, parsedData);
}

module.exports = {
  renderTemplate,
};
