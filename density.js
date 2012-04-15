var Density = function(args){
    var self = this;
    var diffuse = function(size, bound, dens, dens0, rate, dt){
        var a = dt * rate * size * size;

        for (var k = 0; k < 20; k++ ) {
            for (var i = 1; i<= size; i++ ) {
                for (var j = 1 ; j <= size; j++ ) {
                    // i think it is using the previous density (d0) because this process is iterative (see outermost loop
                    dens[i][j] = (dens0[i][j] + a * (
                                                    dens[i-1][j] + dens[i+1][j] + dens[i][j-1] + dens[i][j+1])
                                                    ) /
                                                    (1 + 4 * a);
                }
            }
            self.set_boundary ( size, bound, dens );
        }
    }

    var advect = function(){

    }

    this.step = function(dens){

    }
}

Density.prototype.set_boundary = Fluid_helpers.prototype.set_boundary;