const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

server.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/userdb');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    user_type: { type: String },
    phone_number: { type: String },
    bio: { type: String },
    picture: { type: String }
}, { versionKey: false });

const reserveSchema = new mongoose.Schema({
    lab_name: { type: String },
    seat_number: { type: Number },
    reservee: { type: String }, //this is an email so no duplicate names
    reservation_date: { type: String },
    time_of_reservation: { type: String },
    date_when_reserved: { type: String },
    time_when_reserved: { type: String },
    is_anon: { type: Boolean },
    name: { type: String }
});

const userModel = mongoose.model('user', userSchema);
const reserveModel = mongoose.model('reservation', reserveSchema);

function errorFn(err) {
    console.log('Error fond. Please trace!');
    console.error(err);
}



server.get('/', function (req, resp) {
    resp.render('login', {
        layout: 'index',
        title: "Login",
        styles: "style",
        func: "login"
    });
});

server.get('/register', function (req, resp) {
    resp.render('register', {
        layout: 'index',
        title: "Register",
        styles: "style",
        func: "login"
    });
});

server.post('/server_ajax', function (req, resp) {
    const labQuery = { seat_number: req.body.input["seat"], reservation_date: req.body.input["dateReserved"], lab_name: req.body.input["labName"] };

    reserveModel.find(labQuery).then(function (lab) {
        let reservations = new Array();
        for (const reservation of lab) {
            const searchQuery = { email: reservation.reservee };
            reservations.push({
                lab_name: reservation.lab_name,
                seat_number: reservation.seat_number,
                reservee: reservation.reservee,
                name: reservation.name,
                reservation_date: reservation.reservation_date,
                time_of_reservation: reservation.time_of_reservation,
                date_when_reserved: reservation.date_when_reserved,
                is_anon: reservation.is_anon,
                time_when_reserved: reservation.time_when_reserved
            });
        }
        console.log(reservations);
        resp.send({ reservations: reservations });
    }).catch(errorFn);
    //

    //console.log(req.body.input);
});

server.post('/dashboard', function (req, resp) {
    const searchQuery = { email: req.body.email, password: req.body.password };

    //The model can be found via a search query and the information is found
    //in the login function. Access the information like a JSon array.
    userModel.findOne(searchQuery).then(function (user) {
        console.log('Finding user');

        if (user != undefined && user._id != null) {
            if (user.user_type === "Student") {
                console.log("Success Student!");
                resp.render('student-dashboard', {
                    layout: 'index',
                    title: "Lab Registration Main",
                    styles: "labs",
                    func: "lab",
                    email: user.email
                });
            }
            else {
                console.log("Success Technician!");
                resp.render('technician-dashboard', {
                    layout: 'index',
                    title: "Lab Registration Main",
                    styles: "labs",
                    func: "technician",
                    email: user.email
                });
            }

        }
    }).catch(errorFn);
});

server.get('/edit-profile', function (req, resp) {
    resp.render('edit-profile', {
        layout: 'index',
        title: "Edit Profile",
        styles: "edit-profile"
    });
});

server.get('/profile/:email', function (req, resp) {
    const searchQuery = { email: req.params.email };
    const labQuery = { reservee: req.params.email };

    userModel.findOne(searchQuery).then(function (user) {
        console.log('Finding user');
        let reservations = new Array();
        if (user != undefined && user._id != null) {
            reserveModel.find(labQuery).then(function (lab) {
                for (const reservation of lab) {
                    reservations.push({
                        lab_name: reservation.lab_name,
                        seat_number: reservation.seat_number,
                        reservation_date: reservation.reservation_date,
                        time_of_reservation: reservation.time_of_reservation,
                        date_when_reserved: reservation.date_when_reserved,
                        time_when_reserved: reservation.time_when_reserved
                    });
                }
                console.log(reservations);
            }).catch(errorFn);
            console.log("Loading User Data");
            console.log(user.name);
            resp.render('profile', {
                layout: 'index',
                title: user.email,
                styles: "profiles",
                func: "profile",
                email: user.email,
                name: user.name,
                phone: user.phone_number,
                bio: user.bio,
                reservations: reservations,
                picture: user.picture
            });
        }
    }).catch(errorFn);
});

server.get('/view-profile/:email', function (req, resp) {
    const searchQuery = { email: req.params.email };
    const labQuery = { reservee: req.params.email };

    userModel.findOne(searchQuery).then(function (user) {
        console.log('Finding user');
        let reservations = new Array();
        if (user != undefined && user._id != null) {
            reserveModel.find(labQuery).then(function (lab) {
                for (const reservation of lab) {
                    reservations.push({
                        lab_name: reservation.lab_name,
                        seat_number: reservation.seat_number,
                        reservation_date: reservation.reservation_date,
                        time_of_reservation: reservation.time_of_reservation,
                        date_when_reserved: reservation.date_when_reserved,
                        time_when_reserved: reservation.time_when_reserved
                    });
                }
                console.log(reservations);
            }).catch(errorFn);
            console.log("Loading User Data");
            console.log(user.name);
            resp.render('view-profile', {
                layout: 'index',
                title: user.email,
                styles: "profiles",
                func: "profile",
                email: user.email,
                name: user.name,
                phone: user.phone_number,
                bio: user.bio,
                reservations: reservations,
                picture: user.picture
            });
        }
    }).catch(errorFn);
});

server.get('/dashboard/:email', function (req, resp) {
    resp.render('student-dashboard', {
        layout: 'index',
        title: req.params.email,
        styles: "labs",
        func: "lab",
        email: req.params.email
    });
});

server.get('/dashboard/:email', function (req, resp) {
    resp.render('technician-dashboard', {
        layout: 'index',
        title: req.params.email,
        styles: "labs",
        func: "technician",
        email: req.params.email
    });
});


server.post('/search/:email', function (req, resp) { 
    
    const searchTerm = req.body.search_input;
    console.log('Received searchTerm:', req.body.search_input); 

    userModel.find({ name: { $regex: new RegExp(searchTerm, 'i') } }).then(function (users) {
        if (users.length == 0) {
            console.log('No users found!');
        }
        let userData = new Array();
        for (const user of users) {
            userData.push({
                name: user.name,
                email: user.email
            });
            console.log(userData);
        }
        resp.render('search-results', { 
            layout: 'index',
            styles: 'profiles',
            title: 'Search Results',
            searchTerm: searchTerm,
            users: userData,
            email: req.params.email
        });
    })
    .catch(errorFn);
       
});


/*server.post('/search', function (req, resp) { // not case-sensitive search
    
    const searchTerm = req.body.search_input;
    console.log('Received searchTerm:', req.body.search_input); 

    userModel.find({ name: searchTerm }).then(function (users) {
        if (users.length == 0) {
            console.log('No users found!');
        }
        let userData = new Array();
        for (const user of users) {
            userData.push({
                name: user.name,
                email: user.email
            });
            console.log(userData);
        }
        resp.render('search-results', { 
            layout: 'index',
            styles: 'profiles',
            title: 'Search Results',
            searchTerm: searchTerm,
            users: userData
        });
    })
    .catch(errorFn);
       
});*/

function finalClose() {
    console.log('Close connection at the end!');
    mongoose.connection.close();
    process.exit();
}

process.on('SIGTERM', finalClose);  //general termination signal
process.on('SIGINT', finalClose);   //catches when ctrl + c is used
process.on('SIGQUIT', finalClose); //catches other termination commands

const port = process.env.PORT | 3000;
server.listen(port, function () {
    console.log('Listening at port ' + port);
});