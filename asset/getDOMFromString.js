function getDOMFromString(data, mime)
{
  var mime = mime || 'text/xml';
  
  if (window.ActiveXObject && window.GetObject) 
  { 
    // Internet Explorer
    var dom = new ActiveXObject('Microsoft.XMLDOM');
    dom.loadXML(data);
    return dom;
  }
  if (window.DOMParser)
  { 
    return new DOMParser().parseFromString(data,'text/xml'); // text/html
  }
  throw new Error( 'No XML parser available' );
}

var dataing = document.getElementById("dataing").innerHTML;
var xmlData   = getXmlDOMFromString(dataing);