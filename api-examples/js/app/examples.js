
var $api_ref = 'http://quran.com/docs/2.0';

$(document).ready(function() {
    // Build the HTML for the accordion by filling
    // the template with the examples data.
    var tmpl = $('#tmpl-examples').html();
    var examples_html = Mustache.render(tmpl, example_data);
    $('#examples').html(examples_html);
    $('#Options').collapse('show');

    // Load an example when it is clicked.
    $('.example').click(load_example);

    // Load the first example (options/language.js).
    $(".example[jsfile*='options/language.js']").click();

    // Scroll to the top when the "up" button is clicked.
    $("a[href='#top']").click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        return false;
    });

    // Initialize the ace code editor.
    window.editor = ace.edit("jscode");
    editor.setTheme("ace/theme/github");
    editor.getSession().setMode("ace/mode/javascript");
    editor.$blockScrolling = Infinity;
    //editor.renderer.setOption('showLineNumbers', false);
    //editor.renderer.setShowGutter(false);

    // Run the code of the editor when the RUN button is clicked.
    $('#jscode-run').click(function(){
        var jscode = editor.getSession().getValue();
        $('#output').html('');
        $.globalEval(jscode);
    });

    // If an example is given in the url as hash, load it automatically.
    var jsfile = window.location.hash.slice(1);
    if (jsfile) {
        $('[jsfile="' + jsfile + '"]').click();
    }
});

// Write a debug message on the output area.
var debug = function(msg) {
    $('#output').append(msg);
};

var load_example = function(){
    // Initialize HTML elements.
    $('#jscode-title').text($(this).text());
    $('#output').html('');

    // Fetch the JS file of the example and then display it and try it.
    var jsfile = $(this).attr('jsfile');
    if (!jsfile) {
        alert("Example '" + jsfile + "' not found!");
        return;
    }
    jsfile = 'examples/' + jsfile;
    fetch_jsfile(jsfile);

    // Set the href of the button 'API'.
    var apiref = $(this).attr('apiref');
    if (apiref) {
        var href = $api_ref + '/' + apiref;
        $('#jscode-api').attr('href', href);
    }
};

/**
 * Fetch the JS file then display it and run it.
 */
var fetch_jsfile = function(jsfile){
    $.ajax(jsfile, {dataType: 'text'})
        .done(function (file_content) {
            // Display the example file on the editor.
            editor.getSession().setValue(file_content);
            set_jscode_height();

            // Run the example file.
            $.globalEval(file_content);

            // Scroll "try" up to the top.
            $('html, body').animate({
                scrollTop: $('#try').offset().top - 50
            }, 500);
        });
}

/**
 * Set the height of the jscode div so that the content inside it fits
 * without scrolling.
 */
var set_jscode_height = function() {
    var new_height =
        editor.getSession().getScreenLength()
        * editor.renderer.lineHeight;
    $('#jscode').height(new_height.toString() + 'px');

    // This call is required for the editor to fix all of
    // its inner structure for adapting to a change in size
    editor.resize();
};
