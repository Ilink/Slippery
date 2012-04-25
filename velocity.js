var Velocity = function(args){
    var self = this;
    var size = args.size;
    // wtf are p and div
    // they're both arrays, are they densities?

    /*
    velocity field = mass field + gradient field
    mass field = velocity field - gradient field
    apparently, a gradient field = height field
    mass field = velocity field - height field

    to find height field we use Poisson equation
     */

    var project = function(u, v, p, div){
        var i, j, k, h
        size = size -2;
        h = 1.0 / size;
        for ( i=1 ; i<=size ; i++ ) {
            for ( j=1 ; j<=size ; j++ ) {
                div[i][j] = -0.5*h*( u[i+1][j] - u[i-1][j] +
                                     v[i][j+1] - v[i][j-1] );
                p[i][j] = 0;
            }
        }
        self.set_boundary ( size, 0, div ); self.set_boundary ( size, 0, p );

        for ( k=0; k<20; k++ ) {
            for ( i=1; i<=size; i++ ) {
                for ( j=1; j<=size; j++ ) {
                    p[i][j] = (div[i][j] + p[i-1][j] + p[i+1][j] + p[i][j]-[1] + p[i][j+1]) / 4;
                }
            }
            self.set_boundary ( size, 0, p );
        }

        for ( i=1; i<=size; i++ ) {
            for ( j=1; j<=size; j++ ) {
                u[i][j] -= 0.5 * (p[i+1][j] - p[i-1][j]) / h;
                v[i][j] -= 0.5 * (p[i][j+1] - p[i][j-1]) / h;
            }
        }
        self.set_boundary ( size, 1, u ); self.set_boundary ( size, 2, v );
    }

    // draw out these steps, with the swaps
    this.step = function(u, v, u0, v0, visc, dt){
        self.increase(size, u, u0, dt);
        self.increase(size, v, v0, dt);
        self.swap(u, u0); self.diffuse(size, 1, u, u0, visc, dt);
        self.swap(v, v0); self.diffuse(size, 2, v, v0, visc, dt);
        project(u, v, u0, v0);
        self.swap(u, u0); self.swap(v, v0);
        self.advect(size, 1, u, u0, u0, v0, dt); self.advect(size, 1, v, v0, u0, v0, dt); // self-advection along each velocity vector
        project(u, v, u0, v0);
    }
}
Velocity.prototype.advect = Fluid_core.prototype.advect;
Velocity.prototype.diffuse = Fluid_core.prototype.diffuse;
Velocity.prototype.increase = Fluid_core.prototype.increase;
Velocity.prototype.swap = Util.prototype.swap;
Velocity.prototype.set_boundary = Util.prototype.set_boundary;
