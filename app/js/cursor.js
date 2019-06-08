var canvas, context;
var PI2 = Math.PI*2;
var halfPI = Math.PI/2;

var fps = 60;
var holdDuration = 1; // in seconds

var maxWidth = window.innerWidth,	
	 maxHeight = window.innerHeight;

var halfWidth = maxWidth /2,
	 halfHeight = maxHeight / 2;


	var cMouse = {
		x: halfWidth,
		y: halfHeight
	};

	var cursor = {
		x: cMouse.x,
		y: cMouse.y,
		mouseDown: false,
		cof: 0.1, //coefficient of friction
		coff: 0.2, //coefficient of friction for fonts
		coa: 1, //coefficient of acceleration
		maxRadius: 50,
		minRadius: 35,
		maxDiameter: 0,

		width: 1,
		color: "#ff606d",
		circleFill: "#ffd3cd",
		alpha: 1,
		arcStart: -halfPI,
		arcEnd: -halfPI,
		arcMax: halfPI * 3,
		
		// Text
		string: "CLICK & HOLD TO ENTER",
		stringLength: 0,
		stringWidth: 0,
		stringHeight: 0,
		stringHalfHeight: 0,
		stringCenter: 0,
		stringAlign: "center",
		stringBaseline: "middle",
		fontStyle: "normal",
		fontWeight: "lighter",
		fontSize: 12,
		fontFamily: "Helvetica",
		fontColor: "#312637",
		fontDisplacement: 14,
		fontMaxDisplacement: 14,
		fontIsActive: false,

		// Finish Hold functions
		holdEnd: false,
		holdCompleted: function(){
			this.onComplete();
		},
		onComplete: function(){
			var _this = this;
			this.minRadius = 0;

			setTimeout(function(){
				_this.color = '#f60';
				window.location = window.location.origin + "/index.html"
			}, 300);
		},

		setStringProperties: function(){
			this.stringLength = this.string.length;
			this.stringWidth = this.string.length * this.fontSize;
			this.stringHeight = this.fontSize + 3;
			this.stringCenter = this.stringWidth / 2;
			this.stringHalfHeight = (this.fontSize / 2) + 2;
		},
		
		setAcceleration: function(){
			this.coa = -Math.abs(PI2 / (holdDuration * fps));
		},
		setRadius: function(){
			this.radius = this.maxRadius;
			this.maxDiameter = this.radius * 2;
		},
		followMouse: function(){
			this.x += (cMouse.x - this.x) * this.cof;
			this.y += (cMouse.y - this.y) * this.cof;
		},
		drawStroke: function(){
			this.arcEnd += this.coa;
			if(this.arcEnd < this.arcStart) {this.arcEnd = this.arcStart};
			if(this.arcEnd > this.arcMax) {
				this.arcEnd = this.arcMax;
				
				// Finish Hold functions
				if(!this.holdEnd){
					this.holdCompleted();
					this.holdEnd = true;
				}
			}
		},
		stretchRadius: function(){
			if(!this.mouseDown){
				this.radius += (this.maxRadius - this.radius) * this.cof;
			} else {
				this.radius -= (this.radius - this.minRadius) * this.cof;
			}
			if(this.radius < this.minRadius) {this.radius = this.minRadius}
			if(this.radius > this.maxRadius) {this.radius = this.maxRadius}
		},
		
		drawFont: function(){
			context.font = this.fontStyle + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily;
			context.fillStyle = this.fontColor;
			context.textAlign = this.stringAlign;
			context.textBaseline = this.stringBaseline;
			
			//context.fillStyle = "#ff6600";
			//context.fillRect(this.x - this.maxRadius, this.y - (this.fontSize / 2) -2, this.maxDiameter, this.fontSize + 3);
			//context.fillStyle = this.color;
			
			context.save();
			context.beginPath();
			context.rect(this.x - this.stringCenter, this.y - this.stringHalfHeight, this.stringWidth, this.stringHeight);
			context.closePath();
			context.clip();
			context.fillText(this.string, this.x, this.y - this.fontDisplacement);
			context.restore();
		},
		
		animateFont: function(){
			if (this.fontIsActive){
				if(!this.mouseDown){
					this.fontDisplacement -= this.fontDisplacement * this.cof;

				} else {
					this.fontDisplacement += (this.fontMaxDisplacement - this.fontDisplacement) * this.coff;
				}
			}
		},
		activeFont: function(){
			this.fontIsActive = true;
		},

		init: function(){
			this.setAcceleration();
			this.setRadius();
			//this.radius = 0;
			this.setStringProperties();
		},
		update: function() {
			this.followMouse();
			this.drawStroke();
			this.stretchRadius();
			
			this.draw();
			this.drawFont();
			this.animateFont();
		},
		draw: function() {
			// background circle
			context.beginPath();
			context.globalAlpha= this.alpha;
			context.lineWidth= this.width;
			context.arc(this.x, this.y, this.radius, 0, PI2, false);
			context.strokeStyle = this.color;
			// context.stroke();
			context.fillStyle = this.circleFill;
			context.fill();
			context.closePath();
			
			// animate on click hold circle
			context.beginPath();
			context.globalAlpha = 1;
			context.lineWidth = this.width;
			context.arc(this.x, this.y, this.radius, this.arcStart, this.arcEnd, false);
			context.strokeStyle = this.color;
			context.stroke();
			context.closePath();
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
			cursor.coa = cursor.coa * -1;
			cursor.mouseDown = true;
		});
		window.addEventListener("mouseup", function() {
			cursor.coa = cursor.coa * -1;
			cursor.mouseDown = false;
		});
		
		setTimeout(function(){
			cursor.activeFont()
		},500);

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
	cAnimationInit();
	cursorAnimate();