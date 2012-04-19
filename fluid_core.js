/*
Fluid_core.js

This function contains functionality that is shared across the various parts of the fluid solver.
 */

var Fluid_core = function(){}

Fluid_core.prototype.project = function(){

}

// todo: create a strategy pattern for various boundary condition types
Fluid_core.prototype.set_boundary = function(size, bound, matrix){
    for (var i=1; i <= size; i++ ) {
        matrix[0][i] = (b==1) ? -matrix[1][i] : matrix[1][i];
        matrix[size+1][i] = b==1 ? –matrix[size][i] : matrix[size][i];
        matrix[i][0] = b==2 ? –matrix[i][1] : matrix[i][1];
        matrix[i][size+1] = b==2 ? –matrix[i][size] : matrix[i][size];
    }
    matrix[0][0] = 0.5*(matrix[1][0] + matrix[0][1]);
    matrix[0][size+1] = 0.5*(matrix[i][size+1]+ matrix[0][size]);
    matrix[size+1][0] = 0.5*(matrix[size][0]+matrix[size+1][1]);
    matrix[size+1][size+1] = 0.5*(matrix[size][size+1]+matrix[size+1][size]);
}

Fluid_core.prototype.infinite_boundary = function(size, bound, matrix){
    /*
    Not sure how to do this yet..
    if something touches the boundary
        move to other side
     */
}

// u and v are velocity fields in the x and y directions, respectively
// remember velocity is a vector quantitity!
Fluid_core.prototype.advect = function(size, bound, dens, dens0, u, v, dt){
    var i, j, i0, j0, i1, j1, x, y, s0, t0, s1, t1, dt0;
    dt0 = dt * size;
    for (i=1; i<=size; i++) {
        for (j=1; j<=size; j++) {
            // find the new position for our particles
            x = i - dt0 * u[i][j];
            y = j - dt0 * v[i][j];

            // ceiling and floor values
            // round so we get grid values
            // i dont know why i1 = i0 + 1
            if (x<0.5) x=0.5; if (x>N+0.5) x=N+0.5; i0 = Math.round(x); i1=i0+1;
            if (y<0.5) y=0.5; if (y>N+0.5) y=N+0.5; j0 = Math.round(y); j1=j0+1;

            //i forget what this is doing
            s1 = x-i0; s0 = 1-s1;
            t1 = y-j0; t0 = 1-t1;

            // carry over the densities
            d[i][j] = s0 * (t0*dens0[i0][j0] + t1*dens0[i0][j1])+
                      s1 * (t0*dens0[i1][j0] + t1*dens0[i1][j1]);
        }
    }
    self.set_boundary ( N, b, d );
}

/*
    Usage:

    a = 1; b = 2;
    result = swap(a,b);
    a = result[0]; b = result[1];
 */
Fluid_core.prototype.swap = function(a, b){
    var temp = a;
    a = b;
    b = temp;
    return [a, b]
}