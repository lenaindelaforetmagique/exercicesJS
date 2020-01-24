var font;

function preload() {
  font = loadFont('monaco.ttf');
}

function setup() {
  let lines = [
    "        ••••••           ••••••",
    "      ••     ••       ••       ••",
    "    ••          ••   ••          ••",
    "  ••             •• ••             ••",
    " ••               •••               ••",
    "••                                   ••",
    "••                                   ••",
    "••                                   ••",
    " ••                                 ••",
    "  ••                               ••",
    "   ••                             ••",
    "    ••                           ••",
    "      ••                       ••",
    "        ••                   ••",
    "          ••               ••",
    "            ••           ••",
    "              ••       ••",
    "                ••   ••",
    "                  •••",
    "                   •"
  ];

  points = font.textToPoints("", 10, 150, 150);;
  let x = 10;
  let y = 10;
  let font_size = 50;
  for (let line of lines) {
    x += 0;
    y += 60;
    points = points.concat(font.textToPoints(line, x, y, font_size));
  }
  points = points.concat(font.textToPoints("Je t'aime", 200, 550, 150));

  let u_ = new Universe(points);

  var updateCB = function(timestamp) {
    u_.refresh(timestamp);
    window.requestAnimationFrame(updateCB);
  };
  updateCB(0);
}