var Intro = {
	ups: document.getElementsByClassName("up-in"),
	photo: document.getElementsByClassName("portrait-container"),
	firstBlock: 5,
	delay: 0,


	showUps: function(){
		if(this.photo.length > 0){
			this.photo[0].classList.add("show");
			this.delay = 1300;
		}

		for (var i = 0; i < this.ups.length; i++) {
			var _this = this;

			if(i == this.firstBlock){
				_this.delay += 500
			}

			(function(i){
				setTimeout(function(){
					_this.ups[i].classList.add("active");

					// Cursor.js triggers
					if ( i == (_this.ups.length - 1) ){
						setTimeout(function(){
							cursor.maxRadius = 50;

							setTimeout(function(){
								cursor.activeFont();
								cursor.endIntro = true
							}, 300)
						}, 500)
					}

				}, (i * 150) + _this.delay);
			})(i);
		}
	},


	init: function(){
		this.showUps()
	}
}