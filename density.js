var Density = function(args){
    var self = this;

    var diffuse = function(size, bound, dens, dens0, rate, dt){
        var a = dt * rate * size * size;
        for (var k = 0; k < 20; k++ ) {
            for (var i = 1; i<= size; i++ ) {
                for (var j = 1 ; j <= size; j++ ) {
                    // i think it is using the previous density (d0) because this process is iterative (see outermost loop)
                    // could dens0 be part of the function instead of an argument?
                    dens[i][j] = (dens0[i][j] + a * (
                                                    dens[i-1][j] + dens[i+1][j] + dens[i][j-1] + dens[i][j+1])
                                                    ) /
                                                    (1 + 4 * a);
                }
            }
            self.set_boundary (size, bound, dens);
        }
    }

    this.step = function(dens, u, v){
        diffuse();
        self.advect();
    }
}

Density.prototype.set_boundary = Fluid_core.prototype.set_boundary;
Density.prototype.advect = Fluid_core.prototype.advect;
Density.prototype.swap = Util.prototype.swap;