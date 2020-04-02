const fs = require('fs');

const writer = (path, fileName, fileContents) => {
    const exists = fs.existsSync(path)
    if (!exists) { // TODO: add error handling
        fs.mkdirSync(path, { recursive: true });
    }
    fs.writeFileSync(`${path}/${fileName}`, fileContents);
};

module.exports = writer;
