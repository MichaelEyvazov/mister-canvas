gTools = {
    color: {
        stroke: null,
        fill: null
    },
    shape: null,
    width: null,
    widthBase: null,
    byVelocity: false
}
var gCanvas = null;
var gCtx;

function init() {
    // Activate Tooltipster
    $('.tooltip').tooltipster();
    // Get default colors
    gTools.color.stroke = $('#color-tool-stroke').val();
    gTools.color.fill = $('#color-tool-fill').val();
    // Get default shape
    gTools.shape = $('#shapes-select').val();
    // Get Default width
    gTools.width = +$('#width-range').val();
    gTools.widthBase = +$('#width-range').val();
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
        case 'triangle':
            drawTriangle(coords);
            break;
    }
}

function drawBrush(coords) {
    gCtx.lineWidth = 1;
    gCtx.beginPath();
    gCtx.arc(coords.x, coords.y, gTools.width, 0, 2 * Math.PI);
    gCtx.fill();
    gCtx.closePath();
}

function drawSquare(coords) {
    gCtx.lineWidth = gTools.width;
    gCtx.beginPath();
    gCtx.rect(coords.x, coords.y, gTools.width, gTools.width);
    gCtx.stroke();
    gCtx.fill();
    gCtx.closePath();
}

function drawCircle(coords) {
    gCtx.lineWidth = gTools.width;
    gCtx.beginPath();
    gCtx.arc(coords.x, coords.y, gTools.width, 0, 2 * Math.PI);
    gCtx.stroke();
    gCtx.fill();
    gCtx.closePath();
}

function drawTriangle(coords) {
    gCtx.lineWidth = gTools.width / 2;
    gCtx.beginPath();
    gCtx.moveTo(coords.x, coords.y);
    gCtx.lineTo(coords.x + (gTools.width + 10), coords.y + (gTools.width + 10));
    gCtx.lineTo(coords.x - (gTools.width + 10), coords.y + (gTools.width + 10));
    gCtx.closePath();
    gCtx.fill();
    gCtx.stroke();
}

function onChangeColor(el) {
    gTools.color[el.dataset.colortype] = el.value;
    gCtx.strokeStyle = gTools.color.stroke;
    gCtx.fillStyle = gTools.color.fill;
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
    gTools.width = +el.value;
    gTools.widthBase = +el.value;
    $('.curr-width').html(gTools.width);
}

function onVelocityCheck(ev) {
    ev.stopPropagation();
    gTools.byVelocity = !gTools.byVelocity;
}


function makeVelocityCalculator(e_init, callback) {
    var x = e_init.clientX,
        y = e_init.clientY,
        t = Date.now();
    return function (e) {
        var new_x = e.clientX,
            new_y = e.clientY,
            new_t = Date.now();
        var x_dist = new_x - x,
            y_dist = new_y - y,
            interval = new_t - t;
        var velocity = Math.sqrt(x_dist * x_dist + y_dist * y_dist) / interval;
        callback(velocity);
        // update values:
        x = new_x;
        y = new_y;
        t = new_t;
    };
}
$(document).ready(function () {
    $('#canvas-main').on("mousedown", function (e) {
        var log = makeVelocityCalculator(e, function (v) {
            if (gTools.byVelocity) {
                gTools.width = gTools.widthBase + (v * 5);
            }
        });
        $(document).on("mousemove", log).one("mouseup", function(){
            $(document).off("mousemove", log);
        });

    });
});
