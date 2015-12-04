function Robot(x0, y0, z0) {
    var gearGeom = new THREE.CylinderGeometry( 1.5, 1.5, 0.25, 32 );
    var wheelGeom = new THREE.CylinderGeometry( 3, 3, 0.5, 32 );
    var elbowGeom = new THREE.TorusGeometry(1.5, 0.5, 12, 12, Math.PI/2);
    var elbowGeom2 = new THREE.TorusGeometry(1.5, 0.625, 12, 12, Math.PI/2);
    var cylGeom1  = new THREE.CylinderGeometry( 0.375, 0.375,  1 );
    var cylGeom2  = new THREE.CylinderGeometry( 0.375, 0.375,  2 );
    var cylGeom3  = new THREE.CylinderGeometry( 0.375, 0.375,  3 );
    var cylGeom4  = new THREE.CylinderGeometry( 0.375, 0.375,  3.5 );
    var cylGeom6  = new THREE.CylinderGeometry( 0.375, 0.375,  6 );
    var cylGeom10 = new THREE.CylinderGeometry( 0.5, 0.5, 10 );

    var geomVert = new THREE.CylinderGeometry( 0.375, 0.375, 2, 8 );
    var geomHori = new THREE.CylinderGeometry( 0.375, 0.375, 2, 8 );
    var geomShort = new THREE.CylinderGeometry( 0.375, 0.375, 1, 8);
    var geomArmSupport = new THREE.CylinderGeometry(0.375, 0.375, 8, 8);

    this.object = new THREE.Object3D();
    
    // Lifter Base
    var cyl1L = new THREE.Mesh( cylGeom10, PVCMat );
    var cyl1R = new THREE.Mesh( cylGeom10, PVCMat );
    cyl1L.translateX( 9.0 );
    cyl1L.translateY( 4.0 );
    cyl1L.translateZ(-1.625 );
    cyl1L.rotateOnAxis( zAxis, Math.PI/2 );
    cyl1R.translateX( 9.0 );
    cyl1R.translateY(-4.0 );
    cyl1R.translateZ(-1.625 );
    cyl1R.rotateOnAxis( zAxis, Math.PI/2 );
    this.object.add( cyl1L );
    this.object.add( cyl1R );

    var elbow1L = new THREE.Mesh( elbowGeom, PVCMat );
    var elbow1R = new THREE.Mesh( elbowGeom, PVCMat );
    elbow1L.translateX( 4.0 );
    elbow1L.translateY( 4.05 );
    elbow1L.translateZ(-0.125 );
    elbow1L.rotateOnAxis( xAxis, -Math.PI/2 );
    elbow1L.rotateOnAxis( zAxis, Math.PI/2 );
    elbow1R.translateX( 4.0 );
    elbow1R.translateY(-4.05 );
    elbow1R.translateZ(-0.125 );
    elbow1R.rotateOnAxis( xAxis, -Math.PI/2 );
    elbow1R.rotateOnAxis( zAxis, Math.PI/2 );
    this.object.add( elbow1L );
    this.object.add( elbow1R );

    var cyl2L = new THREE.Mesh( cylGeom2, PVCMat );
    var cyl2R = new THREE.Mesh( cylGeom2, PVCMat );
    cyl2L.translateX( 2.5 );
    cyl2L.translateY( 4.0 );
    cyl2L.translateZ( 0.5 );
    cyl2L.rotateOnAxis( xAxis, Math.PI/2 );
    cyl2R.translateX( 2.5 );
    cyl2R.translateY(-4.0 );
    cyl2R.translateZ( 0.5 );
    cyl2R.rotateOnAxis( xAxis, Math.PI/2 );
    this.object.add( cyl2L );
    this.object.add( cyl2R );

    var elbow2L = new THREE.Mesh( elbowGeom, PVCMat );
    var elbow2R = new THREE.Mesh( elbowGeom, PVCMat );
    elbow2L.translateX( 1.0 );
    elbow2L.translateY( 4.0 );
    elbow2L.translateZ( 1.5 );
    elbow2L.rotateOnAxis( xAxis, -Math.PI/2 );
    elbow2L.rotateOnAxis( zAxis, -Math.PI/2 );
    elbow2R.translateX( 1.0 );
    elbow2R.translateY(-4.0 );
    elbow2R.translateZ( 1.5 );
    elbow2R.rotateOnAxis( xAxis, -Math.PI/2 );
    elbow2R.rotateOnAxis( zAxis, -Math.PI/2 );
    this.object.add( elbow2L );
    this.object.add( elbow2R );

    // horizontal pvc supports above base
    var cyl3L = new THREE.Mesh( cylGeom3, PVCMat );
    var cyl3R = new THREE.Mesh( cylGeom3, PVCMat );
    cyl3L.translateX( 0.0 );
    cyl3L.translateY( 4.0 );
    cyl3L.translateZ( 3.0 );
    cyl3L.rotateOnAxis( zAxis, Math.PI/2 );
    cyl3R.translateX( 0.0 );
    cyl3R.translateY(-4.0 );
    cyl3R.translateZ( 3.0 );
    cyl3R.rotateOnAxis( zAxis, Math.PI/2 );
    this.object.add( cyl3L );
    this.object.add( cyl3R );
    
    var elbow3L = new THREE.Mesh( elbowGeom, PVCMat );
    var elbow3R = new THREE.Mesh( elbowGeom, PVCMat );
    elbow3L.translateX(-1.5 );
    elbow3L.translateY( 4.0 );
    elbow3L.translateZ( 4.5 );
    elbow3L.rotateOnAxis( xAxis, -Math.PI/2 );
    elbow3L.rotateOnAxis( zAxis,  Math.PI/2 );
    elbow3R.translateX(-1.5 );
    elbow3R.translateY(-4.0 );
    elbow3R.translateZ( 4.5 );
    elbow3R.rotateOnAxis( xAxis, -Math.PI/2 );
    elbow3R.rotateOnAxis( zAxis,  Math.PI/2 );
    this.object.add( elbow3L );
    this.object.add( elbow3R );

    var cyl4L = new THREE.Mesh( cylGeom2, PVCMat );
    var cyl4R = new THREE.Mesh( cylGeom2, PVCMat );
    cyl4L.translateX(-3.0 );
    cyl4L.translateY( 4.0 );
    cyl4L.translateZ( 5.0 );
    cyl4L.rotateOnAxis( xAxis, Math.PI/2 );
    cyl4R.translateX(-3.0 );
    cyl4R.translateY(-4.0 );
    cyl4R.translateZ( 5.0 );
    cyl4R.rotateOnAxis( xAxis, Math.PI/2 );
    this.object.add( cyl4L );
    this.object.add( cyl4R );

    var elbow4L = new THREE.Mesh( elbowGeom, PVCMat );
    var elbow4R = new THREE.Mesh( elbowGeom, PVCMat );
    elbow4L.translateX(-3.0 );
    elbow4L.translateY( 2.5 );
    elbow4L.translateZ( 5.5 );
    elbow4L.rotateOnAxis( yAxis, -Math.PI/2 );
    //elbow4L.rotateOnAxis( zAxis,  Math.PI/2 );
    elbow4R.translateX(-3.0 );
    elbow4R.translateY(-2.5 );    
    elbow4R.translateZ( 5.5 );
    elbow4R.rotateOnAxis( yAxis, -Math.PI/2 );
    elbow4R.rotateOnAxis( zAxis, -Math.PI/2 );
    this.object.add( elbow4L );
    this.object.add( elbow4R );

    var cyl5L = new THREE.Mesh( cylGeom4, PVCMat );
    var cyl5R = new THREE.Mesh( cylGeom4, PVCMat );
    cyl5L.translateX(-3.0 );
    cyl5L.translateY( 1.5 );
    cyl5L.translateZ( 7.0 );
    cyl5R.translateX(-3.0 );
    cyl5R.translateY(-1.5 );
    cyl5R.translateZ( 7.0 );
    this.object.add(cyl5L);
    this.object.add(cyl5R);

    // Arm
    var geomHand = new THREE.BoxGeometry( 2 ,4, 1.5 );
    var stalkMesh = new THREE.Mesh( cylGeom6, PVCMat );
    var handMesh = new THREE.Mesh( geomHand, WOODMat );
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
    this.arm.rotation.y = Math.PI;
    this.object.add(this.arm);

    // Wheels
    this.wheelL = new THREE.Mesh( wheelGeom, WOODMat );
    this.wheelR = new THREE.Mesh( wheelGeom, WOODMat );
    this.wheelL.translateY(  5 );
    this.wheelR.translateY( -5 );
    this.object.add( this.wheelL );
    this.object.add( this.wheelR );

    // Lifter
    this.lifter = new LiftBed();
    this.object.add( this.lifter.obj );
    
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
    
    this.cartPos = new THREE.Object3D();
    this.cartPos.translateX( 7.5 );
    this.cartPos.translateZ( -2 );
    this.cartPos.rotateOnAxis( zAxis, Math.PI/2 );
    this.lifter.obj.add( this.cartPos );

    this.omegaL = 0;
    this.omegaR = 0;

    this.RADIUS = 0;
    this.OMEGA = 0;
}

