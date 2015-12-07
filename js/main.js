//if (!Detector.webgl) Detector.addGetWebGLMessage();

var usePhysics = false;
var useShadows = false;
var useLambert = true;
var useTankControls = false;

if (usePhysics) {
    Physijs.scripts.worker = 'js/libs/physijs_worker.js';
	  Physijs.scripts.ammo = 'ammo.js';
}

var render_stats, physics_stats;
var camera, scene, renderer, controls, gamepad;
var clock = new THREE.Clock();

var robot;
var activeSection = 0;
var coalPieces = [], magnetitePieces = [], bauxitePieces = [];
var spodumenePieces = [], chalcopyritePieces = [], limestonePieces = [];
var coalChute = [], coalTower = [], coalSupport = [];
var scoringBins = [], sparePartsRack = [];
var chuteConstraint = [], supportConstraint = [];
var mineCarts = [];
var magnetiteVein = [];
var spodumeneTower;

var TestScripts = [];

var nullVec = new THREE.Vector3( 0, 0, 0 );
var xyVec = new THREE.Vector3( 1, 1, 0 );
var xyzVec = new THREE.Vector3( 1, 1, 1 );
var xAxis = new THREE.Vector3( 1, 0, 0 );
var yAxis = new THREE.Vector3( 0, 1, 0 );
var zAxis = new THREE.Vector3( 0, 0, 1 );

// Various materials used in the play field.
//var woodTex = new THREE.ImageUtils.loadTexture( 'wood1.jpg' );
//var woodMat = new THREE.MeshLambertMaterial( { map: woodTex } );
if (useLambert) {
var WOODMat = new THREE.MeshLambertMaterial( { color: 0x0066cc } );
var woodMat = new THREE.MeshLambertMaterial( { color: 0xd2b48c } );
var coalMat = new THREE.MeshLambertMaterial( { color: 0x222222 } );
var clearMat = new THREE.MeshBasicMaterial( { visible: false } );
var PVCMat = new THREE.MeshLambertMaterial( { color: 0xff8800,
                                              side: THREE.DoubleSide } );
var pvcMat = new THREE.MeshLambertMaterial( { color: 0xffffff,
                                              side: THREE.DoubleSide } );
var floorMat  = new THREE.MeshLambertMaterial( { color: 0x444444 } );
var grayMat   = new THREE.MeshLambertMaterial( { color: "gray" } );
var whiteMat = new THREE.MeshLambertMaterial( { color: "white" } );
var redMat    = new THREE.MeshLambertMaterial( { color: "red" } );
var blueMat   = new THREE.MeshLambertMaterial( { color: "blue" } );
var yellowMat = new THREE.MeshLambertMaterial( { color: "yellow" } );
var greenMat  = new THREE.MeshLambertMaterial( { color: "green" } );
var colorMats = [ redMat, blueMat, yellowMat, greenMat ];
}
else {
var WOODMat = new THREE.MeshBasicMaterial( { color: 0x0066cc } );
var woodMat = new THREE.MeshBasicMaterial( { color: 0xd2b48c } );
var coalMat = new THREE.MeshBasicMaterial( { color: 0x222222 } );
var clearMat = new THREE.MeshBasicMaterial( { visible: false } );
var PVCMat = new THREE.MeshBasicMaterial( { color: 0xff8800,
                                              side: THREE.DoubleSide } );
var pvcMat = new THREE.MeshBasicMaterial( { color: 0xffffff,
                                              side: THREE.DoubleSide } );
var floorMat  = new THREE.MeshBasicMaterial( { color: 0x444444 } );
var grayMat   = new THREE.MeshBasicMaterial( { color: "gray" } );
var whiteMat = new THREE.MeshBasicMaterial( { color: "white" } );
var redMat    = new THREE.MeshBasicMaterial( { color: "red" } );
var blueMat   = new THREE.MeshBasicMaterial( { color: "blue" } );
var yellowMat = new THREE.MeshBasicMaterial( { color: "yellow" } );
var greenMat  = new THREE.MeshBasicMaterial( { color: "green" } );
var colorMats = [ redMat, blueMat, yellowMat, greenMat ];
}
// Initialize THREE.js, PHYSI.js and all game elements
function init() {
    var div = document.createElement("div");
    div.id = "container";
    document.body.appendChild(div);

    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera( 60, aspect, 0.1, 10000 );
    camera.position.set(-150, -200, 80);
    // camera.position.set(-180, -100, 17);
    // camera.lookAt(new THREE.Vector3(-18.625, -104.375, 8));
    camera.up.set( 0, 0, 1 );
    camera.updateProjectionMatrix();

    render_stats = new Stats();
    render_stats.domElement.style.position = 'absolute';
    render_stats.domElement.style.top = '0px';
    render_stats.domElement.style.zIndex = 100;
    div.appendChild(render_stats.domElement);

    if (usePhysics) {
        physics_stats = new Stats();
        physics_stats.domElement.style.position = 'absolute';
        physics_stats.domElement.style.top = '50px';
        physics_stats.domElement.style.zIndex = 100;
        div.appendChild(physics_stats.domElement);

        scene = new Physijs.Scene({ reportsize: 500, fixedTimeStep: 1/60 });
        scene.setGravity( new THREE.Vector3( 0, 0, -385.8 ) );
        console.log(scene.gravity);
        scene.addEventListener(
            'update',
            function() {
                scene.simulate( undefined, 2 );
                physics_stats.update();
            }
        );
    }
    else {
        scene = new THREE.Scene();
    }

    var light0 = new THREE.AmbientLight( 0x333333 );
    scene.add( light0 );true

    //var light1 = ShadowedLight( 200, 40, 105, 0xffffff, 1 );
    //scene.add( light1 );

    var light2 = ShadowedLight( -100, -60, 105, 0xffffff, 1 );
    scene.add( light2 );

    initScene();
    
    var x = -135;
    var y = -60;
    var z = 3;
    robot = new Robot();
    robot.object.translateX( x );
    robot.object.translateY( y );
    robot.object.translateZ( z );
    scene.add( robot.object );

    TestScripts.push( GenerateScript() );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000022 );
    renderer.shadowMapEnabled = useShadows;
    div.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.damping = 0.2;
    controls.maxPolarAngle = 0.49*Math.PI;

    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'keydown', onKeydown);
    window.addEventListener( 'keyup', onKeyup);
    window.addEventListener('gamepadconnected', function(e) {
        var gp = navigator.getGamepads()[e.gamepad.index];
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                    gp.index, gp.id, gp.buttons.length, gp.axes.length);
        if (gp.id == 'xinput') gamepad = gp;
    });
    window.addEventListener('gamepaddisconnected', function(e) {
        var gp = navigator.getGamepads()[e.gamepad.index];
        console.log("Gamepad disconnected at index %d:", gp.index);
        if (gp.id == 'xinput') gamepad = null;
    });

    if (usePhysics) {
        scene.simulate( undefined, 2 );
    }
    render();
}

