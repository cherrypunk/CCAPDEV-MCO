$(document).ready(function () {
    /*
    $("#seat2").click(function(){
            $("#seat1").removeClass('comp-whole');
            $("#seat2").addClass('comp-whole');
            
        
    });
    */
    let seat = 1;
    let date = 14;
    let month = 0; //0 - feb, 1 - mar
    let time = 1;
    let anonymous = 0;
    let name = "";
    let currentLab = "GK301";



    // who is the user, if user, name automatically becomes user

    let inputReservation = -1;
    if (month == 0) {
        inputReservation = "February " + date;
    }
    else {
        inputReservation = "March " + date;
    }
    //console.log(inputReservation);

    $.post(
        /* Link sent to the server */
        '/server_ajax',
        /* Input sent to the server */
        { input: { seat: seat, dateReserved: inputReservation, labName: currentLab } },
        /* Call-back function that processes the server response */
        function (data, status) {
            if (status === 'success') {
                $("#buttonslot1").removeClass("occupiedleft");
                $("#buttonslot2").removeClass("occupiedleft");
                $("#buttonslot3").removeClass("occupiedleft");
                $("#buttonslot4").removeClass("occupiedleft");
                $("#buttonslot5").removeClass("occupiedleft");
                $("#buttonslot6").removeClass("occupiedleft");
                $("#buttonslot7").removeClass("occupiedleft");
                $("#slot1").html("Available");
                $("#slot2").html("Available");
                $("#slot3").html("Available");
                $("#slot4").html("Available");
                $("#slot5").html("Available");
                $("#slot6").html("Available");
                $("#slot7").html("Available");
                for (let k = 0; k <= data.reservations.length; k++) {
                    if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                        if (data.reservations[k]["is_anon"] === true) {
                            $("#slot1").html("Anonymous");
                        } else {
                            $("#slot1").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                        }

                        $("#buttonslot1").addClass("occupiedleft");
                    }
                    else if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                        if (data.reservations[k]["is_anon"] === true) {
                            $("#slot2").html("Anonymous");
                        } else {
                            $("#slot2").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                        }
                        $("#buttonslot2").addClass("occupiedleft");
                    }
                    else if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                        if (data.reservations[k]["is_anon"] === true) {
                            $("#slot3").html("Anonymous");
                        } else {
                            $("#slot3").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                        }
                        $("#buttonslot3").addClass("occupiedleft");
                    }
                    else if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                        if (data.reservations[k]["is_anon"] === true) {
                            $("#slot4").html("Anonymous");
                        } else {
                            $("#slot4").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                        }
                        $("#buttonslot4").addClass("occupiedleft");
                    }
                    else if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                        if (data.reservations[k]["is_anon"] === true) {
                            $("#slot5").html("Anonymous");
                        } else {
                            $("#slot5").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                        }
                        $("#buttonslot5").addClass("occupiedleft");
                    }
                    else if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                        if (data.reservations[k]["is_anon"] === true) {
                            $("#slot6").html("Anonymous");
                        } else {
                            $("#slot6").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                        }
                        $("#buttonslot6").addClass("occupiedleft");
                    }
                    else if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                        if (data.reservations[k]["is_anon"] === true) {
                            $("#slot7").html("Anonymous");
                        } else {
                            $("#slot7").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                        }
                        $("#buttonslot7").addClass("occupiedleft");
                    }

                }
            }//if
        });//fn+post

    for (let l = 1; l <= 20; l++) {
        $.post(
            /* Link sent to the server */
            '/server_ajax',
            /* Input sent to the server */
            { input: { seat: l, dateReserved: inputReservation, labName: currentLab } },
            /* Call-back function that processes the server response */
            function (data, status) {
                if (status === 'success') {
                    /*let counter = 0;
                    for (let k = 0; k <= 6; k++) { //iterating seat reservations
                        if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                            counter += 1;
                        }
                        if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                            counter += 1;
                            console.log("good morning");
                        }
                        if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                            counter += 1;
                        }
                        if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                            counter += 1;
                        }
                        if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                            counter += 1;
                        }
                        if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                            counter += 1;
                        }
                        if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                            counter += 1;
                        }

                        console.log(k);
                        if (counter == 7) {
                            $("#seathead" + l).addClass("comp-full");
                        }
                        else if (counter > 0) {
                            $("#seathead" + l).addClass("comp-some");
                        }


                    }*/
                    console.log(data.reservations);
                    if (data.reservations.length == 0) {
                        console.log("NULL");
                    }
                    else if (data.reservations.length < 7) {
                        $("#seathead" + l).removeClass("card-header-comp");
                        $("#seathead" + l).addClass("comp-some");

                    }
                    else {
                        $("#seathead" + l).removeClass("card-header-comp");
                        $("#seathead" + l).addClass("comp-full");
                    }
                }//if
            });//fn+post
    }


    for (let i = 1; i <= 20; i++) { //change seat highlight
        $("#seat" + i).click(function () {
            for (let j = 1; j <= 20; j++) {
                $("#seat" + j).removeClass('comp-whole');
                if (j == i) {
                    $("#seat" + j).addClass('comp-whole');
                    seat = j;
                }
            }
            console.log("DJFKL");
            let inputReservation = -1;
            if (month == 0) {
                inputReservation = "February " + date;
            }
            else {
                inputReservation = "March " + date;
            }
            //console.log(inputReservation);
            $.post(
                /* Link sent to the server */
                '/server_ajax',
                /* Input sent to the server */
                { input: { seat: i, dateReserved: inputReservation, labName: currentLab } },
                /* Call-back function that processes the server response */
                function (data, status) {
                    if (status === 'success') {
                        $("#buttonslot1").removeClass("occupiedleft");
                        $("#buttonslot2").removeClass("occupiedleft");
                        $("#buttonslot3").removeClass("occupiedleft");
                        $("#buttonslot4").removeClass("occupiedleft");
                        $("#buttonslot5").removeClass("occupiedleft");
                        $("#buttonslot6").removeClass("occupiedleft");
                        $("#buttonslot7").removeClass("occupiedleft");
                        $("#slot1").html("Available");
                        $("#slot2").html("Available");
                        $("#slot3").html("Available");
                        $("#slot4").html("Available");
                        $("#slot5").html("Available");
                        $("#slot6").html("Available");
                        $("#slot7").html("Available");
                        for (let k = 0; k <= data.reservations.length; k++) {
                            if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot1").html("Anonymous");
                                } else {
                                    $("#slot1").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }

                                $("#buttonslot1").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot2").html("Anonymous");
                                } else {
                                    $("#slot2").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot2").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot3").html("Anonymous");
                                } else {
                                    $("#slot3").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot3").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot4").html("Anonymous");
                                } else {
                                    $("#slot4").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot4").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot5").html("Anonymous");
                                } else {
                                    $("#slot5").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot5").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot6").html("Anonymous");
                                } else {
                                    $("#slot6").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot6").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot7").html("Anonymous");
                                } else {
                                    $("#slot7").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot7").addClass("occupiedleft");
                            }

                        }
                    }//if
                });//fn+post
        });
    }//end for

    for (let i = 1; i <= 35; i++) { //change calendar highlight
        $("#cell" + i).click(function () {
            if (month == 0) { //for february
                if (i != 1 && i != 2 && i != 3 && i != 4 && i != 34 && i != 35) {
                    for (let j = 1; j <= 35; j++) {
                        $("#cell" + j).removeClass('calweight');
                        if (j == i) {
                            $("#cell" + j).addClass('calweight');
                            date = j - 4;
                            let inputReservation = -1;
                            if (month == 0) {
                                inputReservation = "February " + date;
                            }
                            else {
                                inputReservation = "March " + date;
                            }

                            for (let l = 1; l <= 20; l++) {
                                $.post(
                                    /* Link sent to the server */
                                    '/server_ajax',
                                    /* Input sent to the server */
                                    { input: { seat: l, dateReserved: inputReservation, labName: currentLab } },
                                    /* Call-back function that processes the server response */
                                    function (data, status) {
                                        if (status === 'success') {
                                            /*let counter = 0;
                                            for (let k = 0; k <= 6; k++) { //iterating seat reservations
                                                if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                                                    counter += 1;
                                                }
                                                if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                                                    counter += 1;
                                                    console.log("good morning");
                                                }
                                                if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                                                    counter += 1;
                                                }
                                                if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                                                    counter += 1;
                                                }
                                                if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                                                    counter += 1;
                                                }
                                                if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                                                    counter += 1;
                                                }
                                                if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                                                    counter += 1;
                                                }
                        
                                                console.log(k);
                                                if (counter == 7) {
                                                    $("#seathead" + l).addClass("comp-full");
                                                }
                                                else if (counter > 0) {
                                                    $("#seathead" + l).addClass("comp-some");
                                                }
                        
                        
                                            }*/
                                            console.log(data.reservations);
                                            $("#seathead" + l).removeClass("comp-some");
                                            $("#seathead" + l).removeClass("comp-full");
                                            $("#seathead" + l).addClass("card-header-comp");
                                            if (data.reservations.length == 0) {
                                                console.log("NULL");
                                            }
                                            else if (data.reservations.length < 7) {
                                                $("#seathead" + l).removeClass("card-header-comp");
                                                $("#seathead" + l).addClass("comp-some");

                                            }
                                            else {
                                                $("#seathead" + l).removeClass("card-header-comp");
                                                $("#seathead" + l).addClass("comp-full");
                                            }
                                        }//if
                                    });//fn+post
                            }

                            //console.log(inputReservation);
                            $.post(
                                /* Link sent to the server */
                                '/server_ajax',
                                /* Input sent to the server */
                                { input: { seat: seat, dateReserved: inputReservation, labName: currentLab } },
                                /* Call-back function that processes the server response */
                                function (data, status) {
                                    if (status === 'success') {
                                        $("#buttonslot1").removeClass("occupiedleft");
                                        $("#buttonslot2").removeClass("occupiedleft");
                                        $("#buttonslot3").removeClass("occupiedleft");
                                        $("#buttonslot4").removeClass("occupiedleft");
                                        $("#buttonslot5").removeClass("occupiedleft");
                                        $("#buttonslot6").removeClass("occupiedleft");
                                        $("#buttonslot7").removeClass("occupiedleft");
                                        $("#slot1").html("Available");
                                        $("#slot2").html("Available");
                                        $("#slot3").html("Available");
                                        $("#slot4").html("Available");
                                        $("#slot5").html("Available");
                                        $("#slot6").html("Available");
                                        $("#slot7").html("Available");
                                        for (let k = 0; k <= data.reservations.length; k++) {
                                            if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot1").html("Anonymous");
                                                } else {
                                                    $("#slot1").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }

                                                $("#buttonslot1").addClass("occupiedleft");
                                            }
                                            else if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot2").html("Anonymous");
                                                } else {
                                                    $("#slot2").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }
                                                $("#buttonslot2").addClass("occupiedleft");
                                            }
                                            else if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot3").html("Anonymous");
                                                } else {
                                                    $("#slot3").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }
                                                $("#buttonslot3").addClass("occupiedleft");
                                            }
                                            else if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot4").html("Anonymous");
                                                } else {
                                                    $("#slot4").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }
                                                $("#buttonslot4").addClass("occupiedleft");
                                            }
                                            else if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot5").html("Anonymous");
                                                } else {
                                                    $("#slot5").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }
                                                $("#buttonslot5").addClass("occupiedleft");
                                            }
                                            else if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot6").html("Anonymous");
                                                } else {
                                                    $("#slot6").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }
                                                $("#buttonslot6").addClass("occupiedleft");
                                            }
                                            else if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot7").html("Anonymous");
                                                } else {
                                                    $("#slot7").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }
                                                $("#buttonslot7").addClass("occupiedleft");
                                            }

                                        }
                                    }//if
                                });
                        }
                    }
                }
            }
            else if (month == 1) { //for march
                if (i != 1 && i != 2 && i != 3 && i != 4 && i != 5) {
                    for (let j = 1; j <= 35; j++) {
                        $("#cell" + j).removeClass('calweight');
                        if (j == i) {
                            $("#cell" + j).addClass('calweight');
                            date = j - 5;
                            let inputReservation = -1;
                            if (month == 0) {
                                inputReservation = "February " + date;
                            }
                            else {
                                inputReservation = "March " + date;
                            }

                            for (let l = 1; l <= 20; l++) {
                                $.post(
                                    /* Link sent to the server */
                                    '/server_ajax',
                                    /* Input sent to the server */
                                    { input: { seat: l, dateReserved: inputReservation, labName: currentLab } },
                                    /* Call-back function that processes the server response */
                                    function (data, status) {
                                        if (status === 'success') {
                                            /*let counter = 0;
                                            for (let k = 0; k <= 6; k++) { //iterating seat reservations
                                                if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                                                    counter += 1;
                                                }
                                                if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                                                    counter += 1;
                                                    console.log("good morning");
                                                }
                                                if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                                                    counter += 1;
                                                }
                                                if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                                                    counter += 1;
                                                }
                                                if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                                                    counter += 1;
                                                }
                                                if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                                                    counter += 1;
                                                }
                                                if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                                                    counter += 1;
                                                }
                        
                                                console.log(k);
                                                if (counter == 7) {
                                                    $("#seathead" + l).addClass("comp-full");
                                                }
                                                else if (counter > 0) {
                                                    $("#seathead" + l).addClass("comp-some");
                                                }
                        
                        
                                            }*/
                                            console.log(data.reservations);
                                            $("#seathead" + l).removeClass("comp-some");
                                            $("#seathead" + l).removeClass("comp-full");
                                            $("#seathead" + l).addClass("card-header-comp");
                                            if (data.reservations.length == 0) {
                                                console.log("NULL");
                                            }
                                            else if (data.reservations.length < 7) {
                                                $("#seathead" + l).removeClass("card-header-comp");
                                                $("#seathead" + l).addClass("comp-some");

                                            }
                                            else {
                                                $("#seathead" + l).removeClass("card-header-comp");
                                                $("#seathead" + l).addClass("comp-full");
                                            }
                                        }//if
                                    });//fn+post
                            }
                            //console.log(inputReservation);
                            $.post(
                                /* Link sent to the server */
                                '/server_ajax',
                                /* Input sent to the server */
                                { input: { seat: seat, dateReserved: inputReservation, labName: currentLab } },
                                /* Call-back function that processes the server response */
                                function (data, status) {
                                    if (status === 'success') {
                                        $("#buttonslot1").removeClass("occupiedleft");
                                        $("#buttonslot2").removeClass("occupiedleft");
                                        $("#buttonslot3").removeClass("occupiedleft");
                                        $("#buttonslot4").removeClass("occupiedleft");
                                        $("#buttonslot5").removeClass("occupiedleft");
                                        $("#buttonslot6").removeClass("occupiedleft");
                                        $("#buttonslot7").removeClass("occupiedleft");
                                        $("#slot1").html("Available");
                                        $("#slot2").html("Available");
                                        $("#slot3").html("Available");
                                        $("#slot4").html("Available");
                                        $("#slot5").html("Available");
                                        $("#slot6").html("Available");
                                        $("#slot7").html("Available");
                                        for (let k = 0; k <= data.reservations.length; k++) {
                                            if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot1").html("Anonymous");
                                                } else {
                                                    $("#slot1").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }

                                                $("#buttonslot1").addClass("occupiedleft");
                                            }
                                            else if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot2").html("Anonymous");
                                                } else {
                                                    $("#slot2").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }
                                                $("#buttonslot2").addClass("occupiedleft");
                                            }
                                            else if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot3").html("Anonymous");
                                                } else {
                                                    $("#slot3").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }
                                                $("#buttonslot3").addClass("occupiedleft");
                                            }
                                            else if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot4").html("Anonymous");
                                                } else {
                                                    $("#slot4").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }
                                                $("#buttonslot4").addClass("occupiedleft");
                                            }
                                            else if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot5").html("Anonymous");
                                                } else {
                                                    $("#slot5").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }
                                                $("#buttonslot5").addClass("occupiedleft");
                                            }
                                            else if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot6").html("Anonymous");
                                                } else {
                                                    $("#slot6").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }
                                                $("#buttonslot6").addClass("occupiedleft");
                                            }
                                            else if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                                                if (data.reservations[k]["is_anon"] === true) {
                                                    $("#slot7").html("Anonymous");
                                                } else {
                                                    $("#slot7").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                                }
                                                $("#buttonslot7").addClass("occupiedleft");
                                            }

                                        }
                                    }//if
                                });
                        }
                    }
                }
            }

        });
    }//end for

    $(".butprev").click(function () { //calendar back to feb
        if (month == 1) {
            $("#calMonth").text("February");
            $("#cell1").text("28");
            $("#cell2").text("29");
            $("#cell3").text("30");
            $("#cell4").text("31");
            $("#cell5").removeClass("bg-gray  text-muted");
            $("#cell34").addClass("bg-gray  text-muted");
            $("#cell35").addClass("bg-gray  text-muted");
            for (let i = 1; i <= 29; i++) {
                $("#cell" + (i + 4)).text(String(i));
            }
            $("#cell34").text("1");
            $("#cell35").text("2");
            for (let j = 1; j <= 35; j++) {
                $("#cell" + j).removeClass('calweight');
            }
            $("#cell33").addClass('calweight');
            month = 0;
            date = 29;
            let inputReservation = -1;
            if (month == 0) {
                inputReservation = "February " + date;
            }
            else {
                inputReservation = "March " + date;
            }

            for (let l = 1; l <= 20; l++) {
                $.post(
                    /* Link sent to the server */
                    '/server_ajax',
                    /* Input sent to the server */
                    { input: { seat: l, dateReserved: inputReservation, labName: currentLab } },
                    /* Call-back function that processes the server response */
                    function (data, status) {
                        if (status === 'success') {
                            /*let counter = 0;
                            for (let k = 0; k <= 6; k++) { //iterating seat reservations
                                if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                                    counter += 1;
                                    console.log("good morning");
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                                    counter += 1;
                                }
        
                                console.log(k);
                                if (counter == 7) {
                                    $("#seathead" + l).addClass("comp-full");
                                }
                                else if (counter > 0) {
                                    $("#seathead" + l).addClass("comp-some");
                                }
        
        
                            }*/
                            console.log(data.reservations);
                            $("#seathead" + l).removeClass("comp-some");
                            $("#seathead" + l).removeClass("comp-full");
                            $("#seathead" + l).addClass("card-header-comp");
                            if (data.reservations.length == 0) {
                                console.log("NULL");
                            }
                            else if (data.reservations.length < 7) {
                                $("#seathead" + l).removeClass("card-header-comp");
                                $("#seathead" + l).addClass("comp-some");

                            }
                            else {
                                $("#seathead" + l).removeClass("card-header-comp");
                                $("#seathead" + l).addClass("comp-full");
                            }
                        }//if
                    });//fn+post
            }

            //console.log(inputReservation);
            $.post(
                /* Link sent to the server */
                '/server_ajax',
                /* Input sent to the server */
                { input: { seat: seat, dateReserved: inputReservation, labName: currentLab } },
                /* Call-back function that processes the server response */
                function (data, status) {
                    if (status === 'success') {
                        $("#buttonslot1").removeClass("occupiedleft");
                        $("#buttonslot2").removeClass("occupiedleft");
                        $("#buttonslot3").removeClass("occupiedleft");
                        $("#buttonslot4").removeClass("occupiedleft");
                        $("#buttonslot5").removeClass("occupiedleft");
                        $("#buttonslot6").removeClass("occupiedleft");
                        $("#buttonslot7").removeClass("occupiedleft");
                        $("#slot1").html("Available");
                        $("#slot2").html("Available");
                        $("#slot3").html("Available");
                        $("#slot4").html("Available");
                        $("#slot5").html("Available");
                        $("#slot6").html("Available");
                        $("#slot7").html("Available");
                        for (let k = 0; k <= data.reservations.length; k++) {
                            if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot1").html("Anonymous");
                                } else {
                                    $("#slot1").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }

                                $("#buttonslot1").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot2").html("Anonymous");
                                } else {
                                    $("#slot2").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot2").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot3").html("Anonymous");
                                } else {
                                    $("#slot3").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot3").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot4").html("Anonymous");
                                } else {
                                    $("#slot4").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot4").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot5").html("Anonymous");
                                } else {
                                    $("#slot5").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot5").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot6").html("Anonymous");
                                } else {
                                    $("#slot6").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot6").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot7").html("Anonymous");
                                } else {
                                    $("#slot7").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot7").addClass("occupiedleft");
                            }

                        }
                    }//if
                });
        }
    });

    $(".butnext").click(function () { //calendar back to mar
        if (month == 0) {
            $("#calMonth").text("March");
            $("#cell1").text("25");
            $("#cell2").text("26");
            $("#cell3").text("27");
            $("#cell4").text("28");
            $("#cell5").text("29");
            $("#cell5").addClass("bg-gray  text-muted");
            $("#cell34").removeClass("bg-gray  text-muted");
            $("#cell35").removeClass("bg-gray  text-muted");
            for (let i = 1; i <= 30; i++) {
                $("#cell" + (i + 5)).text(String(i));
            }
            for (let j = 1; j <= 35; j++) {
                $("#cell" + j).removeClass('calweight');
            }
            $("#cell6").addClass('calweight');
            month = 1;
            date = 1;
            let inputReservation = -1;
            if (month == 0) {
                inputReservation = "February " + date;
            }
            else {
                inputReservation = "March " + date;
            }

            for (let l = 1; l <= 20; l++) {
                $.post(
                    /* Link sent to the server */
                    '/server_ajax',
                    /* Input sent to the server */
                    { input: { seat: l, dateReserved: inputReservation, labName: currentLab } },
                    /* Call-back function that processes the server response */
                    function (data, status) {
                        if (status === 'success') {
                            /*let counter = 0;
                            for (let k = 0; k <= 6; k++) { //iterating seat reservations
                                if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                                    counter += 1;
                                    console.log("good morning");
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                                    counter += 1;
                                }
        
                                console.log(k);
                                if (counter == 7) {
                                    $("#seathead" + l).addClass("comp-full");
                                }
                                else if (counter > 0) {
                                    $("#seathead" + l).addClass("comp-some");
                                }
        
        
                            }*/
                            console.log(data.reservations);
                            $("#seathead" + l).removeClass("comp-some");
                            $("#seathead" + l).removeClass("comp-full");
                            $("#seathead" + l).addClass("card-header-comp");
                            if (data.reservations.length == 0) {
                                console.log("NULL");
                            }
                            else if (data.reservations.length < 7) {
                                $("#seathead" + l).removeClass("card-header-comp");
                                $("#seathead" + l).addClass("comp-some");

                            }
                            else {
                                $("#seathead" + l).removeClass("card-header-comp");
                                $("#seathead" + l).addClass("comp-full");
                            }
                        }//if
                    });//fn+post
            }
            //console.log(inputReservation);
            $.post(
                /* Link sent to the server */
                '/server_ajax',
                /* Input sent to the server */
                { input: { seat: seat, dateReserved: inputReservation, labName: currentLab } },
                /* Call-back function that processes the server response */
                function (data, status) {
                    if (status === 'success') {
                        $("#buttonslot1").removeClass("occupiedleft");
                        $("#buttonslot2").removeClass("occupiedleft");
                        $("#buttonslot3").removeClass("occupiedleft");
                        $("#buttonslot4").removeClass("occupiedleft");
                        $("#buttonslot5").removeClass("occupiedleft");
                        $("#buttonslot6").removeClass("occupiedleft");
                        $("#buttonslot7").removeClass("occupiedleft");
                        $("#slot1").html("Available");
                        $("#slot2").html("Available");
                        $("#slot3").html("Available");
                        $("#slot4").html("Available");
                        $("#slot5").html("Available");
                        $("#slot6").html("Available");
                        $("#slot7").html("Available");
                        for (let k = 0; k <= data.reservations.length; k++) {
                            if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot1").html("Anonymous");
                                } else {
                                    $("#slot1").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }

                                $("#buttonslot1").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot2").html("Anonymous");
                                } else {
                                    $("#slot2").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot2").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot3").html("Anonymous");
                                } else {
                                    $("#slot3").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot3").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot4").html("Anonymous");
                                } else {
                                    $("#slot4").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot4").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot5").html("Anonymous");
                                } else {
                                    $("#slot5").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot5").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot6").html("Anonymous");
                                } else {
                                    $("#slot6").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot6").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot7").html("Anonymous");
                                } else {
                                    $("#slot7").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot7").addClass("occupiedleft");
                            }

                        }
                    }//if
                });
        }
    });

    for (let i = 1; i <= 7; i++) { //change time dropdown
        $("#drop" + i).click(function () {
            switch (i) {
                case 1:
                    $("#dropdownMenu2").text("07:30 a.m. - 09:00 a.m.");
                    time = 1;
                    break;
                case 2:
                    $("#dropdownMenu2").text("09:15 a.m. - 10:45 a.m.");
                    time = 2;
                    break;
                case 3:
                    $("#dropdownMenu2").text("11:00 a.m. - 12:30 p.m.");
                    time = 3;
                    break;
                case 4:
                    $("#dropdownMenu2").text("12:45 p.m. - 02:15 p.m.");
                    time = 4;
                    break;
                case 5:
                    $("#dropdownMenu2").text("02:30 p.m. - 04:00 p.m.");
                    time = 5;
                    break;
                case 6:
                    $("#dropdownMenu2").text("04:15 p.m. - 05:45 p.m.");
                    time = 6;
                    break;
                case 7:
                    $("#dropdownMenu2").text("06:00 p.m. - 07:30 p.m.");
                    time = 7;
                    break;
            }
        });
    }//end for

    $("#success-outlined").click(function () { //no button
        anonymous = 0;
    });

    $("#secondary-outlined").click(function () { //no button
        anonymous = 1;
    });

    $("#searchbtn").click(function () {
        alert("Searching!");
    });

    $("#reservebtn").click(function () { //no button
        let mon = "February";
        let timecomp = "07:30 a.m. - 09:00 a.m.";
        name = "Placeholder";
        let ano = "No";
        if (month == 0) {
            mon = "February";
        }
        else if (month == 1) {
            mon = "March"
        }
        switch (time) {
            case 1:
                timecomp = "07:30 a.m. - 09:00 a.m.";
                break;
            case 2:
                timecomp = "09:15 a.m. - 10:45 a.m.";
                break;
            case 3:
                timecomp = "11:00 a.m. - 12:30 p.m.";
                break;
            case 4:
                timecomp = "12:45 p.m. - 02:15 p.m.";
                break;
            case 5:
                timecomp = "02:30 p.m. - 04:00 p.m.";
                break;
            case 6:
                timecomp = "04:15 p.m. - 05:45 p.m.";
                break;
            case 7:
                timecomp = "06:00 p.m. - 07:30 p.m.";
                break;
        }
        switch (anonymous) {
            case 0:
                ano = false;
                break;
            case 1:
                ano = true;
                break;
        }



        /*alert("Date: " + mon + " " + date
            + "\nTime: " + timecomp
            + "\nSeat: " + seat
            + "\nAnonymous: " + ano
            + "\nName: " + name);
        console.log(name);*/
        name = $("#dashboard_link").attr('href');
        $.post(
            "/make_reservation",
            { input: { seat: seat, dateReserved: mon + " " + date, labName: currentLab, time: timecomp, is_anon: ano, email: name.split("/")[2] } },
            function (data, status) {
                if (status === 'success') {
                    alert(data.response);
                    location.reload();
                }
            });
    });




    for (let i = 1; i <= 5; i++) { //change lab dropdown
        $("#lab" + i).click(function () {

            switch (i) {
                case 1:
                    $("#dropdownMenu1").text("GK301");
                    currentLab = "GK301";
                    break;
                case 2:
                    $("#dropdownMenu1").text("GK302");
                    currentLab = "GK302";
                    break;
                case 3:
                    $("#dropdownMenu1").text("GK303");
                    currentLab = "GK303";
                    break;
                case 4:
                    $("#dropdownMenu1").text("GK304");
                    currentLab = "GK304";
                    break;
                case 5:
                    $("#dropdownMenu1").text("GK305");
                    currentLab = "GK305";
                    break;
            }
            console.log(currentLab);
            let inputReservation = -1;
            if (month == 0) {
                inputReservation = "February " + date;
            }
            else {
                inputReservation = "March " + date;
            }

            for (let l = 1; l <= 20; l++) {
                $.post(
                    /* Link sent to the server */
                    '/server_ajax',
                    /* Input sent to the server */
                    { input: { seat: l, dateReserved: inputReservation, labName: currentLab } },
                    /* Call-back function that processes the server response */
                    function (data, status) {
                        if (status === 'success') {
                            /*let counter = 0;
                            for (let k = 0; k <= 6; k++) { //iterating seat reservations
                                if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                                    counter += 1;
                                    console.log("good morning");
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                                    counter += 1;
                                }
                                if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                                    counter += 1;
                                }
        
                                console.log(k);
                                if (counter == 7) {
                                    $("#seathead" + l).addClass("comp-full");
                                }
                                else if (counter > 0) {
                                    $("#seathead" + l).addClass("comp-some");
                                }
        
        
                            }*/
                            console.log(data.reservations);
                            $("#seathead" + l).removeClass("comp-some");
                            $("#seathead" + l).removeClass("comp-full");
                            $("#seathead" + l).addClass("card-header-comp");
                            if (data.reservations.length == 0) {
                                console.log("NULL");
                            }
                            else if (data.reservations.length < 7) {
                                $("#seathead" + l).removeClass("card-header-comp");
                                $("#seathead" + l).addClass("comp-some");

                            }
                            else {
                                $("#seathead" + l).removeClass("card-header-comp");
                                $("#seathead" + l).addClass("comp-full");
                            }
                        }//if
                    });//fn+post
            }

            $.post(
                /* Link sent to the server */
                '/server_ajax',
                /* Input sent to the server */
                { input: { seat: seat, dateReserved: inputReservation, labName: currentLab } },
                /* Call-back function that processes the server response */
                function (data, status) {
                    if (status === 'success') {
                        $("#buttonslot1").removeClass("occupiedleft");
                        $("#buttonslot2").removeClass("occupiedleft");
                        $("#buttonslot3").removeClass("occupiedleft");
                        $("#buttonslot4").removeClass("occupiedleft");
                        $("#buttonslot5").removeClass("occupiedleft");
                        $("#buttonslot6").removeClass("occupiedleft");
                        $("#buttonslot7").removeClass("occupiedleft");
                        $("#slot1").html("Available");
                        $("#slot2").html("Available");
                        $("#slot3").html("Available");
                        $("#slot4").html("Available");
                        $("#slot5").html("Available");
                        $("#slot6").html("Available");
                        $("#slot7").html("Available");
                        for (let k = 0; k <= data.reservations.length; k++) {
                            if (data.reservations[k]["time_of_reservation"] === "07:30 a.m. - 09:00 a.m.") {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot1").html("Anonymous");
                                } else {
                                    $("#slot1").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }

                                $("#buttonslot1").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "09:15 a.m. - 10:45 a.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot2").html("Anonymous");
                                } else {
                                    $("#slot2").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot2").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "11:00 a.m. - 12:30 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot3").html("Anonymous");
                                } else {
                                    $("#slot3").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot3").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "12:45 p.m. - 02:15 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot4").html("Anonymous");
                                } else {
                                    $("#slot4").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot4").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "02:30 p.m. - 04:00 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot5").html("Anonymous");
                                } else {
                                    $("#slot5").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot5").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "04:15 p.m. - 05:45 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot6").html("Anonymous");
                                } else {
                                    $("#slot6").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot6").addClass("occupiedleft");
                            }
                            else if ((data.reservations[k]["time_of_reservation"] === "06:00 p.m. - 07:30 p.m.")) {
                                if (data.reservations[k]["is_anon"] === true) {
                                    $("#slot7").html("Anonymous");
                                } else {
                                    $("#slot7").html("<a target=\"_blank\" href=\"/view-profile/" + data.reservations[k]['reservee'] + "\" class=\"leftlinks deleteright\">" + data.reservations[k]['name'] + "</a>");
                                }
                                $("#buttonslot7").addClass("occupiedleft");
                            }

                        }
                    }//if
                });


        });
    }


});//doc
