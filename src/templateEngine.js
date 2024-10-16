function fillTemplate(template, data) {
  // Replace simple placeholders like {{key}}
  return template.replace(/\{\{(.*?)\}\}/g, function (match, key) {
    key = key.trim();
    return key.split(".").reduce((acc, part) => acc && acc[part], data) || "";
  });
}

// Support arrays or looping structures like {{#items}} {{/items}}
function renderList(template, key, data) {
  const regex = new RegExp(
    `\\{\\{#${key}\\}\\}([\\s\\S]*?)\\{\\{/${key}\\}\\}`,
    "g"
  );
  return template.replace(regex, function (match, innerTemplate) {
    const items = data[key];
    if (!Array.isArray(items)) {
      return ""; // If the key doesn't refer to an array, return empty string
    }

    // Loop over the array items
    return items
      .map((item) => {
        // If {{.}} is used in the template, replace it with the current item
        let renderedItem = innerTemplate.replace(/\{\{\.?\}\}/g, item);
        // If the current item is an object, use fillTemplate to handle other placeholders
        return typeof item === "object"
          ? fillTemplate(renderedItem, item)
          : renderedItem;
      })
      .join(""); // Join array items into a single string
  });
}

// Export the functions
module.exports = {
  fillTemplate,
  renderList,
};
