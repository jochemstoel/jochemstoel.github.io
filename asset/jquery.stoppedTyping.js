$.fn.stoppedTyping = function(then, after) 
{
	var typingTimer;  
	var then = then || function() { };              
	var after = after || 5000; 

	$(this).keydown(function() 
	{
		clearTimeout(typingTimer);
	});

	$(this).keyup(function() 
	{
		clearTimeout(typingTimer);
	    typingTimer = setTimeout(then, after);
	});
};