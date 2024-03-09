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

server.get('/dashboard', function (req, resp) {
    resp.render('dashboard', {
        layout: 'index',
        title: "Lab Registration Main",
        styles: "labs",
        func: "login"
    });
});

/*server.post('/ajax_response', function (req, resp) {
    const animal_name = String(req.body.animal);
    const response = {
        image: sticker_dictionary[animal_name]
    };
    resp.send(response);
    sticker_array.push(response);
});*/

const port = process.env.PORT | 9090;
server.listen(port, function () {
    console.log('Listening at port ' + port);
});