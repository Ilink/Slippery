var Timeline = function(args){
    var dt, dt_floor, dt_ceil, time_start, time_end, interval, callback, tickrate;
    dt_floor = args.dt_floor || 0.066; // this is the lowest time delta that will ever get passed
    dt_ceil = args.dt_ceil || 2; // this is the ceiling on dt. Not used yet, since there is no proper pausing functionality
    tickrate = args.tickrate;
    callback = args.callback;

    var loop = function(dt){
        interval = setTimeout(function(){
            time_start = new Date();
            callback(dt);
            console.log(dt);
            time_end = new Date();
            dt = time_end - time_start;
            if(dt < 1) dt = 0.066;
            loop(dt);
        }, tickrate);
    }

    this.start = function(){
        time_start = (new Date()).getTime();
        if(typeof dt === 'undefined') dt = dt_floor;

        if (typeof(callback !== 'undefined') && callback instanceof Function){
            callback(dt);
            loop(dt);
        }
        else return "error, no function provided";

        time_end = (new Date()).getTime();
    }

    this.stop = function(){
        if (interval !== null) {
            clearInterval(interval);
            interval = null;
        }
    }
}