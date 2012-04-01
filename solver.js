var Solver = function(args){

    var dx = args.velocity;

    function random(min, max)
    {
        return Math.random() * (max - min) + min;
    }

    var calculate_position = function(body, x){
        var angle = random(0, Math.PI);
        var slope = Math.tan(angle);
        return slope * x
    }

    this.tick = function(dt, bodies){
        $.each(bodies, function(i, body){
            body.x += dt / 100;
            body.y = calculate_position(body, body.x);
        });
    }
}