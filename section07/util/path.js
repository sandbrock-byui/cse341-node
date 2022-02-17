const path = require('path');
const fs = require('fs');

exports.appDir = path.dirname(require.main.filename);
exports.dataDir = path.join(this.appDir, 'data');
exports.dbFilePath = path.join(this.dataDir, 'products.json');

if (!fs.existsSync(this.dataDir)) {
  fs.mkdirSync(this.dataDir);
}

