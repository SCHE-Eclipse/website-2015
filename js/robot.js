function Robot(x0, y0, z0) {
    var gearGeom = new THREE.CylinderGeometry( 1.5, 1.5, 0.25, 32 );
    var wheelGeom = new THREE.CylinderGeometry( 3, 3, 0.5, 32 );
    var elbowGeom = new THREE.TorusGeometry(1.5, 0.5, 12, 12, Math.PI/2);
    var elbowGeom2 = new THREE.TorusGeometry(1.5, 0.625, 12, 12, Math.PI/2);
    var cylGeom1  = new THREE.CylinderGeometry( 0.375, 0.375,  1 );
    var cylGeom2  = new THREE.CylinderGeometry( 0.375, 0.375,  2 );
    var cylGeom3  = new THREE.CylinderGeometry( 0.375, 0.375,  3 );
    var cylGeom4  = new THREE.CylinderGeometry( 0.375, 0.375,  4 );
    var cylGeom6  = new THREE.CylinderGeometry( 0.375, 0.375,  6 );
    var cylGeom8  = new THREE.CylinderGeometry( 0.5, 0.5,  8 );
    var cylGeom10 = new THREE.CylinderGeometry( 0.5, 0.5, 10 );
    var geomSupport = new THREE.BoxGeometry(4, 0.5, 0.75);

    var geomVert = new THREE.CylinderGeometry( 0.375, 0.375, 2, 8 );
    var geomHori = new THREE.CylinderGeometry( 0.375, 0.375, 2, 8 );
    var geomShort = new THREE.CylinderGeometry( 0.375, 0.375, 1, 8);
    var geomArmSupport = new THREE.CylinderGeometry(0.375, 0.375, 8, 8);

    this.object = makeBoxMesh(new THREE.BoxGeometry(4, 8, 2), WOODMat, 100);
    
    // Lifter Base
    var cyl1L = makeCylinderMesh( cylGeom10, PVCMat, 10 );
    var cyl1R = makeCylinderMesh( cylGeom10, PVCMat, 10 );
    cyl1L.translateX( 9 );
    cyl1L.translateY( 4.5 );
    cyl1L.translateZ(-1.625 );
    cyl1L.rotateOnAxis( zAxis, Math.PI/2 );
    cyl1R.translateX( 9 );
    cyl1R.translateY(-4.5 );
    cyl1R.translateZ(-1.625 );
    cyl1R.rotateOnAxis( zAxis, Math.PI/2 );
    this.object.add( cyl1L );
    this.object.add( cyl1R );

    var elbow1L = new THREE.Mesh( elbowGeom, PVCMat );
    var elbow1R = new THREE.Mesh( elbowGeom, PVCMat );
    elbow1L.translateX( 4 );
    elbow1L.translateY( 4.55 );
    elbow1L.translateZ(-0.125 );
    elbow1L.rotateOnAxis( xAxis, -Math.PI/2 );
    elbow1L.rotateOnAxis( zAxis, Math.PI/2 );
    elbow1R.translateX( 4 );
    elbow1R.translateY(-4.55 );
    elbow1R.translateZ(-0.125 );
    elbow1R.rotateOnAxis( xAxis, -Math.PI/2 );
    elbow1R.rotateOnAxis( zAxis, Math.PI/2 );
    this.object.add( elbow1L );
    this.object.add( elbow1R );

    var cyl2L = makeCylinderMesh( cylGeom2, PVCMat, 2 );
    var cyl2R = makeCylinderMesh( cylGeom2, PVCMat, 2 );
    cyl2L.translateX( 2.5 );
    cyl2L.translateY( 4.5 );
    cyl2L.translateZ( 0.5 );
    cyl2L.rotateOnAxis( xAxis, Math.PI/2 );
    cyl2R.translateX( 2.5 );
    cyl2R.translateY(-4.5 );
    cyl2R.translateZ( 0.5 );
    cyl2R.rotateOnAxis( xAxis, Math.PI/2 );
    this.object.add( cyl2L );
    this.object.add( cyl2R );

    var elbow2L = new THREE.Mesh( elbowGeom, PVCMat );
    var elbow2R = new THREE.Mesh( elbowGeom, PVCMat );
    elbow2L.translateX( 1 );
    elbow2L.translateY( 4.5 );
    elbow2L.translateZ( 1.5 );
    elbow2L.rotateOnAxis( xAxis, -Math.PI/2 );
    elbow2L.rotateOnAxis( zAxis, -Math.PI/2 );
    elbow2R.translateX( 1 );
    elbow2R.translateY(-4.5 );
    elbow2R.translateZ( 1.5 );
    elbow2R.rotateOnAxis( xAxis, -Math.PI/2 );
    elbow2R.rotateOnAxis( zAxis, -Math.PI/2 );
    this.object.add( elbow2L );
    this.object.add( elbow2R );

    // horizontal pvc supports above base
    var cyl3L = makeCylinderMesh( cylGeom3, PVCMat, 2 );
    var cyl3R = makeCylinderMesh( cylGeom3, PVCMat, 2 );
    cyl3L.translateX( 0 );
    cyl3L.translateY( 4.5 );
    cyl3L.translateZ( 3 );
    cyl3L.rotateOnAxis( zAxis, Math.PI/2 );
    cyl3R.translateX( 0 );
    cyl3R.translateY(-4.5 );
    cyl3R.translateZ( 3 );
    cyl3R.rotateOnAxis( zAxis, Math.PI/2 );
    this.object.add( cyl3L );
    this.object.add( cyl3R );
    
    var elbow3L = new THREE.Mesh( elbowGeom, PVCMat );
    var elbow3R = new THREE.Mesh( elbowGeom, PVCMat );
    elbow3L.translateX( -1.5 );
    elbow3L.translateY( 4.5 );
    elbow3L.translateZ( 4.5 );
    elbow3L.rotateOnAxis( xAxis, -Math.PI/2 );
    elbow3L.rotateOnAxis( zAxis,  Math.PI/2 );
    elbow3R.translateX( -1.5 );
    elbow3R.translateY(-4.5 );
    elbow3R.translateZ( 4.5 );
    elbow3R.rotateOnAxis( xAxis, -Math.PI/2 );
    elbow3R.rotateOnAxis( zAxis,  Math.PI/2 );
    this.object.add( elbow3L );
    this.object.add( elbow3R );

    var cyl4L = makeCylinderMesh( cylGeom2, PVCMat, 2 );
    var cyl4R = makeCylinderMesh( cylGeom2, PVCMat, 2 );
    cyl4L.translateX(-3 );
    cyl4L.translateY( 4.5 );
    cyl4L.translateZ( 5 );
    cyl4L.rotateOnAxis( xAxis, Math.PI/2 );
    cyl4R.translateX(-3 );
    cyl4R.translateY(-4.5 );
    cyl4R.translateZ( 5 );
    cyl4R.rotateOnAxis( xAxis, Math.PI/2 );
    this.object.add( cyl4L );
    this.object.add( cyl4R );

    var elbow4L = new THREE.Mesh( elbowGeom, PVCMat );
    var elbow4R = new THREE.Mesh( elbowGeom, PVCMat );
    elbow4L.translateX(-3 );
    elbow4L.translateY( 3 );
    elbow4L.translateZ( 5.5 );
    elbow4L.rotateOnAxis( yAxis, -Math.PI/2 );
    //elbow4L.rotateOnAxis( zAxis,  Math.PI/2 );
    elbow4R.translateX(-3 );
    elbow4R.translateY(-3 );    
    elbow4R.translateZ( 5.5 );
    elbow4R.rotateOnAxis( yAxis, -Math.PI/2 );
    elbow4R.rotateOnAxis( zAxis, -Math.PI/2 );
    this.object.add( elbow4L );
    this.object.add( elbow4R );

    var cyl5L = makeCylinderMesh( cylGeom4, PVCMat, 3 );
    var cyl5R = makeCylinderMesh( cylGeom4, PVCMat, 3 );
    cyl5L.translateX(-3 );
    cyl5L.translateY( 1.75 );
    cyl5L.translateZ( 7 );
    cyl5R.translateX(-3 );
    cyl5R.translateY(-1.75 );
    cyl5R.translateZ( 7 );
    this.object.add(cyl5L);
    this.object.add(cyl5R);

    // Arm
    var geomHand = new THREE.BoxGeometry(2 ,4, 1.5);
    var stalkMesh = makeCylinderMesh( cylGeom6, PVCMat, 6);
    var handMesh = makeBoxMesh( geomHand, WOODMat);
    var elbow6 = new THREE.Mesh( elbowGeom, PVCMat );
    var elbow7 = new THREE.Mesh( elbowGeom, PVCMat );
    elbow6.translateX(-1.5);
    elbow6.translateZ(-1.5);
    elbow6.rotateOnAxis( xAxis, Math.PI/2 );
    elbow6.rotateOnAxis( zAxis, Math.PI/2 );
    elbow7.translateX(-4.5);
    elbow7.translateZ(-6.5);
    elbow7.rotateOnAxis(xAxis, -Math.PI/2);
    stalkMesh.translateX(-3);
    stalkMesh.translateZ(-4);
    stalkMesh.rotateOnAxis(xAxis, Math.PI/2);
    handMesh.translateX(-5.5);
    handMesh.translateZ(-8);
    this.arm = makeCylinderMesh( gearGeom, WOODMat, 50 );
    this.arm.add(stalkMesh);
    this.arm.add(handMesh);
    this.arm.add(elbow6);
    this.arm.add(elbow7);
    this.arm.translateX(-3 );
    this.arm.translateZ( 7 );
    this.arm.rotateOnAxis( yAxis, Math.PI );
    this.object.add(this.arm);

    // Wheels
    this.wheelL = makeCylinderMesh( wheelGeom, WOODMat, 50 );
    this.wheelR = makeCylinderMesh( wheelGeom, WOODMat, 50 );
    this.wheelL.translateY(  6 );
    this.wheelR.translateY( -6 );
    this.object.add( this.wheelL );
    this.object.add( this.wheelR );

    // Lifter
    var sup1L = makeBoxMesh( geomSupport, WOODMat, 5 );
    var sup1R = makeBoxMesh( geomSupport, WOODMat, 5 );
    var sup2L = makeBoxMesh( geomSupport, WOODMat, 5 );
    var sup2R = makeBoxMesh( geomSupport, WOODMat, 5 );
    var cyl7L = makeCylinderMesh( cylGeom10, PVCMat, 10 );
    var cyl7R = makeCylinderMesh( cylGeom10, PVCMat, 10 );
    var elbow5L = new THREE.Mesh( elbowGeom2, PVCMat );
    var elbow5R = new THREE.Mesh( elbowGeom2, PVCMat );
    sup1L.translateX( 3 );
    sup1L.translateY( 5.75 );
    sup1L.translateZ(-0.8125 );
    sup1L.rotateOnAxis( yAxis, -Math.PI/4 );
    sup1R.translateX( 3 );
    sup1R.translateY(-5.75 );
    sup1R.translateZ(-0.8125 );
    sup1R.rotateOnAxis( yAxis, -Math.PI/4 );
    sup2L.translateX( 9 );
    sup2L.translateY( 5.75 );
    sup2L.translateZ(-0.8125 );
    sup2L.rotateOnAxis( yAxis, -Math.PI/4 );
    sup2R.translateX( 9 );
    sup2R.translateY(-5.75 );
    sup2R.translateZ(-0.8125 );
    sup2R.rotateOnAxis( yAxis, -Math.PI/4 );
    cyl7L.translateX( 6 );
    cyl7L.translateY( 5 );
    cyl7L.translateZ( 0 );
    cyl7L.rotateOnAxis( zAxis, Math.PI/2 );
    cyl7R.translateX( 6 );
    cyl7R.translateY(-5 );
    cyl7R.translateZ( 0 );
    cyl7R.rotateOnAxis( zAxis, Math.PI/2 );
    elbow5L.translateX( 1.5 );
    elbow5L.translateY( 3.5 );
    elbow5L.rotateOnAxis( zAxis, Math.PI/2 );
    elbow5R.translateX( 1.5 );
    elbow5R.translateY(-3.5 );
    elbow5R.rotateOnAxis( zAxis, Math.PI );
    this.lifter = makeCylinderMesh( cylGeom8, PVCMat, 10 );
    this.lifter.add( cyl7L );
    this.lifter.add( cyl7R );
    this.lifter.add( elbow5L );
    this.lifter.add( elbow5R );
    this.lifter.add(sup1L);
    this.lifter.add(sup1R);
    this.lifter.add(sup2L);
    this.lifter.add(sup2R);
    this.lifter.translateX( 5 );
    this.lifter.translateZ( 0 );
    this.object.add( this.lifter );
    
    //wooden bases
    var baseGeom = new THREE.BoxGeometry(5, 9, 0.5);
    var frontGeom = new THREE.BoxGeometry(0.5, 9, 4);
    var baseMesh = new THREE.Mesh(baseGeom, WOODMat);
    var frontMesh = new THREE.Mesh(frontGeom, WOODMat);
    baseMesh.translateX(-1);
    baseMesh.translateZ(2.375);
    frontMesh.translateX(1.75);
    frontMesh.translateZ(0);
    this.object.add(baseMesh);
    this.object.add(frontMesh);

    this.cart = makeCopperCart(WOODMat);
    this.cart.translateX( 12 );
    this.cart.translateZ( -2 );
    this.cart.rotateOnAxis( zAxis, Math.PI/2 );
    this.cartAttached = true;

    this.object.add( this.cart );
    this.xPos = x0;
    this.yPos = y0;
    this.zRot = 0;

    this.currentState = 0;
    this.state = States[0];
}

