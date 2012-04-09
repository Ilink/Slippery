// These helpers are generally designed to be inheritable although they really don't need to be.
// this is mostly because I want to try using more prototypes

var Helpers = function(){}

Helpers.prototype.init_2d_arr = function(size, arr){
    for(var i = 0; i < size; i++){
        arr[i] = [];
    }
    return arr;
}