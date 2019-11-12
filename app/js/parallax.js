var mouse = {
	x: 0,
	y: 0,
	pctX: 0,
	pctY: 0
}

var Parallax = {
	// for testing only
	printScreen: function(){
		document.getElementById('mouseX').innerHTML = mouse.x;
		document.getElementById('mouseY').innerHTML = mouse.y;
	},

	layers: document.getElementsByClassName('px_layer'),
	center: {
		x: 0,
		y: 0
	},

	displacementLimit: 50, // in pixels
	displacementIntensity: [], // percentage range from 0 to 1
	displacement: {
		x: 0,
		y: 0
	},
	cof: 0.07,

	update: function(event){
		this.getMousePercentage();
		this.getDisplace();
	},

	updateMouse: function(event){
		var e = event || window.event;
		mouse.x = e.clientX - this.center.x;
		mouse.y = e.clientY - this.center.y;
	},
	getMousePercentage: function(){
		mouse.pctX = (mouse.x / this.center.x);
		mouse.pctY = (mouse.y / this.center.y) * (-1);
	},

	setCenter: function(){
		this.center.x = window.innerWidth/2;
		this.center.y = window.innerHeight/2;
	},

	getDisplacementIntensity: function(){
		for (var i = 0; i < this.layers.length; i++) {
			var _pxIntensity = this.layers[i].getAttribute("data-parallax-intensity");
			this.displacementIntensity.push(_pxIntensity);
		}
	},

	getDisplace: function(){
		var _finalDisplacementX = mouse.pctX * this.displacementLimit;
		var _finalDisplacementY = mouse.pctY * this.displacementLimit;

		this.displacement.x += (_finalDisplacementX - this.displacement.x) * this.cof;
		this.displacement.y += (_finalDisplacementY - this.displacement.y) * (this.cof);
		this.applyDisplacement(this.displacement.x, this.displacement.y);
	},

	applyDisplacement: function(x, y){
		for(var i = 0; i < this.layers.length; i++){
			var _x = x * this.displacementIntensity[i];
			var _y = y * this.displacementIntensity[i];

			var _style = "translate3d(" + _x + "px, " + (_y * -1) + "px, 0)";

			this.layers[i].style.transform = _style;
			this.layers[i].style.webkitTransform = _style;
			this.layers[i].style.mozTransform = _style;
			this.layers[i].style.msTransform = _style;
			this.layers[i].style.oTransform = _style;
		}
	},

	setupListeners: function(){
		var _this = this;

		window.addEventListener('mousemove', function(event){
			_this.updateMouse(event);
			// _this.printScreen();
		} );
		
		window.addEventListener('resize', function(event){
			_this.setCenter();
		});
	},

	render: function(){
		this.update();
	},


	init: function(){
		this.getDisplacementIntensity();
		this.setCenter();
		this.setupListeners();
		// Px_animate();
	}
}

// function Px_animate(){
// 	requestAnimationFrame(Px_animate);
// 	Px_render();
// }

// function Px_render(){
// 	Parallax.update();
// }