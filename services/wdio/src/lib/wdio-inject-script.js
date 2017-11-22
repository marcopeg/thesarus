
module.exports = browser => browser.addCommand('injectScript', injectScript)

function injectScript (scriptSrc, timeout) {
    timeout = timeout || 2000

    function asyncHandler(src, done) {

        // more or less stolen form jquery core and adapted by paul irish
        function getScript(url, success) {
            var script = document.createElement('script');
            script.src = url;
            var head = document.getElementsByTagName('head')[0],
                done = false;
            // Attach handlers for all browsers
            script.onload = script.onreadystatechange = function() {
                if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                    done = true;
                    success();
                    script.onload = script.onreadystatechange = null;
                    head.removeChild(script);
                }
            };
            head.appendChild(script);
        }

        getScript(src, done)
    }

    return this
        .timeoutsAsyncScript(timeout)
        .executeAsync(asyncHandler, scriptSrc)
        .then(res => res.value)
        .catch(() => { throw new Error('Timeout while loading script: ' + scriptSrc + ' (' + timeout + 'ms)') })
}
