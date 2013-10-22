var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;
    console.dir('hello');

    var query = { 'scores' : {'$exists': 1} };
    var projection = { 'scores' : 1 };

    db.collection('students').find(query).toArray(function(err, docs) {
        if(err) throw err;

        var docLength = docs.length;
        var docCount = 0;
        
        docs.forEach(function (doc) {
            docCount++;
            console.log( docCount + ' - ' + docLength  );
            
            var homeWorkRemoved = false;
            
            doc.scores.sort(compare);
            
            for( var i in doc.scores ){
                var score = doc.scores[i];
                
                if( ! homeWorkRemoved ){
                    if( score.type == 'homework' ){
                        doc.scores.splice( i, 1 );
                        homeWorkRemoved = true;
                        
                        var query = {'_id' : doc._id };
                        db.collection('students').update( query, doc, function(err, updated) {
                            if(err) throw err;
                        });                        
                        
                        break;
                    }
                }
            }
            
            if ( docCount >= docLength ){
                setTimeout( function(){
                    console.dir('Closing DB!!');
                    return db.close();                    
                }, 1000);
            }
        });


    });
});

function compare(a, b ) {
  var field = 'score';  
    
  if (a[field] < b[field])
     return -1;
  if ( a[field] > b[field] )
    return 1;
  return 0;
}



