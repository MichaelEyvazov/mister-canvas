gTools = {
    color: {
        stroke: null,
        fill: null
    },
    shape: null,
    width: null,
}
var gCanvas = null;
var gCtx;

function init() {
    // Get default colors
    gTools.color.stroke = $('#color-tool-stroke').val();
    gTools.color.fill = $('#color-tool-fill').val();
    // Get default shape
    gTools.shape = $('#shapes-select').val();
    // Get Default width
    gTools.width = $('#width-range').val();
    // Get canvas element
    gCanvas = $('#canvas-main');
    // Set canvas dimensions to full screen
    gCanvas[0].width = window.innerWidth;
    gCanvas[0].height = window.innerHeight;
    //Get Context
    gCtx = gCanvas[0].getContext('2d');
    gCtx.strokeStyle = gTools.color.stroke;
    gCtx.fillStyle = gTools.color.fill;
}

$("#canvas-main").on("mousemove", function (e) {
    if (e.which !== 1) return;
    drawCanvas({ x: e.offsetX, y: e.offsetY });
});

function drawCanvas(coords) {
    switch (gTools.shape) {
        case 'brush':
            drawBrush(coords);
            break;
        case 'square':
            drawSquare(coords);
            break;
        case 'circle':
            drawCircle(coords);
            break;
    }
}

function drawBrush(coords) {
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = gTools.color.stroke;
    gCtx.fillStyle = gTools.color.stroke;
    gCtx.beginPath();
    gCtx.arc(coords.x, coords.y, gTools.width, 0, 2 * Math.PI);
    gCtx.stroke();
    gCtx.fill();
    gCtx.closePath();
}

function drawSquare(coords) {
    gCtx.strokeStyle = gTools.color.stroke;
    gCtx.fillStyle = gTools.color.fill;
    gCtx.lineWidth = gTools.width;
    gCtx.beginPath();
    gCtx.rect(coords.x, coords.y, gTools.width, gTools.width);
    gCtx.stroke();
    gCtx.fill();
    gCtx.closePath();
}

function drawCircle(coords) {
    gCtx.strokeStyle = gTools.color.stroke;
    gCtx.fillStyle = gTools.color.fill;
    gCtx.lineWidth = gTools.width;
    gCtx.beginPath();
    gCtx.arc(coords.x, coords.y, gTools.width, 0, 2 * Math.PI);
    gCtx.stroke();
    gCtx.fill();
    gCtx.closePath();
}

function onChangeColor(el) {
    gTools.color[el.dataset.colortype] = el.value;
}

function onResetClick() {
    gCtx.clearRect(0, 0, gCanvas[0].width, gCanvas[0].height);
}

function onSaveClick(elLink) {
    elLink.href = gCanvas[0].toDataURL()
    elLink.download = 'my-img.jpg';
}

function onShapeChange(el) {
    let choice = el.value;
    gTools.shape = choice;
}

function onChangeOutline(el) {
    gTools.width = el.value;
    $('.curr-width').html(gTools.width);
}