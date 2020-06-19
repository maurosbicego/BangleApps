var high = 0
var low = 0
var highdiff
var lowdiff
var state
var measurements = []
var laststatechange = Date.now()
var lastnotified = Date.now()
var pacetime
var sum

function stateChange(newstate) {
  if (((Date.now() - laststatechange) / 1000) > 1) {
    state = newstate
    elapsed = Date.now() - laststatechange
    measurements.push(elapsed)
    measurements = measurements.slice(Math.max(measurements.length - 6, 0))
    sum = 0
    for( var i = 0; i < measurements.length; i++ ){
      sum += parseInt( measurements[i] );
  }
    pacetime = (sum / measurements.length) / 1000
    pace = Math.round(60 / pacetime)
    binaryrev = pace.toString(2).split("").reverse().join("")
    laststatechange = Date.now()
    E.showMessage("Pace",pace)
    if (Date.now() - lastnotified > 10000000) {
      binaryrev.split("").forEach(function(val) {
        if (val == "0") {
          Bangle.buzz(100)
        } else {
          Bangle.buzz(300)
        }

      })

      lastnotified = Date.now()
    }
  }
}

function measure() {
  if (high === 0 || low === 0) {
    Bangle.beep(500, 600)
  } else {
    state = 0
    Bangle.on('accel', function(accel) {
      highdiff =  (high.x - accel.x) + (high.y - accel.y) + (high.z - accel.z)
      lowdiff = (low.x - accel.x) + (low.y - accel.y) + (low.z - accel.z)
      if (Math.abs(highdiff) < Math.abs(lowdiff)) {
        if (state !== 1) {
          stateChange(1)
        }
      } else {
        if (state !== 0) {
          stateChange(0)
        }
      }

    });
  }
}

function setLow() {
  low = Bangle.getAccel()
  measure()
}
function setHigh() {
  high = Bangle.getAccel()
  measure()
}
setWatch(setHigh, BTN1, { repeat: true });
setWatch(setLow, BTN3, { repeat: true });
