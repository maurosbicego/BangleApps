var file = require("Storage").open("accel.csv","a");


Bangle.on('accel', function(accel) {
  var data = [accel.x, accel.y, accel.z];
  file.write(data.join(",")+"\n");
});

