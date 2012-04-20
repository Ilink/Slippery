var Util = function(){};

/*
    @swap
    This is a lazy way of writing this function. It could be done (for objects) in-place, since objects and arrays are passed by reference.
    However, I think that is as good as it gets for primitive types

    Usage:

    a = 1; b = 2;
    result = swap(a,b);
    a = result[0]; b = result[1];
 */
Util.prototype.swap = function(a, b){
    var temp;
    if(typeof a !== typeof b) throw 'type mismatch: both arguments must be the same type';
    if( typeof a !== 'object' || typeof a !== 'array'){
            temp = a;
            a = b;
            b = temp;
        return [a, b]
    } else if(typeof a === 'array') {
        temp = $.extend(true, [], a);
        a = b;
        b = temp;
        return [a, b]
    }
    else {
        temp = $.extend(true, [], a);
        a = b;
        b = temp;
        return [a, b]
    }
}

Util.prototype.init_2d_arr = function(size, arr){
    for(var i = 0; i < size; i++){
        arr[i] = [];
    }
    return arr;
}