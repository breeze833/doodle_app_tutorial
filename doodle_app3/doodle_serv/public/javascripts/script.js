const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearCanvasButton = document.getElementById('clearCanvas');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

let isDrawing = false;
let startX = 0;
let startY = 0;

function startDrawing(e) {
    isDrawing = true;
    [startX, startY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;

    ctx.lineWidth = brushSize.value;
    ctx.strokeStyle = colorPicker.value;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [startX, startY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
clearCanvasButton.addEventListener('click', clearCanvas);

