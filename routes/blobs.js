var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}));

//build the REST operations at the base for blobs
//this will be accessible from http://127.0.0.1:3030/blobs if the default route for / is left unchanged
router.route('/')
    
    //POST a new blob
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        //call the create function for our database
        mongoose.model('form').create({
            name: req.body.name,
            address: req.body.address,
            favColor: req.body.favColor,
            favBeverage: req.body.favBeverage,
            favSnack: req.body.favSnack,
            favBookAuthor: req.body.favBookAuthor,
            favScent: req.body.favScent,
            videoGameConsole: req.body.videoGameConsole,
            favSportTeam: req.body.favSportTeam,
            iCollect: req.body.iCollect,
            listHobbies: req.body.listHobbies,
            favStores: req.body.favStores,
            shirtSize: req.body.shirtSize,
            shoeSize: req.body.shoeSize,
            iRead: req.body.iRead,
            iWant: req.body.iWant

        }, function (err, blob) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Blob has been created
                  console.log('POST creating new blob: ' + blob);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("blobs");
                        // And forward to success page
                        res.redirect("/blobs/" + blob._id);
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(blob);
                    }
                });
              }
        })
    });

//GET all blobs
router.get('/management', function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('form').find({}, function (err, blobs) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.render('blobs/index', {
                              title: 'Qustion Submissions',
                              "blobs" : blobs
                          });
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(infophotos);
                    }
                });
              }     
        });
    })

    /* GET New Blob page. */
router.get('/new', function(req, res) {
    res.render('blobs/new', { title: 'Add New Christmas Question List' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('form').findById(id, function (err, blob) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(blob);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('form').findById(req.id, function (err, blob) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + ersr);
      } else {
        console.log('GET Retrieving ID: ' + (blob ? blob._id : null));
       
        res.format({
          html: function(){
              res.render('blobs/show', {
                "blob" : blob ? blob : {}
              });
          },
          json: function(){
              res.json(blob ? blob : {});
          }
        });
      }
    });
  });


//GET the individual blob by Mongo ID
router.get('/:id/edit', function(req, res) {
    //search for the blob within Mongo
    mongoose.model('form').findById(req.id, function (err, blob) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return the blob
            console.log('GET Retrieving ID: ' + blob ? blob._id : null);
            //format the date properly for the value to show correctly in our edit form

            res.format({
                //HTML response will render the 'edit.jade' template
                html: function(){
                       res.render('blobs/edit', {
                           "blob" : blob ? blob : {}
                        });
                 },
                 //JSON response will return the JSON output
                json: function(){
                       res.json(blob ? blob : {});
                 }
            });
        }
    });
});

//PUT to update a blob by ID
router.put('/:id/edit', function(req, res) {

   //find the document by ID
        mongoose.model('form').findById(req.id, function (err, blob) {
            //update it
            blob.update({
            name: req.body.name,
            address: req.body.address,
            favColor: req.body.favColor,
            favBeverage: req.body.favBeverage,
            favSnack: req.body.favSnack,
            favBookAuthor: req.body.favBookAuthor,
            favScent: req.body.favScent,
            videoGameConsole: req.body.videoGameConsole,
            favSportTeam: req.body.favSportTeam,
            iCollect: req.body.iCollect,
            listHobbies: req.body.listHobbies,
            favStores: req.body.favStores,
            shirtSize: req.body.shirtSize,
            shoeSize: req.body.shoeSize,
            iRead: req.body.iRead,
            iWant: req.body.iWant
            }, function (err, blobID) {
              if (err) {
                  res.send("There was a problem updating the information to the database: " + err);
              } 
              else {
                      //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                      res.format({
                          html: function(){
                               res.redirect("/blobs/" + blob._id);
                         },
                         //JSON responds showing the updated values
                        json: function(){
                               res.json(blob);
                         }
                      });
               }
            })
        });
});

// //DELETE a Blob by ID
// router.delete('/:id/edit', function (req, res){
//     //find blob by ID
//     mongoose.model('form').findById(req.id, function (err, blob) {
//         if (err) {
//             return console.error(err);
//         } else {
//             //remove it from Mongo
//             blob.remove(function (err, blob) {
//                 if (err) {
//                     return console.error(err);
//                 } else {
//                     //Returning success messages saying it was deleted
//                     console.log('DELETE removing ID: ' + blob ? blob._id : null);
//                     res.format({
//                         //HTML returns us back to the main page, or you can create a success page
//                           html: function(){
//                                res.redirect("/blobs");
//                          },
//                          //JSON returns the item with the message that is has been deleted
//                         json: function(){
//                                res.json({message : 'deleted',
//                                    item : blob
//                                });
//                          }
//                       });
//                 }
//             });
//         }
//     });
// });

module.exports = router;