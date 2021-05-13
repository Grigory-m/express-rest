const fs = require('fs');

const readData = async (fileName) => {
  const filePath = `${__dirname}\\${fileName}`;
  console.log(filePath)
  let data = [];
  try {
    const stream = await fs.createReadStream(filePath, 'utf-8', { flags: 'w+'});
    stream.setEncoding('utf-8');  
    stream.on('readable', () => {
      data = JSON.parse(stream.read());      
    })  
    
  } catch (error) {
    console.error(error.message);
  }  
  console.log(data)
  return data;
}

const writeData = async (data, fileName) => {
  const filePath = `${__dirname}/${fileName}`;
  const stream = await fs.createWriteStream(filePath, 'utf-8');
  await stream.write(JSON.stringify(data))
  return data;
}

module.exports = { readData, writeData};