// Initialize the arena and all playable objects.
function initScene() {
    makeStaticArena();
    addDynamicObjects();
}

// Add a shadow-casting, directional light.
function ShadowedLight( x, y, z, color, intensity ) {
		var directionalLight = new THREE.DirectionalLight( color, intensity );
		directionalLight.position.set( x, y, z );
		scene.add( directionalLight );

		directionalLight.castShadow = useShadows;
		directionalLight.shadowCameraVisible = false;

		var d = 170;
		directionalLight.shadowCameraLeft = -d;
		directionalLight.shadowCameraRight = d;
		directionalLight.shadowCameraTop = d;
		directionalLight.shadowCameraBottom = -d;

		directionalLight.shadowCameraNear = 1;
		directionalLight.shadowCameraFar = 350;

		directionalLight.shadowMapWidth = 2048;
		directionalLight.shadowMapHeight = 2048;

		//directionalLight.shadowBias = -0.005;
		//directionalLight.shadowDarkness = 0.45;

    return directionalLight;
}

// Creates a custom shaped board with eight user-specified corners.
// Similar to BoxGeometry, but with some custom placement of corner
// nodes.  Trial and error may be required to correctly specify the
// corner nodes in an order that will produce faces that are all
// visible (due to face orientations).
function makeCustomBoard(x, y, z) {
    var geom = new THREE.Geometry();
    for (var i=0; i<8; ++i) {
        geom.vertices.push(new THREE.Vector3( x[i], y[i], z[i] ));
    }
    geom.faces.push(new THREE.Face3( 0, 2, 4 ));
    geom.faces.push(new THREE.Face3( 2, 6, 4 ));
    geom.faces.push(new THREE.Face3( 3, 1, 5 ));
    geom.faces.push(new THREE.Face3( 3, 5, 7 ));
    geom.faces.push(new THREE.Face3( 0, 4, 1 ));
    geom.faces.push(new THREE.Face3( 1, 4, 5 ));
    geom.faces.push(new THREE.Face3( 2, 3, 6 ));
    geom.faces.push(new THREE.Face3( 3, 7, 6 ));
    geom.faces.push(new THREE.Face3( 0, 1, 2 ));
    geom.faces.push(new THREE.Face3( 1, 3, 2 ));
    geom.faces.push(new THREE.Face3( 4, 6, 5 ));
    geom.faces.push(new THREE.Face3( 5, 6, 7 ));
    geom.computeFaceNormals();
    return geom;
}