Robot.prototype.dropCart = function() {
    if (this.cartAttached) {
        var s = this.cart.localToWorld( new THREE.Vector3(0,0,0) );
        this.object.remove( this.cart );
        this.cart.position = s;
        this.cart.__dirtyPosition = true;
        scene.add( this.cart );
        this.cartAttached = false;
    }
}

Robot.prototype.move = function(dx, dy, dphi) {
    var curr = this.currentState;
    var next = Transitions[curr][0];
    console.log(curr);
    console.log(next);
    var xpos = { x: this.object.position.x };
    var xdest = { x: xpos.x + 20 };
    var xtween = new TWEEN.Tween( xpos )
        .to( xdest, 1000 )
        .easing(TWEEN.Easing.Circular.Out)
        .onUpdate( function() {
            robot.object.position.x = this.x;
            robot.object.__dirtyPosition = true;
        } )
        .onComplete( function() {
            robot.currentState = next;
        } )
        .start();
    var ypos = { y: this.object.position.y };
    var ydest = { y: ypos.y - 20 };
    var ytween = new TWEEN.Tween( ypos )
        .to( ydest, 1000 )
        .easing(TWEEN.Easing.Circular.In)
        .onUpdate( function() {
            robot.object.position.y = this.y;
            robot.object.__dirtyPosition = true;
        } )
        .onComplete( function() {
            robot.currentState = next;
        } )
        .start();
    var zrot = { z: this.object.rotation.z };
    var zdest = { z: zrot.z - Math.PI/2 };
    var ztween = new TWEEN.Tween( zrot )
        .to( zdest, 1000 )
        .onUpdate( function() {
            robot.object.rotation.z = this.z;
            robot.object.__dirtyRotation = true;
        } )
        .onComplete( function() {
            robot.currentState = next;
        } )
        .start();
}

function BezierCurve(b0, b1, b2) {
    this.cp = [ b0, b1, b2 ];
}

BezierCurve.prototype.evaluate = function(t) {
    var b = [];
    for (var p=0; p<3; ++p) {
        b[p] = this.cp[p];
    }
    for (var m=2; m>=0; --m) {
        for (var p=0; p<m; ++p) {
            b[p] = (1-t)*b[p+1] + t*b[p];
        }
    }
    return b[0];
};

var States = [
    { // State 0 - Start box facing east
        x: -135, y: -60.75, theta: 0
    },
    { // State 1 - Near spare parts bin facing south
        x: -100, y: -95, theta: -Math.PI/2
    },
    { // State 2 - Start box facing west
        x: -135, y: -60.75, theta: Math.PI
    },
];

var Transitions = [
    // From State 0 - To States 1
    [ 1 ],
    // From State 1 - To States 0 or 2
    [ 0, 2 ],
    // From State 2 - To States 0
    [ 0 ],
];
