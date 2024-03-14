$(document).ready(function(){
    /*
    $("#seat2").click(function(){
            $("#seat1").removeClass('comp-whole');
            $("#seat2").addClass('comp-whole');
            
        
    });
    */
    let seat=1;
    let date=14;
    let month=0; //0 - feb, 1 - mar
    let time = 1;
    let anonymous = 0;
    let name = "";
    let currentLab = "GK301"; //  default is "Lab 1"

    // who is the user, if user, name automatically becomes user

    
    for(let i=1; i<=20; i++){ //change seat highlight
        $("#seat"+i).click(function(){
            for(let j=1; j<=20; j++){
                $("#seat"+j).removeClass('comp-whole');
                if (j==i) {
                    $("#seat"+j).addClass('comp-whole');
                    seat = j;
                }
            }
        });
     }//end for

     for(let i=1; i<=35; i++){ //change calendar highlight
        $("#cell"+i).click(function(){
            if (month == 0) { //for february
                if (i!=1 && i!=2 && i!=3 && i!=4 && i!=34 && i!=35) {
                    for(let j=1; j<=35; j++){
                        $("#cell"+j).removeClass('calweight');
                        if (j==i) {
                            $("#cell"+j).addClass('calweight');
                            date = j - 4;
                        }
                    }
                }
            }
            else if (month == 1) { //for march
                if (i!=1 && i!=2 && i!=3 && i!=4 && i!=5) {
                    for(let j=1; j<=35; j++){
                        $("#cell"+j).removeClass('calweight');
                        if (j==i) {
                            $("#cell"+j).addClass('calweight');
                            date = j - 5;
                        }
                    }
                }
            }
            
        });
     }//end for

     $(".butprev").click(function(){ //calendar back to feb
        if (month==1) {
            $("#calMonth").text("February");
            $("#cell1").text("28");
            $("#cell2").text("29");
            $("#cell3").text("30");
            $("#cell4").text("31");
            $("#cell5").removeClass("bg-gray  text-muted");
            $("#cell34").addClass("bg-gray  text-muted");
            $("#cell35").addClass("bg-gray  text-muted");
            for (let i=1; i<=29; i++) {
                $("#cell"+(i+4)).text(String(i));
            }
            $("#cell34").text("1");
            $("#cell35").text("2");
            for(let j=1; j<=35; j++){
                $("#cell"+j).removeClass('calweight');
            }
            $("#cell33").addClass('calweight');
            month = 0;
            date = 29;
        }
     });

     $(".butnext").click(function(){ //calendar back to mar
        if (month==0) {
            $("#calMonth").text("March");
            $("#cell1").text("25");
            $("#cell2").text("26");
            $("#cell3").text("27");
            $("#cell4").text("28");
            $("#cell5").text("29");
            $("#cell5").addClass("bg-gray  text-muted");
            $("#cell34").removeClass("bg-gray  text-muted");
            $("#cell35").removeClass("bg-gray  text-muted");
            for (let i=1; i<=30; i++) {
                $("#cell"+(i+5)).text(String(i));
            }
            for(let j=1; j<=35; j++){
                $("#cell"+j).removeClass('calweight');
            }
            $("#cell6").addClass('calweight');
            month = 1;
            date = 1;
        }
     });

     for(let i=1; i<=7; i++){ //change time dropdown
        $("#drop"+i).click(function(){
            switch(i) {
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

     $("#success-outlined").click(function(){ //no button
        anonymous = 0;
     });

     $("#secondary-outlined").click(function(){ //no button
        anonymous = 1;
     });

     $("#reservebtn").click(function(){ //no button
        let mon = "February";
        let timecomp = "07:30 a.m. - 09:00 a.m.";
        name = document.getElementById("namespace").value;
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
                ano = "No";
                break;
            case 1:
                ano = "Yes";
                break;
        }


        alert("Date: " + mon + " " + date
            + "\nTime: " + timecomp
            + "\nSeat: " + seat
            + "\nAnonymous: " + ano
            + "\nName: " + name);
            console.log(name);
     });
     $(document).ready(function() {
        
        $("#dropdownMenu2").text("GK301 ");
    
        
        $(".lab-button").click(function() {
            
            const labName = $(this).data("lab");
            const pageURL = $(this).data("url");
    
            
            if (currentLab === labName) {
                console.log("Already on " + labName + ", no action needed.");
                $("#dropdownMenu2").text("GK301 "); 
                return; // Don't perform any action
                
            }
    
            
            currentLab = labName; 
        
            $("#dropdownMenu2").text(currentLab); 
    
           
            switch (true) {
                case labName.startsWith("aa"):
                    console.log("Opening in a new tab...");// for debugging only
                    window.open(pageURL, '_blank');
                    break;
                default:
                    console.log("Opening in the same tab..."); // for debugging only
                    window.location.assign(pageURL);
                    break;
            }
            
        });
    });
    
    
    
    
     

  });//doc
  