Robot.prototype.dropCart = function() {
    function drop() {
        console.log('Dropping Cart');
        var pos = robot.lifter.obj.localToWorld( robot.cartPos.position );
        robot.cart.position.set(pos.x, pos.y, pos.z);
        robot.cart.setLinearFactor(xyzVec);
        robot.cart.setAngularFactor(xyzVec);
        robot.cart.isAttached = false;
        robot.cart.__dirtyPosition = true;
        robot.cart.__dirtyRotation = true;
    }
    if (robot.cart.isAttached) {
        if (robot.lifter.raised) {
            // Lower the bed if necessary
            var tween = this.lifter.liftTween();
            tween.onComplete( function() {
                robot.lifter.raised = false;
                drop();
            } );
            console.log("Lowering the bed.");
            tween.start();
        }
        else {
            drop();
        }
    }
}

Robot.prototype.accel = function(omegaL, omegaR) {
    var r = 3;              // wheel radius
    var d = 10;             // wheel separation
    this.omegaL += omegaL;  // angular velocity of left wheel
    this.omegaR += omegaR;  // angular velocity of right wheel
    var delta = (this.omegaR - this.omegaL)/d;
    // compute radius of turn
    this.RADIUS = (delta ? 0.5*(this.omegaL + this.omegaR)/delta : 0);
    // compute angular velocity of turn
    this.OMEGA = r*delta;

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

Robot.prototype.setSpeed = function(omegaL, omegaR) {
    var r = 3;              // wheel radius
    var d = 10;             // wheel separation
    this.omegaL = omegaL;  // angular velocity of left wheel
    this.omegaR = omegaR;  // angular velocity of right wheel
    var delta = (this.omegaR - this.omegaL)/d;
    // compute radius of turn
    this.RADIUS = (delta ? 0.5*(this.omegaL + this.omegaR)/delta : 0);
    // compute angular velocity of turn
    this.OMEGA = r*delta;
}

Robot.prototype.updateMotion = function(dt) {
    if (this.omegaL == 0 && this.omegaR == 0) {
        return;
    }
    else if (this.omegaL == this.omegaR) {
        var s = 3*dt*this.omegaL;
        this.object.translateX(s);
    }
    else {
        var t = this.OMEGA*dt
        var s = this.RADIUS*t;
        this.object.translateX(s/2);
        this.object.rotateOnAxis(zAxis,t);
        this.object.translateX(s/2);
    }
    if (this.cart.isAttached) {
        this.cart.__dirtyPosition = true;
        this.cart.__dirtyRotation = true;
    }
}

function LiftBed() {
    this.lowerAngle =  0.125*Math.PI;
    this.raiseAngle =  0.5*Math.PI;
    this.currAngle = this.raiseAngle;
    this.raised = true;
    
    var elbowGeom = new THREE.TorusGeometry(1.5, 0.625, 12, 12, Math.PI/2);
    var cylSideGeom = new THREE.CylinderGeometry( 0.5, 0.5, 10 );
    var cylBackGeom = new THREE.CylinderGeometry( 0.5, 0.5, 6 );
    var suppGeom = new THREE.BoxGeometry(4, 0.5, 0.75);

    var elbowL = new THREE.Mesh( elbowGeom, PVCMat );
    var elbowR = new THREE.Mesh( elbowGeom, PVCMat );
    var cylL = new THREE.Mesh( cylSideGeom, PVCMat );
    var cylR = new THREE.Mesh( cylSideGeom, PVCMat );
    var cylB = new THREE.Mesh( cylBackGeom, PVCMat );
    
    elbowL.translateX( 1.5 );
    elbowL.translateY( 2.5 );
    elbowL.rotateOnAxis( zAxis, Math.PI/2 );
    cylB.add( elbowL );
    
    elbowR.translateX( 1.5 );
    elbowR.translateY(-2.5 );
    elbowR.rotateOnAxis( zAxis, Math.PI );
    cylB.add( elbowR );

    cylL.translateX( 6.0 );
    cylL.translateY( 4.0 );
    cylL.translateZ( 0.0 );
    cylL.rotateOnAxis( zAxis, Math.PI/2 );
    cylB.add( cylL );
    
    cylR.translateX( 6.0 );
    cylR.translateY(-4.0 );
    cylR.translateZ( 0.0 );
    cylR.rotateOnAxis( zAxis, Math.PI/2 );
    cylB.add( cylR );
    
    this.obj = new THREE.Object3D();
    this.obj.add( cylB );

    this.axel = [];
    for (var i=0; i<4; ++i) {
        this.axel[i] = new THREE.Object3D();
        var supp = new THREE.Mesh( suppGeom, WOODMat );
        supp.translateX(-1.5);
        this.axel[i].add(supp);
        this.axel[i].position.x = (i<2 ? 4 : 10);
        this.axel[i].position.y = (i%2 ? 4.75 : -4.75);
        this.axel[i].position.z = 0;
        this.axel[i].rotation.y = -this.currAngle;
        cylB.add( this.axel[i] );
    }
    // this.obj.translateX( 5 );
    // this.obj.translateZ( 0 );
    this.obj.position.x = 3.0*Math.cos(this.currAngle) + 3.5;
    this.obj.position.z = 3.0*Math.sin(this.currAngle) - 1.5;
}

LiftBed.prototype.raiseBed = function() {
    if (this.raised) return;
    console.log("Raising the bed.");
    this.liftTween().start();
}

LiftBed.prototype.lowerBed = function() {
    if (!this.raised) return;
    console.log("Lowering the bed.");
    this.liftTween().start();
}

LiftBed.prototype.liftTween = function () {
    var tween = new TWEEN.Tween( this )
        .to( { currAngle: (this.raised ? this.lowerAngle : this.raiseAngle) },
             1000 )
        .onUpdate( function() {
            robot.lifter.obj.position.x = 3.0*Math.cos(this.currAngle) + 3.5;
            robot.lifter.obj.position.z = 3.0*Math.sin(this.currAngle) - 1.5;
            for (var i=0; i<4; ++i) {
                robot.lifter.axel[i].rotation.y = -this.currAngle;
            }
            robot.cart.__dirtyPosition = true;
            robot.cart.__dirtyRotation = true;
        } )
        .onComplete( function() {
            robot.lifter.raised = (this.currAngle == robot.lifter.raiseAngle);
            robot.cart.__dirtyPosition = true;
            robot.cart.__dirtyRotation = true;
        } );
    return tween;
}
