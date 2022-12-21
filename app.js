const path = require("path");
const fs = require("fs");
const os = require("os");
const { JSDOM } = require("jsdom");

const arr = process.argv[2].split("/");

const dom = new JSDOM(`<dl></dl>`);

let lastNode = dom.window.document.querySelector("dl");

for (let index = 0; index < arr.length; index++) {
  const element = arr[index];
  if (!element) continue;

  const dtElement = dom.window.document.createElement("dt");
  const h3Element = dom.window.document.createElement("h3");
  const dlElement = dom.window.document.createElement("dl");

  h3Element.innerHTML = element;
  dtElement.appendChild(h3Element);
  dtElement.appendChild(dlElement);

  lastNode.appendChild(dtElement);

  lastNode = dlElement;
}

const saveFilePath = path.join(os.homedir(), "Downloads", "bookmark.html");

fs.writeFileSync(saveFilePath, dom.serialize());
console.log("Done!");
