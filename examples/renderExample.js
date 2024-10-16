const { renderTemplate } = require("../src/index");
const fs = require("fs");

// Define an HTML template
const template = `
<div>
  <p>{{name}}</p>
  <p>{{age}}</p>
  <ul>
    {{#items}}
    <li>{{.}}</li>
    {{/items}}
  </ul>
</div>`;

// Example 1: Using JSON data
const jsonData = `{
  "name": "John Doe",
  "age": 30,
  "items": ["Item 1", "Item 2", "Item 3"]
}`;

// Example 2: Using CSV data
const csvData = `name,age,items
John Doe,30,"Item 1;Item 2;Item 3"`;

// Example 3: Using Excel data (path to Excel file)
const excelFilePath = "./data/sample.xlsx"; // Path to the Excel file

(async () => {
  try {
    // Rendering with JSON
    const outputJson = await renderTemplate(template, jsonData, "json");
    console.log("Rendered with JSON:\n", outputJson);

    // Rendering with CSV
    const outputCsv = await renderTemplate(template, csvData, "csv");
    console.log("Rendered with CSV:\n", outputCsv);

    // Rendering with Excel
    const outputExcel = await renderTemplate(
      template,
      null,
      "xlsx",
      excelFilePath
    );
    console.log("Rendered with Excel:\n", outputExcel);
  } catch (err) {
    console.error("Error:", err);
  }
})();
