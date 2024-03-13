$(document).ready(function(){
    /*
    $("#seat2").click(function(){
            $("#seat1").removeClass('comp-whole');
            $("#seat2").addClass('comp-whole');
            
        
    });
    */
    let seat=1;
    let date=14;
    let month=0;
    
    for(let i=1; i<=20; i++){
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

     for(let i=1; i<=35; i++){
        $("#cell"+i).click(function(){
            for(let j=1; j<=35; j++){
                $("#cell"+j).removeClass('calWeight');
                if (j==i) {
                    $("#cell"+j).addClass('calWeight');
                    date = j;
                }
            }
        });
     }//end for

     $("#butprev").click(function(){ 
        //if (month==1) {
            $("#calMonth").text("February");
            $("#cell1").text("28");
            $("#cell2").text("29");
            $("#cell3").text("30");
            $("#cell4").text("31");
            for (let i=1; i<=29; i++) {
                $("#cell"+(i+4)).text(i);
            }
            $("#cell34").text("1");
            $("#cell35").text("2");
            month = 0;
        //}
     });

     $("#butnext").click(function(){ 
        //if (month==0) {
            $("#calMonth").text("March");
            $("#cell1").text("25");
            $("#cell2").text("26");
            $("#cell3").text("27");
            $("#cell4").text("28");
            $("#cell5").text("29");
            for (let i=1; i<=30; i++) {
                $("#cell"+(i+4)).text(i);
            }
            month = 1;
        //}
     });
     

  });//doc
  