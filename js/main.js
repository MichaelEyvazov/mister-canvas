gTools = {
    color: null,
    shape: null
}
var gCanvas = null;
var gCtx;

function init() {
    gTools.color = $('#color-tool').val();
    gCanvas = $('#canvas-main');
    gCtx = gCanvas[0].getContext('2d');
}

$("#canvas-main").on("mousemove", function (e) {
    if (e.which == 1) {
        drawCanvas({ x: e.offsetX, y: e.offsetY });
    }
});

function drawCanvas(coords) {
    gCtx.fillStyle = gTools.color;
    gCtx.fillRect(coords.x, coords.y, 5, 5);
}


function onChangeColor(el) {
    gTools.color = el.value;
}