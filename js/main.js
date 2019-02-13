gTools = {
    color: {
        stroke: null,
        fill: null
    },
    shape: null
}
var gCanvas = null;
var gCtx;

function init() {
    gTools.color.stroke = $('#color-tool-stroke').val();
    gTools.color.fill = $('#color-tool-fill').val();
    gCanvas = $('#canvas-main');
    gCtx = gCanvas[0].getContext('2d');
}

$("#canvas-main").on("mousemove", function (e) {
    if (e.which == 1) {
        drawCanvas({ x: e.offsetX, y: e.offsetY });
    }
});

function drawCanvas(coords) {
    gCtx.fillStyle = gTools.color.stroke;
    gCtx.fillRect(coords.x, coords.y, 5, 5);
}


function onChangeColor(el) {
    gTools.color[el.dataset.colortype] = el.value;
}