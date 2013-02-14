function CanvasAnimator(canvas, soundSpectrum){
	
	var canvas = canvas;
	var ctx = canvas.getContext( '2d' );
	var soundSpectrum = soundSpectrum;
	
	
	var frequencySum;
	var barCount = 128; // has to be devidable by 8, 16, etc...
	var frequencyRange = soundSpectrum.length / 8; // 64
	var fBandCounter = 0;
	var fSum;

	//console.log("fRange: " + frequencyRange);
	
	
//	console.log("soundSpectrum.length: " + soundSpectrum.length);
	
	var b = new branch(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 10, 45);
	var sin = 0;
	
	this.draw = function()
	{
		sin += 0.01;			
		var spectrum = [];	
		var currentBar = 0;
		var offset = 0;
			
	    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		
		// Draw rectangle for each frequency bin.
	    for (var i = 0; i < soundSpectrum.length; i++) 
		{
			if(fBandCounter < frequencyRange)
			{	
				fSum += soundSpectrum[i];
				fBandCounter++;
			}
			if(fBandCounter == frequencyRange)
			{
				var fAverage = Math.round(fSum / frequencyRange);
				spectrum.push( fAverage );
				fBandCounter = 0;
			}
		}
		
		//console.log( spectrum )
		b.update( spectrum[4] * Math.sin(sin) );
		b.render( ctx )
		fSum = 0;
		spectrum = [];
	}
	
}


	var count = 0;
	function branch(x, y, length, angle){
		count ++;
		this.children = [];


		this.length = length;

		this.x = x;
		this.y = y;
		this.newx = x + Math.cos( angle ) * this.length;
		this.newy = y + Math.sin( angle ) * this.length;


		//line( x, y, newx, newy );
		if(count<100){
			this.children.push( new branch(this.newx, this.newy, this.length, angle-radians( 45*Math.random() ) ) );
			this.children.push( new branch( this.newx, this.newy, this.length, angle+radians( 45*Math.random() ) ) );
		}

		this.update = function(fAverage){
			this.length = fAverage;
			
			this.newx = this.x + Math.cos( angle ) * this.length;
			this.newy = this.y + Math.sin( angle ) * this.length;

			for(var i=0; i<this.children.length;i++){
				var child = this.children[i];
				child.update(this.length);
			}
		}


		this.render = function( c ){				
		
			for(var i=0; i<this.children.length;i++){
				var child = this.children[i];

				c.lineWidth = 1;

				c.beginPath();
				c.moveTo( child.x,child.y );
				c.lineTo( child.newx, child.newy ); 
				c.stroke();

				child.render( c );	
			}
		}
	}

	function random(v1, v2){
		return ((Math.random()*(v2-v1))+v1);
	}


	function radians(a){
		return a * Math.PI/180; 
	}





