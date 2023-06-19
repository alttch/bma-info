const parser = require("jsdoc3-parser");
parser(process.argv[2], function(error, ast) {
  if (error) {
    throw error;
  } else {
    console.log(JSON.stringify(ast, null, 4));
  }
});
