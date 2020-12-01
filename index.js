#!/usr/bin/env node
var fs = require('fs');

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

const mainApp = () => {
  const dir = process.cwd();
  const searchString = process.argv[2] || 'TODO';

  const allFiles = getAllFiles(dir);
  allFiles.forEach(file => searchFileForKeyword(file, searchString));
};

mainApp();
