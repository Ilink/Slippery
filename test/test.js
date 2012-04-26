var size = 12;
var N = size - 2;

var util = new Util();
var mock_u = util.init_2d_arr(size,[]);
util.populate_2d_array(mock_u, 0, 2, true);
var mock_dens = util.init_2d_arr(size, []);
util.populate_2d_array(mock_dens, 0, 20, true);
mock_dens[0][1] = 1;
var mock_dens0 = util.copy(mock_dens);

var test_diffuse = function(){
    var fluid_core = new Fluid_core();
    fluid_core.diffuse(N, 1, mock_dens, mock_dens0, 2, 30);
    util.render_numbers("#container", mock_dens);
    mock_dens0 = util.copy(mock_dens);
}


$(document).ready(function(){
//    var timeline = new Timeline({
//        tickrate: 10,
//        callback: function(dt){ // render loop goes here
//            test_diffuse();
////            util.render_numbers("#container", mock_dens);
//        }
//    });
    test_diffuse();
    console.log(mock_dens);
//    timeline.start();
});