var size = 12;
var N = size - 2;

var util = new Util();
var mock_u = util.init_2d_arr(size,[]);
util.populate_2d_array(mock_u, 0, 2, true);
var mock_dens = util.init_2d_arr(size, []);
util.populate_2d_array(mock_dens, 0, 2, true);
mock_dens[0][1] = 1;
var mock_dens0 = util.copy(mock_dens);

var fluid_core = new Fluid_core();
var test_diffuse = function(){
    fluid_core.diffuse(N, 0, mock_dens, mock_dens0, 2, 30);
    util.render_numbers("#container", mock_dens);
    mock_dens0 = util.copy(mock_dens);
}


$(document).ready(function(){


    $("#container").click(function(e){
        console.log(e.pageX);
        var new_dens = util.init_2d_arr(size, []);
        var offset = $(this).offset();
        var x = Math.round((e.pageX - offset.left) / 22);
        var y = Math.round((e.pageY - offset.top) / 100);
//        var x = $(this).attr('x'); var y = $(this).attr('y');
        console.log(x, y, '10');
        new_dens[x][y] = 15;
        console.log(new_dens);
        fluid_core.increase(N, mock_dens, new_dens, 30);
    });
//
    var timeline = new Timeline({
        tickrate: 10,
        callback: function(dt){ // render loop goes here
            test_diffuse();
        }
    });
//    test_diffuse();
    console.log(mock_dens);

    $("#start").click(function(){
        timeline.start();
//        timeline.stop();
    });

    $("#stop").click(function(){
        timeline.stop();
    });
});