var Fluid_helpers = function(){}

Fluid_helpers.prototype.project = function(){

}

// todo:remove boundary conditions
Fluid_helpers.prototype.set_boundary = function(size, bound, matrix){
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