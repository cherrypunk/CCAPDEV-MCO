$(document).ready(function () {
    /*$("#login").click(function () {
        console.log("MEOW");
        alert("Hello");
    });*/

    $("#register").click(function () {
        window.location.href = "/register";
    });

    $("#create-account").click(function () {
        //post to the database
        
    });
    $("#has-account").click(function () {
        window.location.href = "/";
    });
});