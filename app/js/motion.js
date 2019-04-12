var Intro = {
	masks: document.getElementsByClassName("mask-container"),
	ups: document.getElementsByClassName("up-in"),
	photo: document.getElementsByClassName("portrait-container"),


	showUps: function(){
		for (var i = 0; i < this.ups.length; i++) {
			var _this = this;
			(function(i){
				setTimeout(function(){
					_this.ups[i].classList.add("active");

					if((i + 1) == _this.ups.length){
						_this.photo[0].classList.add("show");
					}
				}, i * 200);
			})(i);
		}
	},

	init: function(){
		this.showUps();
	}
}
