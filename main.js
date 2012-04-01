var Animation = function(args){
    var x = 0;
    var mover = $(args.mover);

    var draw_at = function(element){
        $(element).clone().appendTo('#display').text("*");
    }

    this.sin = function(dt){
        x += dt / 100;

        var sin_x = Math.sin(x);
        sin_x *= 50;
        mover.css({
            "top": sin_x,
            "left": x * 10
        });
        draw_at(mover);
    }

    this.bounce = function(dt){
        x += dt / 100;
        var y = Math.abs(Math.sin(x) / x) * 100;
        mover.css({
            "bottom": y * 10,
            "left": x * 10
        });
        draw_at(mover);
    }

}

var pi = function(){
    var pi = 0;
    var n = 1;
    for(var i = 0; i < 1000000; i++){
        pi = pi + (4 / n) - (4 / (n + 2));
        n = n + 4;
    }
}

var simple_interaction = function(canvas, bodies){
    $(canvas).click(function(e){
        var x = e.offsetX;
        var y = e.offsetY;
        bodies.push({
            x: x,
            y: y
        });
    });
}

$(document).ready(function(){

    var screen_width = $(window).width();
    var screen_height = $(window).height();

    var animation = new Animation({
        mover: "#mover"
    });

    var mouse = new Mouse({
        "selector": "#display_canvas"
    });
    mouse.start_measuring();

    var bodies = [];

    var solver = new Solver({
        velocity: 0.5
    });


    simple_interaction("#display_canvas", bodies);

    var display = new Display({
        'canvas': "#display_canvas"
    });

    var timeline = new Timeline({
        tickrate: 10,
        callback: function(dt){ // render loop goes here
//            animation.sin(dt);
            solver.tick(dt, bodies);
            display.render(bodies);
            console.log(bodies);
//            pi();
        }
    });

    $("#start").click(function(){
        timeline.start();
    });

    $("#stop").click(function(){
        timeline.stop();
    })
});