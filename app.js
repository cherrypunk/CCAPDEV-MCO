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

const bcrypt = require('bcrypt');
const saltRounds = 10;

server.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://joaquindeguzman:wJGcQrk4rXqOHqnp@animoreserve.wbe0vxk.mongodb.net/');

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

server.post('/delete_profile', function (req, resp) {
    const userQuery = { email: req.body.input["email"] };
    const reservationQuery = { reservee: req.body.input["email"] };
    console.log(userQuery);
    console.log(reservationQuery);
    userModel.findOne(userQuery).then(function (user) {
        reserveModel.deleteMany(reservationQuery).then(function (reservations) {
            console.log(reservations);
        }).catch(errorFn);
        userModel.deleteOne(userQuery).then(function (user) {

        }).catch(errorFn);
    }).catch(errorFn);
    resp.send("<script>alert(\"Account Deleted!\"); window.location.href = \"/\"; </script>")
});

server.post('/make_reservation', function (req, resp) {
    const reservationQuery = { seat_number: Number(req.body.input["seat"]), reservation_date: req.body.input["dateReserved"], lab_name: req.body.input["labName"], time_of_reservation: req.body.input["time"] };

    reserveModel.findOne(reservationQuery).then(function (reservation) {
        console.log(reservationQuery);
        if (reservation != undefined && reservation._id != null) {
            console.log("Slot already reserved!");
            resp.send({ response: "Slot already reserved!" });
        }
        else {
            const userQuery = { email: req.body.input["email"] }
            userModel.findOne(userQuery).then(function (user) {
                if (user != undefined && user._id != null) {
                    const date = new Date();
                    const newReservation = reserveModel({
                        seat_number: Number(req.body.input["seat"]),
                        reservation_date: req.body.input["dateReserved"],
                        lab_name: req.body.input["labName"],
                        time_of_reservation: req.body.input["time"],
                        date_when_reserved: date.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' }),
                        time_when_reserved: date.toLocaleTimeString('en-US'),
                        is_anon: req.body.input["is_anon"],
                        reservee: user.email,
                        name: user.name
                    });
                    newReservation.save().then(function (action) {
                    }).catch(errorFn);
                    console.log("FREE!");
                    console.log(date.toLocaleTimeString('en-US'));
                    resp.send({ response: "Reservation Successful!" });
                }
            });



            //console.log(document.getElementById("dashboard_link"));
        }
    });
});

