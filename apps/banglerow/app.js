var samples = []
var strokes = []
var stroke = 0
var strokeamount = 5
var samplerate = 12 // Samplerate = ~12 SPS
var laststroke = new Date(Date.now() - 1000);
var startdate = Date.now()

function measure() {
  Bangle.on('accel', function(accel) {
    samples.push(accel)
    if (samples.length > 100) {
      samples.shift()
    }
    if (Date.now() - startdate > 2000) {
      if ((accel.y < accel.x) && (accel.x < samples[samples.length - 2].x) && (samples[samples.length - 2].x > samples[samples.length - 4].x) && (samples[samples.length - 4].x < accel.x) && (samples[samples.length - 4].y > accel.y) && (Date.now() - laststroke > 1000)) {
        Bangle.buzz()
        laststroke = Date.now()
        strokes.push(Date.now())
        if (strokes.length > strokeamount) {
          strokes.shift()
        }
        stroke = 60/(((strokes[strokes.length-1] - strokes[0])/1000)/strokeamount)
        E.showMessage("Stroke", stroke)
      }
    }
  })
}


measure()
