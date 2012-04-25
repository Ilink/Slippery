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

var render_numbers = function(selector, arr){
    var size = arr.length;
    selector = $(selector);
    for(var i = 0; i < size; i++){
        for(var j = 0; j < size; j++){
            selector.append(arr[i][j]);
        }
        selector.append('<br/>')
    }
}

$(document).ready(function(){

    var size = 10;
    var mock_dens = [];
    mock_dens = Util.prototype.init_2d_arr(size, mock_dens);
    mock_dens[0][5] = 5;
    console.log(mock_dens);

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

    var fluid = new Fluid({
        "size": size
    });

    simple_interaction("#display_canvas", bodies);

    var display = new Display({
        'canvas': "#display_canvas"
    });

    var timeline = new Timeline({
        tickrate: 10,
        callback: function(dt){ // render loop goes here
            fluid.add_density(mock_dens);
            fluid.tick(dt);
            render_numbers("#container", fluid.get_dens());
        }
    });

    $("#start").click(function(){
        timeline.start();
    });

    $("#stop").click(function(){
        timeline.stop();
    });

});