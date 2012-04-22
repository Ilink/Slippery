var Fluid = function(args){
    var self = this;
    var size, dim, dens, dens0, vel;
    dens = [];
    dens0 = [];
    dim = (args.size + 2) * (args.size + 2);
    size = args.size;
    this.init_2d_arr(size, dens);

    var velocity = new Velocity({size: size});
    var density = new Density({size: size});



    this.solve = function(){
        // main steps go here
        velocity.step();
        density.step();
        return dens; // i think? the renderer will handle it just fine
    }
}

Fluid.prototype.init_2d_arr = Util.prototype.init_2d_arr;


