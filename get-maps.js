var ldsOrg = 'http://www.lds.org'
  , things = []
  , lastWard = 263
  , lastStudentWard = 5 // married wards
  , terms = ['ysa%20stake', 'ysa%20branch', 'student%20stake', 'student%20branch']
  , term
  , i
  ;
  
function findYsa(search, cb) {
  $.ajax({
    type: 'GET'
  , url: ldsOrg + "/maps/services/search?query=" + search + "&lang=eng"
  }).success(function (data) {
    things = things.concat(data);
    cb();
  });
}

for (i = 0; i < lastWard; i += 1) {
  terms.push("YSA%20" + (i + 1));
}

for (i = 0; i < lastStudentWard; i += 1) {
  terms.push("Student%20" + (i + 1));
}

function done() {
  console.log('Done');
  var ysaMap = {}
    ;
    
  things.forEach(function (unit) {
    if ('ward.ysa' === unit.type || 'stake.ysa' === unit.type || 'ward.student' === unit.type || 'stake.student' === unit.type) {
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