// Make appropriate box mesh for physics/nophysics
function makeBoxMesh( geom, mat, mass, friction, restitution ) {
    if (usePhysics) {
        var m = mass || 0.0;
        var mu = friction || 0.8;
        var epsilon = restitution || 0.4;
        var pmat = Physijs.createMaterial(mat, 0.8, 0.4);
        return new Physijs.BoxMesh( geom, pmat, mass );
    }
    else {
        return new THREE.Mesh( geom, mat );
    }
}

// Make appropriate sphere mesh for physics/nophysics
function makeSphereMesh( geom, mat, mass, friction, restitution ) {
    if (usePhysics) {
        var m = mass || 0.0;
        var mu = friction || 0.8;
        var epsilon = restitution || 0.4;
        var pmat = Physijs.createMaterial(mat, 0.8, 0.4);
        return new Physijs.SphereMesh( geom, pmat, mass );
    }
    else {
        return new THREE.Mesh( geom, mat );
    }
}

// Make appropriate cylinder mesh for physics/nophysics
function makeCylinderMesh( geom, mat, mass, friction, restitution ) {
    if (usePhysics) {
        var m = mass || 0.0;
        var mu = friction || 0.8;
        var epsilon = restitution || 0.4;
        var pmat = Physijs.createMaterial(mat, 0.8, 0.4);
        return new Physijs.CylinderMesh( geom, pmat, mass );
    }
    else {
        return new THREE.Mesh( geom, mat );
    }
}

// Make appropriate convex mesh for physics/nophysics
function makeConvexMesh( geom, mat, mass, friction, restitution ) {
    if (usePhysics) {
        var m = mass || 0.0;
        var mu = friction || 0.8;
        var epsilon = restitution || 0.4;
        var pmat = Physijs.createMaterial(mat, mu, epsilon);
        return new Physijs.ConvexMesh( geom, pmat, m );
    }
    else {
        return new THREE.Mesh( geom, mat );
    }
}

//====================================================================
// Event handlers
//--------------------------------------------------------------------
function triggerCoalChute( section ) {
    console.log("triggerCoalChute");
    var s = ( section ? section : activeSection );
    if (coalChute[s].userData.triggered) return;
    coalChute[s].userData.triggered = true;
    coalSupport[s].rotateOnAxis( zAxis, Math.Pi/2 );
    scene.remove(coalSupport[s]);
    if (usePhysics) {
        coalChute[s].setLinearFactor(new THREE.Vector3(1,1,1));
        coalChute[s].setAngularFactor(new THREE.Vector3(1,1,1));
}
    for (var i=0; i<24; ++i) {
        var piece = ( coalChute[s].userData.pieces.pop() ||
                      coalPieces[s][i].pop() );
        if (usePhysics) {
            //piece.applyMatrix( coalChute[s].matrixWorld );
            piece.setLinearFactor(xyzVec);
            piece.setAngularFactor(xyzVec);
            // piece.setLinearVelocity(nullVec);
            // piece.setAngularVelocity(nullVec);
            piece.__dirtyRotation = true;
            piece.__dirtyPosition = true;
        }
        coalChute[s].remove(piece);
        coalPieces[s].push(piece);
        scene.add(piece);
        // piece.drop();
    }
}

