+(function(){

  var $ = require('jquery'),
      _  = require('underscore'),
      exec = require('child_process').exec,
      $eList = $('#js-list'),
      $eRubyVersion = $('#js-rubyVersion');
      $eGemVersion = $('#js-gemVersion');

  _.str = require('underscore.string');
  // Mix in non-conflict functions to Underscore namespace if you want
  _.mixin(_.str.exports());
  // All functions, include conflict, will be available through _.str object
  _.str.include('Underscore.string', 'string'); // => true

  // メインリストの構築
  exec('gem list', function(err, stdout, stderr) {
    var contents = "";
    var name = stdout.match( /\w+\s/g );
        name = name.map(function(value){
          return value.replace(/\s/g, '');
        });
    var version = stdout.match( /\(.+\)/g );
        version = version.map(function(value){
          return value.replace(/\(|\)|\,.+/g, '');
        });
    
    name.forEach(function(elem, index, arr) {

      contents += '<li class="listCard-item" data-package="'
                + elem +'"><p class="listCard-version">v<span class="b">'
                + version[index] + '</span></p><h3 class="listCard-nameBox"><span class="listCard-name">'
                + _.humanize(elem) + '</span></h3></li>';
      
    });

    $eList.html(contents);
    
  });

  // Gemのバージョン表示
  exec('gem --version', function(err, stdout, stderr) {
    $eGemVersion.html(' v' + stdout);
  });

  // Rubyのバージョン表示
  exec('ruby --version', function(err, stdout, stderr) {
    $eRubyVersion.html(_.humanize(stdout));
  });
})();

