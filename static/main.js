var canvas = $('#canvas').get(0);
canvas.width = 300;
canvas.height = 300;
var context = canvas.getContext('2d');
context.lineJoin = "round";
context.fillRect(0, 0, 300, 300);
var start = function (coors) {
  context.beginPath();
  context.moveTo(coors.x, coors.y);
  this.isDrawing = true;
};
var move = function (coors, e) {
  if (this.isDrawing) {
    context.strokeStyle = "#ffffff";
    context.lineWidth = 20;
    context.lineTo(coors.x, coors.y);
    context.stroke();
    e.preventDefault();
  }
};
var stop = function (coors) {
  if (this.isDrawing) {
    this.touchmove(coors);
    this.isDrawing = false;
  }
};
var drawer = {
  isDrawing: false,
  mousedown: start,
  mousemove: move,
  mouseup: stop,
  touchstart: start,
  touchmove: move,
  touchend: stop,
  touchleave: stop,
  touchcancel: stop,
};
var draw = function (e) {
  var coors = {
    x: e.clientX || e.targetTouches[0].pageX,
    y: e.clientY || e.targetTouches[0].pageY
  };
  drawer[e.type](coors, e);
}
canvas.addEventListener('mousedown', draw, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', draw, false);
canvas.addEventListener('touchstart', draw, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('touchend', draw, false);
canvas.addEventListener('touchleave', draw, false);
canvas.addEventListener('touchcancel', draw, false);

var go = function (e) {
  this.parentNode.removeChild(this);
  draw(e);
};

// prevent elastic scrolling
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault();
}, false);
// end body:touchmove
// window.onresize = function (e) {
//   canvas.width = document.body.clientWidth;
//   canvas.height = document.body.clientHeight;
// };

function test() {
  canvas.toBlob(
    (blob) => {
      $("#guess").html("guessing");
      context.fillRect(0, 0, 300, 300);
      const last = $("#last");
      const lastURL = last.attr("src");
      if (lastURL) {
        URL.revokeObjectURL(lastURL);
      }
      const url = URL.createObjectURL(blob);
      last.attr("src", url);
      const fd = new FormData();
      fd.append("image", blob);
      $.ajax({
        url: "test",
        data: fd,
        processData: false,
        contentType: false,
        type: "POST",
        success: function(data, status, jqXHR) {
          $("#guess").html(data);
        }
      });
    },
    "image/jpeg"
  );
}