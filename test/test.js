var size = 22;
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
};

var random_ui_input = function(size){
    var rand_input = util.init_2d_arr(size, []);
    var x = Math.floor(Math.random() * size);
    var y = x;
    rand_input[x][y] = 1.5;
    return rand_input;
}


$(document).ready(function(){
    var frames = 0;
    var timeline = new Timeline({
        tickrate: 10,
        callback: function(dt){ // render loop goes here
            if(frames % 10 === 0) {
                fluid_core.increase(N, mock_dens, random_ui_input(size), dt);
            }
            test_diffuse();
            frames++;
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