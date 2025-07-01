const path = require('path');
// This module exports the root directory of the application

module.exports  = path.dirname(require.main.filename);
// This code uses the 'path' module to get the directory name of the main module (the entry point of the application).
// The 'require.main.filename' gives the full path of the main module, and 'path.dirname' extracts the directory part.