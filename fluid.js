var Fluid = function(args){
    var self = this;
    var total_size, inner_size, dim, dens, dens0, u, v, u0, v0, visc, diff;
    dens = [], dens0 = [], u = [], v = [], v0 = [], u0 = [];
    diff = 2;
    visc = 2;
    dim = (args.size + 2) * (args.size + 2);
    inner_size = args.size;
    total_size = inner_size + 2;

    visc = 1;

    var velocity = new Velocity({size: inner_size});
    var density = new Density({size: inner_size});

    var solve = function(dens0, u0, v0, dt){
        velocity.step(u, v, u0, v0, visc, dt);
        density.step(u, v, dens, dens0, diff, dt);
    }

    this.tick = function(dt){

        solve(dens0, u0, v0, dt);
        u0 = self.copy(u); v0 = self.copy(v);
        dens0 = self.copy(dens);
        return dens;
    }

    this.reset = function(){
        this.init_2d_arr(total_size, dens);
        this.init_2d_arr(total_size, dens0);
        this.init_2d_arr(total_size, u);
        this.init_2d_arr(total_size, u0);
        this.init_2d_arr(total_size, v);
        this.init_2d_arr(total_size, v0);
    }
    this.reset();

    this.add_density = function(new_dens, dt){
        self.increase(inner_size, dens, new_dens, dt);
    }

    this.add_velocity = function(new_u, new_v, dt){
        for(var i = 0; i < inner_size; i++){
            for(var j = 0; j < inner_size; j++){
                u[i][j] += dt * new_u[i][j];
                v[i][j] += dt * new_v[i][j];
            }
        }
        // idk, add velocity to u and v here
        // add helpers to make it easier to produce u and v values from velocity
    }

    this.get_dens = function(){
        return dens;
    }
}

Fluid.prototype.init_2d_arr = Util.prototype.init_2d_arr;
Fluid.prototype.zero_2d = Util.prototype.zero_2d;
Fluid.prototype.copy = Util.prototype.copy;
Fluid.prototype.increase = Fluid_core.prototype.increase;