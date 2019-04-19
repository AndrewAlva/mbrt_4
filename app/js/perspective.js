var Perspective = {
	printScreen: function(){
		document.getElementById('mouseX').innerHTML = mouse.x;
		document.getElementById('mouseY').innerHTML = mouse.y;
	},

	mouseDetection: function(){},
	init: function(){
		var _this = this;
		window.addEventListener('mousemove', function(event){
			mouse = {
				x: event.clientX,
				y: event.clientY
			}

			_this.printScreen();
		});
	}
}

var mouse = {
	x: 0,
	y: 0,

	update: function(){}
}