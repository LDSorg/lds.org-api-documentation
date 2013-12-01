var i
  , terms = ['branch']
  , term
  , wards = []
  , ldsOrg = 'http://www.lds.org'
  , lastWard = 263
  ;
  
function findYsa(search, cb) {
  $.ajax({
    type: 'GET'
  , url: ldsOrg + "/maps/services/search?query=YSA%20" + search + "&lang=eng"
  }).success(function (data) {
    wards = wards.concat(data);
    cb();
  });
}

for (i = 0; i < lastWard; i += 1) {
  terms.push(i + 1);
}

function done() {
  console.log('Done');
  document.body.innerHTML = '<pre>' + JSON.stringify(wards, null, '  ').replace(/</g, '&lt;') + '</pre>';
}

function getOne() {
  term = terms.pop();
  if (term) {
    console.log(term);
    findYsa(term, getOne);
  } else {
    done();
  }
}

getOne();
