const bcrypt = require('bcryptjs');
const password = "password123"
exports.port = 3000;
exports.auth = bcrypt.hashSync(password, 10);

