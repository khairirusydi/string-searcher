#!/usr/bin/env node
var fs = require('fs');

// recursively get all files in directory
const getAllFiles = (dir, currentArrayOfFiles) => {
  const newArrayOfFiles = currentArrayOfFiles || [];
  const dirItems = fs.readdirSync(dir);
  dirItems.forEach(item => {
    const itemName = dir + '/' + item;
    if (fs.statSync(itemName).isDirectory()) {
      getAllFiles(itemName, newArrayOfFiles);
    } else {
      newArrayOfFiles.push(itemName);
    };
  });
  return newArrayOfFiles;
};

const mainApp = () => {
  const dir = process.cwd();
  // const searchString = process.argv[2] || 'TODO';

  const files = getAllFiles(dir);

  return files;
};

console.log(mainApp().join('\r\n'));
