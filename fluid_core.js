/*
Fluid_core.js

This function contains functionality that is shared across the various parts of the fluid solver.
 */

var Fluid_core = function(){}

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

/*
    field (and field0) is any sort of field that needs to be advected
        in our case, this is just going to be density and velocity (self advection; see the velocity steps)
    u and v are velocity fields in the x and y directions, respectively
    remember velocity is a vector quantitity!
*/
Fluid_core.prototype.advect = function(size, bound, field, field0, u, v, dt){
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
            if (x<0.5) x=0.5; if (x>size+0.5) x=size+0.5; i0 = Math.round(x); i1=i0+1;
            if (y<0.5) y=0.5; if (y>size+0.5) y=size+0.5; j0 = Math.round(y); j1=j0+1;

            //i forget what this is doing
            s1 = x-i0; s0 = 1-s1;
            t1 = y-j0; t0 = 1-t1;

            // carry over the fieldities
            field[i][j] = s0 * (t0*field0[i0][j0] + t1*field0[i0][j1])+
                      s1 * (t0*field0[i1][j0] + t1*field0[i1][j1]);
        }
    }
    self.set_boundary ( size, bound, field );
}

Fluid_core.prototype.increase = function(size, dens, new_dens, dt){
    for (var i = 0 ; i < size; i++) {
        for(var j = 0; j < size; j++){
            dens[i][j] += dt * new_dens[i][j]; // why does this need to be scaled by time?
            // i guess it doesn't, but it makes it more representative of how much density was added over a time period
        }
    }
}

Fluid_core.prototype.diffuse = function(size, bound, dens, dens0, rate, dt){
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