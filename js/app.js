var exec  = require('child_process').exec,
    fs    = require('fs');
    list  = document.getElementById('js-list');

exec('gem list', function(err, stdout, stderr) {
  var contents = "";
  var name = stdout.match( /\w+\s/g );
  var version = stdout.match( /\(.+\)/g );
  name.forEach(function(element, index, array){
    contents += '<li><h3 class="name">' + element + '</h3><p class="version">version <b>'+ version[index] +'</b></p></li>';
  });
  list.innerHTML = contents;
  console.log('name is= '+ name);
  console.log('version is= '+ version);
});