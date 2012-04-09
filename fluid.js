var Fluid = function(args){
    var size, dim, dens, vel;
    dens = [];
    dim = (args.size + 2) * (args.size + 2);
    size = args.size;
    this.init_2d_arr(size, dens);

    this.add_density = function(new_dens, dt){
        for (var i = 0 ; i < size; i++) {
            for(var j = 0; j < size; j++){
                dens[i][j] += dt * new_dens[i][j]; // why does this need to be scaled by time?
            }
        }
    }

    this.solve = function(){
        // main steps go here
    }
}

Fluid.prototype.init_2d_arr = Helpers.prototype.init_2d_arr;


