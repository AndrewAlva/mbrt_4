var canvas, context;
var PI2 = Math.PI*2;
var halfPI = Math.PI/2;

var fps = 60;
var holdDuration = .5; // in seconds

var maxWidth = window.innerWidth,	
	 maxHeight = window.innerHeight;

var halfWidth = maxWidth /2,
	 halfHeight = maxHeight / 2;


var cMouse = {
	// x: halfWidth,
	x: maxWidth - 708,
	y: halfHeight
};

var cursor = {
	x: cMouse.x,
	y: cMouse.y,
	mouseDown: false,
	cof: 0.1, //coefficient of friction
	coff: 0.12, //coefficient of friction for fonts
	accelRadius: 0, //radius acceleration
	maxRadius: 0,
	minRadius: 2,
	maxDiameter: 0,

	color: "#ff606d",
	circleFill: "#ffd3cd",
	circleFill2: "#f9f9f9",
	// circleFill: "#10292e",
	alpha: 1,
	
	// Text
	string: "CLICK & HOLD TO ENTER",
	stringLength: 0,
	stringWidth: 0,
	stringHalfHeight: 0,
	stringCenter: 0,
	stringAlign: "center",
	stringBaseline: "middle",
	fontStyle: "normal",
	fontWeight: "lighter",
	fontSize: 12,
	fontFamily: "Helvetica",
	fontColor: "#312637",
	// fontColor: "#fff",
	fontDisplacement: 14,
	fontMaxDisplacement: 14,
	fontIsActive: false,

	// Finish Hold functions
	endIntro: false,
	holdEnd: false,
	holdCompleted: function(){
		if (this.endIntro) {this.onComplete();}
	},
	onComplete: function(){
		var _this = this;
		this.mouseDown = false;
		this.maxRadius = 1920;
		holdDuration = 1;
		this.cof = this.cof / 5;
		this.setAccelRadius();
		this.circleFill = this.circleFill2;
		this.fontColor = this.circleFill;

		setTimeout(function(){
			window.location = window.location.origin + "/index.html";
		}, 1000);
	},


	setRadius: function(){
		this.radius = 0;
		this.maxDiameter = this.radius * 2;
	},
	followMouse: function(){
		this.x += (cMouse.x - this.x) * this.cof;
		this.y += (cMouse.y - this.y) * this.cof;
	},
	setAccelRadius: function(){
		this.accelRadius = (this.maxRadius - this.minRadius) / (fps * holdDuration);
	},
	stretchRadius: function(){
		if(!this.mouseDown){
			// this.radius += this.accelRadius;
			this.radius += (this.maxRadius - this.radius) * this.cof;
		} else {
			// this.radius -= this.accelRadius;
			this.radius -= (this.radius - this.minRadius) * this.cof;
			// Hold max reached
			if(this.radius < this.minRadius + 0.5) {
				this.radius = this.minRadius;
				this.holdCompleted();
			}
		}
		if(this.radius > this.maxRadius) {this.radius = this.maxRadius}
	},
	draw: function() {
		// background circle
		context.beginPath();
		context.globalAlpha= this.alpha;
		context.arc(this.x, this.y, this.radius, 0, PI2, false);
		context.fillStyle = this.circleFill;
		context.fill();
		context.closePath();
	},
	
	setStringProperties: function(){
		this.stringLength = this.string.length;
		this.stringWidth = this.string.length * this.fontSize;
		this.stringCenter = this.stringWidth / 2;
		this.stringHalfHeight = (this.fontSize / 2) + 2;
	},
	drawFont: function(){
		context.font = this.fontStyle + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily;
		context.fillStyle = this.fontColor;
		context.textAlign = this.stringAlign;
		context.textBaseline = this.stringBaseline;
		
		context.save();
		context.beginPath();
		context.rect(this.x - this.stringCenter, this.y - this.stringHalfHeight, this.stringWidth, this.fontSize);
		context.closePath();
		context.clip();
		context.fillText(this.string, this.x, this.y + this.fontDisplacement);
		context.restore();
	},
	
	animateFont: function(){
		if (this.fontIsActive){
			if(!this.mouseDown){
				this.fontDisplacement -= this.fontDisplacement * this.coff;

			} else {
				this.fontDisplacement += (this.fontMaxDisplacement - this.fontDisplacement) * this.coff;
			}
		}
	},
	activeFont: function(){
		this.fontIsActive = true;
	},


	update: function() {
		this.followMouse();
		this.stretchRadius();
		this.draw();

		this.animateFont();
		this.drawFont();
	},
	init: function(){
		this.setRadius();
		this.setStringProperties();
	}
};

function cAnimationInit() {
	canvas = document.createElement('canvas');
	context = canvas.getContext('2d');
	document.body.appendChild(canvas);
	cursor.init();

	window.addEventListener("resize", function() {
		onResizeWindow();
	}, false);

	window.addEventListener("mousemove", function(event) {
		cMouse = {
			x: event.clientX,
			y: event.clientY
		};
	});
	
	window.addEventListener("mousedown", function() {
		cursor.mouseDown = true;
	});
	window.addEventListener("mouseup", function() {
		cursor.mouseDown = false;
	});
	
	// setTimeout(function(){
	// 	cursor.activeFont();
	// 	cursor.setAccelRadius();
	// },1500);

	onResizeWindow();
}

function cursorAnimate() {
	requestAnimationFrame(cursorAnimate);
	cursorRender();
}

function cursorRender() {
	context.clearRect(0, 0, maxWidth, maxHeight);
	cursor.update();
}


function onResizeWindow() {
	maxWidth = window.innerWidth;
	maxHeight = window.innerHeight;
	halfWidth = maxWidth /2;
	halfHeight = maxHeight / 2;
	canvas.width = maxWidth;
	canvas.height = maxHeight;
}

if ( document.getElementById('cursor-canvas') ){
	var _fakeCanvas = document.getElementById('cursor-canvas');
	_fakeCanvas.parentNode.removeChild(_fakeCanvas);

	cAnimationInit();
	cursorAnimate();
}