server.post('/make_reservation_technician', function (req, resp) {
    const reservationQuery = { seat_number: Number(req.body.input["seat"]), reservation_date: req.body.input["dateReserved"], lab_name: req.body.input["labName"], time_of_reservation: req.body.input["time"] };

    reserveModel.findOne(reservationQuery).then(function (reservation) {
        console.log(reservationQuery);
        if (reservation != undefined && reservation._id != null) {
            console.log("Slot already reserved!");
            resp.send({ response: "Slot already reserved!" });
        }
        else {
            const userQuery = { name: req.body.input["name"] }
            userModel.findOne(userQuery).then(function (user) {
                if (user != undefined && user._id != null) {
                    const date = new Date();
                    const newReservation = reserveModel({
                        seat_number: Number(req.body.input["seat"]),
                        reservation_date: req.body.input["dateReserved"],
                        lab_name: req.body.input["labName"],
                        time_of_reservation: req.body.input["time"],
                        date_when_reserved: date.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' }),
                        time_when_reserved: date.toLocaleTimeString('en-US'),
                        is_anon: req.body.input["is_anon"],
                        reservee: user.email,
                        name: user.name
                    });
                    newReservation.save().then(function (action) {
                    }).catch(errorFn);
                    console.log("FREE!");
                    console.log(date.toLocaleTimeString('en-US'));
                    resp.send({ response: "Reservation Successful!" });
                }
                else {
                    resp.send({ response: "No such user exists!" });
                }
            });



            //console.log(document.getElementById("dashboard_link"));
        }
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

server.post('/delete_reservation', function (req, resp) {
    let month = "February"
    if (req.body.input["month"] == 0) {
        month = "February";
    }
    else {
        month = "March";
    }
    reservation_date = month + " " + req.body.input["date"]
    const reservationQuery = { seat_number: Number(req.body.input["seat"]), reservation_date: reservation_date, lab_name: req.body.input["currentLab"], time_of_reservation: req.body.input["time"] }
    console.log(reservationQuery);
    reserveModel.deleteOne(reservationQuery).then(function (reservation) {
        resp.send()
    }).catch(errorFn);
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

server.post('/edit_profile/:email', function (req, resp) {
    console.log(req.params.email);

    const userQuery = { email: req.params.email };
    const update = {}

    userModel.findOne(userQuery).then(function (user) {
        if (user != undefined && user._id != null) {
            console.log(user);
            console.log(update);
            if (req.body.name == "") {
                resp.send("<script>alert(\"In order to edit, please provide a name!\"); window.close(); </script>");
            }
            else {
                if (req.body.profile_pic != "") {
                    user.picture = req.body.profile_pic;
                }
                if (req.body.name != "") {
                    user.name = req.body.name;
                }
                if (req.body.contact != "") {
                    user.phone_number = req.body.contact;
                }
                if (req.body.biography != "") {
                    user.bio = req.body.biography;
                }
                user.save();
                const labQuery = { reservee: req.params.email };
                reserveModel.find(labQuery).then(function (lab) {
                    for (const reservation of lab) {
                        reservation.name = req.body.name;
                        reservation.save();
                    }
                }).catch(errorFn);
                resp.send("<script>alert(\"Edit Successful!\"); window.close(); </script>");
            }
        }
    }).catch(errorFn);
    //

    //console.log(req.body.input);
});

server.post('/dashboard', function (req, resp) {


    const searchQuery = { email: req.body.email };

    //The model can be found via a search query and the information is found
    //in the login function. Access the information like a JSon array.
    userModel.findOne(searchQuery).then(function (user) {
        console.log('Finding user');

        if (user != undefined && user._id != null) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result) {
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
                else {
                    resp.send("<script>alert(\"Incorrect username or password!\"); window.location.href = \"/\"; </script>");
                }
            });


        }
        else {
            resp.send("<script>alert(\"Incorrect username or password!\"); window.location.href = \"/\"; </script>");
        }
    }).catch(errorFn);
});

server.post('/register', function (req, resp) {
    console.log(req.body.user_type);
    if (req.body.password.length > 0 && req.body.confirm.length > 0 && req.body.name.length > 0 && req.body.email.length > 0) {
        if (req.body.password === req.body.confirm) {
            const userSearch = { email: req.body.email };

            userModel.findOne(userSearch).then(function (user) {
                console.log('Finding user');

                if (user != undefined && user._id != null) {
                    resp.send("<script>alert(\"A user with this email already exists!\"); window.location.href = \"/register\"; </script>");
                }
                else {
                    const type = ["Student", "Technician"];
                    let encrypted_pass = "";
                    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                        encrypted_pass = hash;
                        console.log(encrypted_pass);
                        const newUser = new userModel({
                            name: req.body.name,
                            email: req.body.email,
                            password: encrypted_pass,
                            user_type: type[req.body.user_type]
                        });

                        newUser.save().then(function (action) {
                            resp.send("<script>alert(\"User Created!\"); window.location.href = \"/\"; </script>");
                        }).catch(errorFn);
                    });

                }
            }).catch(errorFn);
        }
        else {
            resp.send("<script>alert(\"Passwords do not match\"); window.location.href = \"/register\"; </script>");
        }
    }
    else {
        resp.send("<script>alert(\"Make sure all fields are filled in!\"); window.location.href = \"/register\"; </script>");
    }

    //The model can be found via a search query and the information is found
    //in the login function. Access the information like a JSon array.
});

server.get('/edit-profile/:email', function (req, resp) {
    resp.render('edit-profile', {
        layout: 'index',
        title: "Edit Profile",
        styles: "edit-profile",
        email: req.params.email
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

server.get('/about/:email', function (req, resp) {
    resp.render('about', {
        layout: 'index',
        title: req.params.email,
        styles: "profiles",
        email: req.params.email
    });
});







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