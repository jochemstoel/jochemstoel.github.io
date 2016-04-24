$.xhr = function(address, then) 
{
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://informatie.link/api/xhr/', true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() 
    {
        if (xhr.readyState === 4 && xhr.status == 200) 
        {
            var parser = new DOMParser();
			var xmldoc = parser.parseFromString(xhr.responseText,"text/html");
			var $ = function(selector) 
			{
				return new jQuery(selector, xmldoc.documentElement); 
			};
			then($);    
        }
    };
  
    xhr.send('address='+address);
};