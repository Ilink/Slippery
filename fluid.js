var Fluid = function(args){
    var self = this;
    var size, dim, dens, dens0, vel;
    dens = [];
    dens0 = [];
    dim = (args.size + 2) * (args.size + 2);
    size = args.size;
    this.init_2d_arr(size, dens);

    var velocity = new Velocity();
    var density = new Density();

    this.add_density = function(new_dens, dt){
        for (var i = 0 ; i < size; i++) {
            for(var j = 0; j < size; j++){
                dens[i][j] += dt * new_dens[i][j]; // why does this need to be scaled by time?
                // i guess it doesn't, but it makes it more representative of how much density was added over a time period
            }
        }
    }

    this.solve = function(){
        // main steps go here
        velocity.step();
        density.step();
        return dens; // i think? the renderer will handle it just fine
    }
}

Fluid.prototype.init_2d_arr = Helpers.prototype.init_2d_arr;


