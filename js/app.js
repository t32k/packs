var exec  = require('child_process').exec,
    fs    = require('fs');
    list  = document.getElementById('js-list');

exec('gem list', function(err, stdout, stderr) {
  var contents = "";
  var name = stdout.match( /\w+\s/g );
  var version = stdout.match( /\(.+\)/g );
      version = version.map(function(value){
        return value.replace(/\(|\)|\,.+/g, '');
      });
  
  
  name.forEach(function(element, index, array){
    switch (element) {
      case 'sass ':
        contents += '<li><h3 class="name sass">' + element + '</h3><p class="version">version <b>'+ version[index] +'</b></p></li>';
        break;
      case 'compass ':
        contents += '<li><h3 class="name compass">' + element + '</h3><p class="version">version <b>'+ version[index] +'</b></p></li>';
        break;
      case 'jekyll ':
        contents += '<li><h3 class="name jekyll">' + element + '</h3><p class="version">version <b>'+ version[index] +'</b></p></li>';
        break;
      case 'bundler ':
        contents += '<li><h3 class="name bundler">' + element + '</h3><p class="version">version <b>'+ version[index] +'</b></p></li>';
        break;
      default:
        contents += '<li><h3 class="name">' + element + '</h3><p class="version">version <b>'+ version[index] +'</b></p></li>';
    }
    ;
  });
  list.innerHTML = contents;
  
});