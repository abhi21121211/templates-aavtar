// src/dataParser.js
const XLSX = require("xlsx");
const Papa = require("papaparse");
const fs = require("fs");

// Function to parse JSON
function parseJSON(data) {
  try {
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Invalid JSON data");
  }
}

// Function to parse CSV
function parseCSV(data) {
  return new Promise((resolve, reject) => {
    Papa.parse(data, {
      header: true,
      complete: (result) => {
        // Transform the parsed CSV data
        const transformedData = result.data.map((row) => {
          // Split the items field into an array if it exists
          if (row.items) {
            row.items = row.items.split(";").map((item) => item.trim());
          }
          return row;
        });
        resolve(transformedData[0]); // Return the first row as JSON object
      },
      error: (err) => reject(err),
    });
  });
}

// Function to parse Excel file (XLSX)
function parseExcel(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
    const transformedData = sheet.map(row => {
      if (row.items) {
        row.items = row.items.split(';').map(item => item.trim());
      }
      return row;
    });
  
    return transformedData[0]; // Return the first row as JSON object
  }

// Main function to handle different types of data
async function parseData(data, type, filePath = "") {
  switch (type.toLowerCase()) {
    case "json":
      return parseJSON(data);
    case "csv":
      return await parseCSV(data);
    case "xlsx":
      if (!filePath) {
        throw new Error("File path is required for Excel parsing");
      }
      return parseExcel(filePath);
    default:
      throw new Error("Unsupported data type");
  }
}

module.exports = {
  parseData,
};
