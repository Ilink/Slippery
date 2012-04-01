/*
This loops over specified objects and renders them out. Not much going on at the moment.

The clear function isn't my idea, thanks to: http://simonsarris.com/blog/346-how-you-clear-your-canvas-matters

Assumes that every object it gets has X and Y coordinates
 */
var Display = function(args){

    var canvas = $(args.canvas);
    var context = canvas[0].getContext('2d');

    var clear = function(){
        // Store the current transformation matrix
        context.save();

        // Use the identity matrix while clearing the canvas
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width(), canvas.width());

        // Restore the transform
        context.restore();
    }

    this.render = function(objs){
        clear();
        $.each(objs, function(i, obj){
            context.fillRect(obj.x, obj.y, 5, 5);
        });
    }
}