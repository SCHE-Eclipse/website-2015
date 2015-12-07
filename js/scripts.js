// script: 0, 2, 3, 4, c, 3, 2, 1, f, q (magically move that box to
// coal bin), 2, 3, 5, 7, 8, 9, r, e, 8, 7, 6, m (until all magnetite
// in box), 5, 3, 2, 1, f, q (magically move that box to copper box
// and magnetite magically appearing in magnetite box), reboot
function GenerateScript() {
    var fwd = false, rev = true;
    var script = new Script(robot);
    script.append( robot.move( 0, 2, 4000, fwd) );
    script.append( robot.move( 2, 3, 4000, fwd) );
    script.append( robot.move( 3, 4, 4000, fwd) );
    script.append( robot.transferCoal() );
    script.append( robot.turn( -Math.PI/2, Math.PI ) );
    script.append( robot.move( 4, 3, 4000, fwd) );
    script.append( robot.move( 3, 2, 4000, fwd) );
    script.append( robot.move( 2, 1, 4000, fwd) );
    script.append( robot.lowerBed() );
    script.append( robot.dropCart() );
    script.append( robot.scoreCoal() );
    script.append( robot.move( 1, 11, 1000, rev) );
    script.append( robot.move(11, 2, 4000, fwd) );
    script.append( robot.move( 2, 3, 4000, fwd) );
    script.append( robot.move( 3, 7, 4000, fwd) );
    script.append( robot.move( 7, 8, 3000, fwd) );
    script.append( robot.move( 8, 9, 4000, fwd) );
    script.append( robot.grabCart() );
    script.append( robot.raiseBed() );
    script.append( robot.turn( Math.PI/2, Math.PI ) );
    script.append( robot.move( 9, 8, 4000, fwd) );
    script.append( robot.move( 8, 7, 3000, fwd) );
    script.append( robot.move( 7, 3, 4000, fwd) );
    script.append( robot.move( 3, 2, 4000, fwd) );
    script.append( robot.move( 2, 1, 4000, fwd) );
    script.append( robot.lowerBed() );
    script.append( robot.dropCart() );
    script.append( robot.reset(5000) );
    return script;
}

function Script(bot) {
    this.T = [];
    this.bot = bot;
}
// Start the script
Script.prototype.start = function() {
    this.T[0].start();
}
// Append a tween to the current script
Script.prototype.append = function(tween) {
    var N = this.T.length;
    if (N>0) this.T[N-1].chain(tween);
    this.T.push(tween);
}

//--------------------------------------------------------------------
// Table of points controlling the position and orientation of the robot
var CP = [];
CP[ 0] = {   x: -135, y:  -60 }; // State  0 - Start box
CP[ 1] = {   x: -115, y:  -60 }; // State  1 - Just outside the start box
CP[ 2] = {   x: -110, y:  -60 }; 
CP[ 3] = {   x: -110, y:  -85 }; // State  2 - Ground Level (center)
CP[ 4] = {   x: -110, y: -125 };
CP[ 5] = {   x:  -77, y: -125 }; // State  3 - Gate 1
CP[ 6] = {   x:  -58, y: -125 };
CP[ 7] = {   x:  -35, y: -125 }; // State 10 - Magnetite vein (closed end)
CP[ 8] = {   x:  -58, y: -105 }; // State  4 - Coal chute
CP[ 9] = {   x:  -58, y:  -91 }; // State  5
CP[10] = {   x:  -35, y:  -91 }; // State  6 - Magnetite vein (open end)
CP[11] = {   x:  -29, y:  -72 }; // State  7 - Gate 2
CP[12] = {   x:  -15, y:  -62 };
CP[13] = {   x:   -1, y:  -72 }; // State  8 - Gate 3
CP[14] = {   x:    6, y:  -77 };
CP[15] = {   x:    0, y:  -84 };
CP[16] = {   x: -0.5, y: -104 }; // State  9 - Copper cart
CP[17] = {   x:  -90, y:  -60 }; // State 11 - Further outside the start box

//--------------------------------------------------------------------
// Table of pre-defined paths
var PATHS = [
    [ 0, 2, 3, 4, 7, 8, 9 ],
    [ 3, 10 ],
    [ 3, 2, 0 ],
];