function triggerMagnetiteVein( section ) {
    console.log("triggerMagnetitieVein");
    var s = ( section ? section : activeSection );
    var veinTween1 = new TWEEN.Tween( magnetiteVein[s].obj.rotation )
        .to( { x: -10*Math.PI/180 }, 1000 );
    var veinTween2 = new TWEEN.Tween( magnetiteVein[s].obj.rotation )
        .to( { x: 16*Math.PI/180 }, 1000 );
    // Reparent the magnetite pieces to the scene.
    if (magnetiteVein[s].pieces.length > 0) {
        var piece = magnetiteVein[s].pieces.pop();
        magnetitePieces[s].push(piece);
        var tween = new TWEEN.Tween( piece.position );
        var y = piece.position.y;
        var t = 100*(18-y);
        var onUpdate = function(piece) {
            return function() {
                if (usePhysics) {
                    piece.__dirtyPosition = true;
                }
            }
        }
        var onComplete = function(parent, piece) {
            return function() {
                piece.applyMatrix( parent.matrixWorld );
                parent.remove(piece);
                var vel = piece.position.clone().sub(parent.position).normalize();
                if (usePhysics) {
                    piece.setLinearFactor(new THREE.Vector3(1,1,1));
                    piece.setAngularFactor(new THREE.Vector3(1,1,1));
                    piece.setLinearVelocity(vel);
                    piece.setAngularVelocity(new THREE.Vector3(0,0,0));
                    piece.__dirtyRotation = true;
                    piece.__dirtyPosition = true;
                }
                else {
                    var tween = new TWEEN.Tween();
                }
                scene.add(piece);
            }
        }
        tween.to( { y: 18 }, t );
        tween.onUpdate( onUpdate(piece) );
        tween.onComplete( onComplete(magnetiteVein[s].tubeBody, piece) );
        //tween.start();
    }
    veinTween2.delay( 4000 );
    veinTween1.chain( veinTween2 );
    veinTween1.start();
}

function triggerSpodumene( ) {
}

var input = {
    power: null,
    direction: null,
    steering: 0
};

var axis = 1;

function onKeydown(e) {
	  switch(e.keyCode) {
    case 32: // space
        break;
    case 48: // 0
        TestScripts[0].start();
        break;
    case 49: // 1
    case 50: // 2
    case 51: // 3
    case 52: // 4
        robot.path(e.keyCode-49).start();
        break;
    case 81: // q
        robot.lifter.dropCart().start();
        break;
    case 69: // e
        robot.lifter.grabCart().start();
        break;
    case 82: // r
        robot.lifter.raiseBed().start();
        break;
    case 70: // f
        robot.lifter.lowerBed().start();
        break;
	  case 67: // c
	      triggerCoalChute( activeSection );
	      break;
	  case 77: // m
	      triggerMagnetiteVein( activeSection );
	      break;
	  case 87: // w
        robot.setSpeed( 2,  2);
	      break;
	  case 65: // a
        robot.setSpeed(-1,  1);e
	      break;
	  case 83: // s
        robot.setSpeed(-2, -2);
	      break;
	  case 68: // d
        robot.setSpeed( 1, -1);
	      break;
	  case 97: // Numpad 1
        robot.accel(-1,  0);
	      break;
	  case 98: // Numpad 2
        robot.accel(-1, -1);
	      break;
	  case 99: // Numpad 3
        robot.accel( 0, -1);
	      break;
	  case 100: // Numpad 4
        robot.accel(-1,  1);
	      break;
	  case 100: // Numpad 5
        robot.setSpeed(0,  0);
	      break;
	  case 102: // Numpad 6
        robot.accel( 1, -1);
	      break;
	  case 103: // Numpad 7
        robot.accel( 0,  1);
	      break;
	  case 104: // Numpad 8
        robot.accel( 1,  1);
	      break;
	  case 105: // Numpad 9
        robot.accel( 1,  0);
	      break;
    default:
        console.log(e.keyCode);
        break;
	  }
}

function onKeyup(e) {
	  switch(e.keyCode){
	  case 87: // w
	  case 65: // a
	  case 83: // s
	  case 68: // d
        robot.setSpeed( 0,  0);
        break;
	  case 97: // Numpad 1
	  case 98: // Numpad 2
	  case 99: // Numpad 3
	  case 100:// Numpad 4
	  case 102:// Numpad 6
	  case 103:// Numpad 7
	  case 104:// Numpad 8
	  case 105:// Numpad 9
        robot.setSpeed( 0,  0);
	      break;
	  }
}
    
