var sz = 18;
var ratios = [1/3, 1/4, 2/5, 2/3, 3/4, 1/2, 3/5];
var ratioid = 0;
var ratio = ratios[ratioid];
var duration = 60/sz;
var long = 800;
var short = 300;


function mainbuzz() {
  Bangle.buzz(long, 1)
    .then(() => new Promise(resolve => setTimeout(resolve,(ratio*duration*1000)-long)))
    .then(() => Bangle.buzz(short, 1));
}


function draw() {
  g.clear();
  g.setFontAlign(0,0);
  g.setFont("Vector",60);
  g.drawString(sz,120,40);
  g.drawString(Math.round(ratio*100)/100,120,160);
}


draw();

setWatch(() => {
  ratioid = ((ratioid+1) % ratios.length);
  ratio = ratios[ratioid];
  draw();
  clearInterval(buzzing);
  buzzing = setInterval(mainbuzz, duration*1000);
}, BTN2, {repeat:true});

setWatch(() => {
  sz += 1;
  duration = 60/sz;
  draw();
  clearInterval(buzzing);
  buzzing = setInterval(mainbuzz, duration*1000);
}, BTN1, {repeat:true});

setWatch(() => {
  sz -= 1;
  duration = 60/sz;
  draw();
  clearInterval(buzzing);
  buzzing = setInterval(mainbuzz, duration*1000);
}, BTN3, {repeat:true});

buzzing = setInterval(mainbuzz, duration*1000);