//--------------------------------------------------------------------
// Table of allowed transitions between states
var TRANS = [];
TRANS[0] = [];
TRANS[0][ 1] = [ 0, 1 ];
TRANS[0][ 2] = [ 0, 2, 3 ];
TRANS[0][11] = [ 0, 17 ];
TRANS[1] = [];
TRANS[1][ 0] = [ 1, 0 ];
TRANS[1][ 2] = [ 1, 2, 3 ];
TRANS[1][11] = [ 1, 17 ];
TRANS[2] = [];
TRANS[2][ 0] = [ 3, 2, 0 ];
TRANS[2][ 1] = [ 3, 2, 1 ];
TRANS[2][ 3] = [ 3, 4, 5 ];
TRANS[3] = [];
TRANS[3][ 2] = [ 5, 4, 3 ];
TRANS[3][ 4] = [ 5, 6, 8 ];
TRANS[3][ 6] = [ 5, 6, 9, 10 ];
TRANS[3][ 7] = [ 5, 6, 9, 11 ];
TRANS[3][10] = [ 5, 7 ];
TRANS[4] = [];
TRANS[4][ 3] = [ 8, 6, 5 ];
TRANS[4][ 4] = [ 8, 8 ];
TRANS[4][ 5] = [ 8, 9 ];
TRANS[4][ 6] = [ 8, 9, 10 ];
TRANS[4][ 7] = [ 8, 9, 11 ];
TRANS[4][10] = [ 8, 6, 10 ];
TRANS[5] = [];
TRANS[5][ 3] = [ 9, 6, 5 ];
TRANS[5][ 4] = [ 9, 8 ];
TRANS[5][ 6] = [ 9, 10 ];
TRANS[5][ 7] = [ 9, 11 ];
TRANS[5][10] = [ 9, 6, 10 ];
TRANS[6] = [];
TRANS[6][ 3] = [ 10, 9, 6, 5 ];
TRANS[6][ 4] = [ 10, 9, 8 ];
TRANS[6][ 5] = [ 10, 9 ];
TRANS[6][ 7] = [ 10, 9, 11 ];
TRANS[6][10] = [ 10, 9, 6, 10 ];
TRANS[7] = [];
TRANS[7][ 3] = [ 11, 9, 6, 5 ];
TRANS[7][ 4] = [ 11, 9, 8 ];
TRANS[7][ 5] = [ 11, 9 ];
TRANS[7][ 8] = [ 11, 12, 13 ];
TRANS[7][10] = [ 11, 9, 6, 10 ];
TRANS[8] = [];
TRANS[8][ 7] = [ 13, 12, 11 ];
TRANS[8][ 9] = [ 13, 14, 15, 16 ];
TRANS[9] = [];
TRANS[9][ 8] = [ 16, 15, 14, 13 ];
TRANS[11] = [];
TRANS[11][2] = [ 17, 2, 3 ];

function makePath(P) {
    if (P === undefined) return robot.pause(5);
    var T = [];
    // Generate the necessary transition tweens
    for (var i=0; i<P.length-1; ++i) {
        T[i] = makeTransition(Math.abs(P[i]), Math.abs(P[i+1]), 4000, P[i+1]<0);
    }
    // Chain together the transition tweens
    for (var i=T.length-1; i>0; --i) {
        T[i-1].chain(T[i]);
    }
    // Return the first tween.
    return T[0];
}
//--------------------------------------------------------------------
// Get tween for the specified transition
function makeTransition(curr, next, dt, reverse) {
    if (!TRANS[curr][next]) {
        console.log("Invalid transition. %s -> %s", curr, next);
        return undefined;
    }
    console.log(TRANS[curr][next]);
    console.log("%s -> %s", curr, next);
    var idx = TRANS[curr][next];
    var cpx = [], cpy = [];
    for (var i=0; i<idx.length; ++i) {
        cpx.push(CP[idx[i]].x);
        cpy.push(CP[idx[i]].y);
    }
    var begin = { t: 0, x: cpx, y: cpy };
    var end   = { t: 1 };
    console.log(begin);
    var tween = new TWEEN.Tween( begin )
        .to( end, 4000 )
        .onUpdate( function(t) {
            var Bx = new BezierCurve(this.x);
            var By = new BezierCurve(this.y);
            var X = Bx.evaluate(t);
            var Y = By.evaluate(t);
            robot.object.position.x = X[0];
            robot.object.position.y = Y[0];
            robot.object.__dirtyPosition = true;
            if (X[1] || Y[1]) {
                var theta = Math.atan2(Y[1],X[1]);
                robot.object.rotation.z = (reverse ? theta + Math.PI : theta);
                robot.object.__dirtyRotation = true;
            }
        } )
        .onComplete( function() {
            robot.object.__dirtyPosition = true;
            robot.object.__dirtyRotation = true;
            robot.currentState = next;
        } );
    return tween;
}
