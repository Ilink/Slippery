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

    // u and v are velocity fields in the x and y directions, respectively
    // remember velocity is a vector quantitity!
    var advect = function(size, bound, dens, dens0, u, v, dt){
        var i, j, i0, j0, i1, j1, x, y, s0, t0, s1, t1, dt0;
        dt0 = dt * size;
        for (i=1; i<=size; i++) {
            for (j=1; j<=size; j++) {
                x = i - dt0 * u[i][j];
                y = j - dt0 * v[i][j];
                if (x<0.5) x=0.5; if (x>N+0.5) x=N+0.5; i0=(int)x; i1=i0+1; if (y<0.5) y=0.5; if (y>N+0.5) y=N+0.5; j0=(int)y; j1=j0+1; s1 = x-i0; s0 = 1-s1; t1 = y-j0; t0 = 1-t1;
                d[IX(i,j)] = s0*(t0*d0[IX(i0,j0)]+t1*d0[IX(i0,j1)])+
                    s1*(t0*d0[IX(i1,j0)]+t1*d 0[IX(i1,j1)]);
            } }
        self.set_boundary ( N, b, d );
    }

    this.step = function(dens, u, v){
        diffuse();
        advect();
    }
}

Density.prototype.set_boundary = Fluid_helpers.prototype.set_boundary;