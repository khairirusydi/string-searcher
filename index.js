#!/usr/bin/env node
const fs = require('fs');

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

const searchFileForKeyword = (file, keyword) => {
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    if (data.includes(keyword)) console.log(file);
  });
};

const mainApp = (dir, searchString) => {
  const allFiles = getAllFiles(dir);
  allFiles.forEach(file => searchFileForKeyword(file, searchString));
};

module.exports = {
  mainApp,
  getAllFiles,
  searchFileForKeyword
};

if (require.main === module) {
  mainApp(process.cwd(), process.argv[2] || 'TODO');
};
