var mouse = {
	x: 0,
	y: 0,
	pctX: 0,
	pctY: 0
}

var Perspective = {
	// for testing only
	printScreen: function(){
		document.getElementById('mouseX').innerHTML = mouse.x;
		document.getElementById('mouseY').innerHTML = mouse.y;
	},

	layers: document.getElementsByClassName('p_layer'),
	center: {
		x: 0,
		y: 0
	},

	rotationLimit: 5, // in degrees
	rotation: {
		x: 0,
		y: 0
	},
	cof: 0.1,

	update: function(event){
		this.getMousePercentage();
		this.rotate();
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

	rotate: function(){
		var _finalRotationX = mouse.pctX * this.rotationLimit;
		var _finalRotationY = mouse.pctY * this.rotationLimit;

		// console.log( "(" + _finalRotationX + " - " + this.rotation.x + ")" + " * " + this.cof );
		this.rotation.x += (_finalRotationX - this.rotation.x) * this.cof;
		this.rotation.y += (_finalRotationY - this.rotation.y) * this.cof;
		var _style = "rotateX(" + this.rotation.y + "deg) rotateY(" + this.rotation.x + "deg)";
		this.applyRotation(_style);
	},

	applyRotation: function(style){
		for(var i = 0; i < this.layers.length; i++){
			this.layers[i].style.transform = style;
			this.layers[i].style.webkitTransform = style;
			this.layers[i].style.mozTransform = style;
			this.layers[i].style.msTransform = style;
			this.layers[i].style.oTransform = style;
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
		this.setCenter();
		this.setupListeners();
		// P_animate();
	}
}

// function P_animate(){
// 	requestAnimationFrame(P_animate);
// 	render();
// }

// function render(){
// 	Perspective.update();
// }