var Density = function(args){
    var self = this;
    var size = args.size;

    // x is density
    // u, v are velocity vectors
    this.step = function(u, v, x, x0, diff, dt){
//        self.increase(size, x, x0, dt);
        self.swap(x, x0);
        render_numbers("#container",x0);

        self.diffuse(size, 1, x, x0, diff, dt);
        self.swap(x, x0);

        self.advect(size, 1, x, x0, u, v, dt);
//        console.log(size, x, x0, u, v, dt);

    }
}

Density.prototype.set_boundary = Fluid_core.prototype.set_boundary;
Density.prototype.diffuse = Fluid_core.prototype.diffuse;
Density.prototype.advect = Fluid_core.prototype.advect;
Density.prototype.increase = Fluid_core.prototype.increase;
Density.prototype.swap = Util.prototype.swap;

var render_numbers = function(selector, arr){
    var size = arr.length;
    selector = $(selector);
    selector.empty();
    for(var i = 0; i < size; i++){
        for(var j = 0; j < size; j++){
            selector.append(arr[i][j]);
        }
        selector.append('<br/>')
    }
}