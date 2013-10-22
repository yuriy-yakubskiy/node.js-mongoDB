var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var data = db.collection('data');

    var cursor = data.find({});
//    cursor.skip(1);
//    cursor.limit(10);
    cursor.sort( [['State', 1], ['Temperature', -1] ]);
    //cursor.sort([['grade', 1], ['student', -1]]);

    //var options = { 'skip' : 1,
    //                'limit' : 4,
    //                'sort' : [['grade', 1], ['student', -1]] };
    //var cursor = grades.find({}, {}, options);
    
    
    state = '';

    cursor.each(function(err, doc) {
        if(err) throw err;
        
        if(doc == null) {
            console.dir('Close');
            return db.close();
        }
        
        if( state != doc.State ){
            
            state = doc.State;
            
            var query = { '_id' : doc._id };
            var operator = { '$set' : { 'month_high' : doc.Temperature } };
            var options = { 'upsert' : true };
            
            db.collection('data').update(query, operator, function(err, updated) {
                if(err) throw err;

                console.dir("Successfully updated " + updated + " document!");

                //return db.close();
            });
            
            //console.dir({'State' : doc.State, 'Temperature' : doc.Temperature});
        }
        
       
        
//        console.dir(doc);
    });
    
    
});


