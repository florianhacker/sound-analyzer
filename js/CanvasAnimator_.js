function CanvasAnimator(canvas, soundSpectrum){
	
	var canvas = canvas;
	var ctx = canvas.getContext( '2d' );
	var soundSpectrum = soundSpectrum;
	
	
	var frequencySum;
	var barCount = 128; // has to be devidable by 8, 16, etc...
	var frequencyRange = soundSpectrum.length / barCount; // 64
	var fBandCounter = 0;
	var fSum;
	
	this.draw = function()
	{		
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
				var fAverage = fSum / frequencyRange;
				
				ctx.fillStyle = "#ff0000"; 
				
			    ctx.fillRect((2 * currentBar) + offset, CANVAS_HEIGHT, 2, -fAverage);
				
				offset += 2;
				
				fSum = 0;
				fBandCounter = 0;
				currentBar++;
			}
		}
	}
	
}