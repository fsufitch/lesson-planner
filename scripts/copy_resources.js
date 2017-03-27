var copy = require('copy');

copy('src/res/*', 'build/res/', function(err, files) {
  if (!!err) {
    console.error(err);
  }
});
