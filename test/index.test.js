const { renderTemplate } = require("../src/index");

const template = `<div><p>{{name}}</p></div>`;
const data = { name: "John Doe" };

const result = renderTemplate(template, data);
console.log(result === "<div><p>John Doe</p></div>"); // Should print: true
