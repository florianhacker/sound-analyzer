function SoundAnalyzer(){
		
	var audioContext;
	var audioSource;
	var audioAnalyser;
	var audioBuffer;
	
	var fSpectrumArray;
	
	function init()
	{  
		audioContext = new (window.AudioContext || window.webkitAudioContext)();
	    audioSource = audioContext.createBufferSource();
	
	    audioAnalyser = audioContext.createAnalyser();
	    audioAnalyser.fftSize = 2048;

	    // Connect audio processing graph
	    audioSource.connect(audioAnalyser);
	    audioAnalyser.connect( audioContext.destination );
		
		fSpectrumArray = new Uint8Array( audioAnalyser.frequencyBinCount );
	    
	    loadAudioBuffer("song.mp3");
	}
	
	this.getSoundSpectrum = function()
	{
		return fSpectrumArray;
	}
	
	this.analyze = function()
	{		
		audioAnalyser.getByteFrequencyData( fSpectrumArray );		
	}
	
	
	function loadAudioBuffer(url)
	{
    	// Load asynchronously
    	var request = new XMLHttpRequest();
    	request.open("GET", url, true);
    	request.responseType = "arraybuffer";
	
	    request.onload = function()
		{ 
	        audioBuffer = audioContext.createBuffer( request.response, false /*true*/);
	        finishLoad();  // add in the slider, etc. now that we've loaded the audio
	    }
	
	    request.send();
	}
	

	function finishLoad()
	{
	    audioSource.buffer = audioBuffer;
	    audioSource.loop = true;

	    audioSource.noteOn(0);
	}

	
	init();	
}