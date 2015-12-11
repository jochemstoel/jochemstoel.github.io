/* 
 * @package acquire
 * @version 0.2
 * @author Jochem Stoel (http://jochemstoel.github.io/)
 * @url http://jochemstoel.tumblr.com/post/134786730189/javascript-browser-require-ajax
 * @license Don't involve me.
 */
 
function acquire($lib, $fn) 
{
  var xhr, module, async;
  module = { };
  async = false;
  if (typeof $fn == 'function') 
  {
    async = true;
  }
  xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://jochemstoel.github.io/package/' + $lib + '/index.js', async);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () 
  {
        if (xhr.readyState === 4 && xhr.status == 200) 
        {
            if (async) 
            { 
              eval(xhr.responseText);
                return $fn(module.exports);
            } 
        }
    };
  xhr.send('lib='+$lib);
  if (!async) 
  {
    eval(xhr.responseText);
    return module.exports;
  }
}