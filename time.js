var Timeline = function(args){
    var dt, dt_floor, dt_ceil, time_start, time_end, interval, callback, tickrate, paused, running;
    // all time delta values are in mS
    // javascript does not seem to get more granular than mS
    dt_floor = args.dt_floor || 30; // this is the lowest time delta that will ever get passed
    dt_ceil = args.dt_ceil || 40; // this is the ceiling on dt. Not used yet, since there is no proper pausing functionality
    tickrate = args.tickrate; // how often the loop should run
    callback = args.callback;

    var loop = function(dt){
        interval = setTimeout(function(){
            time_start = new Date();
            callback(dt);
//            console.log(dt);
            time_end = new Date();
            dt = time_end - time_start;
            if(dt < 1) dt = dt_floor;
            else console.log(dt);
            loop(dt);
        }, tickrate);
    }

    this.start = function(){
        if(!running){
            running = true;
            paused = false;
            if(typeof dt === 'undefined') dt = dt_floor;

            if (typeof callback !== 'undefined' && callback instanceof Function){
                callback(dt);
                loop(dt);
            }
            else return "error, no function provided";
        }
    }

    this.stop = function(){
        running = false;
        paused = true;
        if (interval !== null) {
            clearInterval(interval);
            interval = null;
        }
    }
}