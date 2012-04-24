var Fluid = function(args){
    var self = this;
    var size, dim, dens, dens0, u, v, u0, v0, visc, diff;
    dens = [], dens0 = [], u = [], v = [], v0 = [], u0 = [];
    dim = (args.size + 2) * (args.size + 2);
    size = args.size;

    visc = 1;

    var velocity = new Velocity({size: size});
    var density = new Density({size: size});

    var solve = function(dens0, u0, v0, dt){
        velocity.step(u, v, u0, v0, visc, dt);
        density.step(u, v, dens, dens0, diff, dt);
        return dens; // i think? the renderer will handle it just fine
    }

    this.tick = function(dt){
        solve(dens0, u0, v0, dt);
        u0 = self.copy(u); v0 = self.copy(v);
        dens0 = self.copy(dens);
    }

    this.reset = function(){
        this.init_2d_arr(size, dens);
        this.init_2d_arr(size, dens0);
        this.init_2d_arr(size, u);
        this.init_2d_arr(size, u0);
        this.init_2d_arr(size, v);
        this.init_2d_arr(size, v0);
    }
    this.reset();

    this.add_density = function(){
        // this should be pretty easy
        // does it need to be scaled by time like add_source?
    }

    this.add_velocity = function(){
        // idk, add velocity to u and v here
        // add helpers to make it easier to produce u and v values from velocity
    }
}

Fluid.prototype.init_2d_arr = Util.prototype.init_2d_arr;
Fluid.prototype.zero_2d = Util.prototype.zero_2d;
Fluid.prototype.copy = Util.prototype.copy;