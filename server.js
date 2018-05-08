var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ssadhu123:shuvamsadhu1@ds217350.mlab.com:17350/personfinder1";
const port = process.env.PORT || 3001;

var details = {
	id:[],
	name:[],
	phone:[],
	location:[]
};

	app.use(cors());      // to support JSON-encoded bodies
	app.use( bodyParser.json() );       // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	  extended: true
	})); 

	app.use(express.json());       // to support JSON-encoded bodies
	app.use(express.urlencoded()); // to support URL-encoded bodies

	app.get('/getReady.json', (req, res) => {
    console.log('get is received for location page');
    MongoClient.connect(url, function(err, dbo) {
	    if (err) throw err;
	 
	    var database = dbo.db('personfinder1');
	    database.collection("location").find({}).toArray( function(err, Loc) {
	    if (err) throw err;
	    
	    for (var i = 1 ; i <= Loc.length ; i++) {
	     details.id[i-1] = i
	     details.name[i-1] = Loc[i-1].name;
	     details.phone[i-1] = Loc[i-1].phone;
	     details.location[i-1] = Loc[i-1].location;
	     } 

	    console.log(details);
	    dbo.close();
		res.setHeader('Cache-Control', 'no-cache');
   		res.json({
   			"namees" : details.name[0],
   			"phones" : details.phone[0],
   			"locations" : details.location[0]
   		});
	    });
         
      }); 
	 
	});

	app.get('/getquestion.json', (req, res) => {
		var idreq = req.query.quesno;
		res.setHeader('Cache-Control', 'no-cache');
   		res.json({
   			"namees" : details.name[idreq],
   			"phones" : details.phone[idreq],
   			"locations" : details.location[idreq]
   		});

	});

	app.get('/', (req, res) => {
		res.setHeader('Cache-Control', 'no-cache');
		//res.write("Success -: Server is up and running!!");
		res.json("Success -: Server is up and running!!");
		console.log("get received");

	});
	
app.listen(port,  function () {
  console.log("server is created!!");
})