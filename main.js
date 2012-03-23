var timeline = new Timeline({
    tickrate: "10",
    callback: function(dt){ // render loop goes here
        var pi = 0;
        var n = 1;
        for(var i = 0; i < 100000; i++){
            pi = pi + (4 / n) - (4 / (n + 2));
            n = n + 4;
        }
    }
});


$(document).ready(function(){
    timeline.start();
    timeline.stop();

    $("#start").click(function(){
        timeline.start();
    });

    $("#stop").click(function(){
        timeline.stop();
    })
});