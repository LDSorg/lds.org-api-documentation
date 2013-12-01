var i
  , terms = ['stake', 'branch']
  , term
  , things = []
  , ldsOrg = 'http://www.lds.org'
  , lastWard = 263
  ;
  
function findYsa(search, cb) {
  $.ajax({
    type: 'GET'
  , url: ldsOrg + "/maps/services/search?query=YSA%20" + search + "&lang=eng"
  }).success(function (data) {
    things = things.concat(data);
    cb();
  });
}

for (i = 0; i < lastWard; i += 1) {
  terms.push(i + 1);
}

function done() {
  console.log('Done');
  var ysaMap = {}
    ;
    
  things.forEach(function (unit) {
    if ('ward.ysa' === unit.type || 'stake.ysa' === unit.type) {
      ysaMap[unit.id] = unit;
    }
  });
  //document.body.innerHTML = '<pre>' + JSON.stringify(things, null, '  ').replace(/</g, '&lt;') + '</pre>';
  document.body.innerHTML = '<pre>' + JSON.stringify(ysaMap, null, '  ').replace(/</g, '&lt;') + '</pre>';
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
