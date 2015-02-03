var draw = function(cxt) {
	cxt.beginPath();
    cxt.rect(10,10,10,10);
    cxt.fillStyle = '#8ED6FF';
    cxt.fill();
    cxt.lineWidth = 2;
    cxt.strokeStyle = 'black';
    cxt.stroke();
};

cotton.ready(function(){
	cotton.canvas.draw('main', draw)
})

