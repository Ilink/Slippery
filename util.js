var Util = function(){};

/*
    Usage:

    a = 1; b = 2;
    result = swap(a,b);
    a = result[0]; b = result[1];
 */
Util.prototype.swap = function(a, b){
    var temp = a;
    a = b;
    b = temp;
    return [a, b]
}