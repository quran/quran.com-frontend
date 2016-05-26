/**
 * API_URL
 */
var $api_url = 'http://api.quran.com:3000';

/**
 * Extend the function $.ajax().
 */
var http_request = function(url, settings) {
    // If parameter settings is not given, assign a default value.
    var settings = settings || {};

    // Set some parameters of the ajax request.
    settings.url = (url.indexOf('http') == 0) ? url : $api_url + url;
    settings.dataType = 'json';

    // Output some debug info before making the request.
    settings.beforeSend = function() {
        var str_settings = JSON.stringify(settings, undefined, 4);
        debug("\n------------ start http_request -----------------"
              + "\n===> URL: " + url
              + "\n===> SETTINGS:\n" + str_settings);
        return true;
    };

    // Make the request and handle some common cases.
    var request = $.ajax(settings);
    request.done(function(response) {
        debug("\n===> RESULT:\n" + JSON.stringify(response, undefined, 4));
    });
    request.always(function(){
        debug("\n------------ end http_request -----------------\n");
    });
    request.fail(function(jqXHR, errorThrown, textStatus) {
	console.log(errorThrown);
        if (jqXHR.responseJSON) {
            if (jqXHR.responseJSON.error) {
                debug("\n===> ERROR " + jqXHR.responseJSON.error + ': ' + jqXHR.responseJSON.error_description);
            }
            else {
                debug("\n===> ERROR " + jqXHR.responseJSON[0]);
            }
        }
        else {
            debug("\n===> ERROR " + textStatus);
        }
    });

    return request;
}
