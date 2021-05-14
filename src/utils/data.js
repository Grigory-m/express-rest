const fsp = require('fs/promises');

const readData = async (filePath) => {
  let data = [];
  try {
    const list = await fsp.readFile(filePath, 'utf-8');
    const parsedList = JSON.parse(list);
    data = parsedList;
  } catch (error) {
    console.warn('There was an error!');
  }  
  return data;
}

const writeData = async (data, filePath) => {
  try {
    const stringifyList = JSON.stringify(data);
    await fsp.writeFile(filePath, stringifyList, 'utf-8');
  } catch (error) {
    console.warn('There was an error!');
  }  
  return data;
}

module.exports = { readData, writeData};