function updateJoystick() {
    gamepad = navigator.getGamepads()[0];
    if (!gamepad || !gamepad.connected) return;

    // Left stick
    var LX = gamepad.axes[0];
    var LY = gamepad.axes[1];
    // Right stick
    var RX = -gamepad.axes[2];
    var RY = -gamepad.axes[3];
    // Buttons
    var A = gamepad.buttons[0].pressed;
    var B = gamepad.buttons[1].pressed;
    var X = gamepad.buttons[2].pressed;
    var Y = gamepad.buttons[3].pressed;
    // Shoulder buttons
    var LB = gamepad.buttons[4];
    var RB = gamepad.buttons[5];
    // Triggers (analog)
    var LT = gamepad.buttons[6];
    var RT = gamepad.buttons[7];
    // 
    var BACK = gamepad.buttons[8];
    var START = gamepad.buttons[9];
    // Stick presses
    var LS = gamepad.buttons[10];
    var RS = gamepad.buttons[11];
    // D-pad
    var DN = gamepad.buttons[12];
    var DS = gamepad.buttons[13];
    var DW = gamepad.buttons[14];
    var DE = gamepad.buttons[15];

    if ( useTankControls ) {
        if ( (LY*LY + RY*RY) > 0.2 ) {
            robot.setSpeed(-2*LY, 2*RY);
        }
        else {
            robot.setSpeed(0,0);
        }
    }
    else {
        if ( (RX*RX + RY*RY) > 0.2 ) {
            robot.setSpeed(2*RY-RX, 2*RY+RX);
        }
        else {
            robot.setSpeed(0,0);
        }
    }

    if (A) robot.lifter.lowerBed().start();
    if (B) robot.lifter.raiseBed().start();
    
    if (X) robot.lifter.dropCart().start();
    if (Y) robot.lifter.grabCart().start();
/*
    // Right stick drives the robot
    var pL = maxPower;
    var pR = maxPower;
    var vL = maxSpeed*(RY-RX);
    var vR = maxSpeed*(RY+RX);

    if (Math.abs(vL) > 0.1 || Math.abs(vR) > 0.1) {
		    robot.axleL.configureAngularMotor( 0, 1, 0, vL, pL );
		    robot.axleR.configureAngularMotor( 0, 1, 0, vR, pR );
		    robot.axleL.enableAngularMotor( 0 );
		    robot.axleR.enableAngularMotor( 0 );
    }
    else {
		    robot.axleL.disableAngularMotor( 0 );
		    robot.axleR.disableAngularMotor( 0 );
    }

    // Use A/B to activate the claw
    var fL = robot.fingerL.localToWorld(new THREE.Vector3(0,1.5,0));
    var fR = robot.fingerR.localToWorld(new THREE.Vector3(0,1.5,0));
    var r = new THREE.Vector3((fL.x+fR.x)/2,(fL.y+fR.y)/2,(fL.z+fR.z));
    if (A && !grippedItem) { // Pick something up
        for (var i=0; i<3; ++i) {
            // Get the world coordinates of the top of the chicken
            var s = chickens[i].localToWorld(new THREE.Vector3(0,5,0));
            // Get the location of the claw with respect to the chicken
            var d = s.sub(r);
            if (d.length() < 10) {
                console.log("Chicken " + i + " selected.");
                var tmp = new THREE.Matrix4();
                tmp.getInverse(robot.palm.matrixWorld);
                chickens[i].applyMatrix(tmp);
                scene.remove( chickens[i] );
                robot.palm.add( chickens[i] );
                grippedItem = chickens[i];
                break;
            }
        }
    }
    if (B && grippedItem) { // Drop something
        grippedItem.applyMatrix( robot.palm.matrixWorld );
        grippedItem.setLinearFactor(new THREE.Vector3(0,0,0));
        grippedItem.setAngularFactor(new THREE.Vector3(0,0,0));
        robot.palm.remove( grippedItem );
        scene.add( grippedItem );
        grippedItem.setLinearFactor(new THREE.Vector3(1,1,1));
        grippedItem.setAngularFactor(new THREE.Vector3(1,1,1));
        grippedItem = null;
    }

    if (X) {
        toggleSmallMast(activeSection);
    }
    if (Y) {
        toggleLargeMast(activeSection);
    }
    if (B) {
        toggleSmallBlades(activeSection);
    }
    if (A) {
        toggleGates(activeSection);
    }

    if (DN) {
        robot.arm.rotation.x -= 5*Math.PI/180;
    }
    if (DS) {
        robot.arm.rotation.x += 5*Math.PI/180;
    }
*/
/*
    // Left stick controls the camera
    if (LS) {
        controls.pan(LX, LY);
    }
    else {
        controls.rotateLeft(LX*Math.PI/180);
        controls.rotateUp(LY*Math.PI/180);
    }
    controls.update();
*/
}

function onWindowResize(e) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function render() {
    var dt = clock.getDelta();
    requestAnimationFrame( render );
    updateJoystick();
    TWEEN.update();
    robot.updateMotion(dt);
    renderer.render( scene, camera );
    render_stats.update();
}

