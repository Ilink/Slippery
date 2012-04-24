var Util = function(){};

/*
    @swap
    objects and arrays muat have the same number of elements / properties
    objects must have the same property names

    numbers cannot be swaped in-place since they are never passed by reference
*/
Util.prototype.swap = function(a, b) {
    var temp;
    if (typeof a !== typeof b) throw 'type mismatch: both arguments must be the same type';
    if (typeof a !== 'object' && typeof a !== 'array') {
        temp = a;
        a = b;
        b = temp;
        return [a, b]
    } else if (typeof a.length !== 'undefined') {
        if (a.length !== b.length) throw 'Error: arrays must have the same length';
        temp = $.extend(true, [], a);
    }
    else {
        temp = $.extend(true, {}, a);
    }
    $.each(a, function(i, v){
        a[i] = b[i];
        b[i] = temp[i];
    });
    return true
}

Util.prototype.init_2d_arr = function(size, arr){
    for(var i = 0; i < size; i++){
        arr[i] = [0,0];
    }
    return arr;
}

Util.prototype.zero_2d = function(arr){
    $.each(arr, function(j, x){
        $.each(x, function(j){
            x[j] = 0;
        });
    });
}

Util.prototype.copy = function(original){
    if(typeof original.length !== 'undefined') return $.extend(true, [], original);
    else return $.extend(true, {}, original);
}