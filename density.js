var Density = function(args){
    var self = this;
    var size = args.size;

    // x is density
    // u, v are velocity vectors
    this.step = function(u, v, x, x0, diff, dt){
        self.increase(size, x, x0, dt);
        self.swap(x, x0);
        self.diffuse(size, 1, x, x0, diff, dt);
        self.swap(x, x0);
        self.advect(size, 1, x, x0, u, v, dt);
    }
}

Density.prototype.set_boundary = Fluid_core.prototype.set_boundary;
Density.prototype.diffuse = Fluid_core.prototype.diffuse;
Density.prototype.advect = Fluid_core.prototype.advect;
Density.prototype.increase = Fluid_core.prototype.increase;
Density.prototype.swap = Util.prototype.swap;