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

    this.object = new makeBoxMesh( new THREE.BoxGeometry( 4, 8, 2 ),
                                   WOODMat, 1000 );

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
    // this.wheelL = new THREE.Mesh( wheelGeom, WOODMat );
    // this.wheelR = new THREE.Mesh( wheelGeom, WOODMat );
    this.wheelL = makeCylinderMesh( wheelGeom, WOODMat, 100 );
    this.wheelR = makeCylinderMesh( wheelGeom, WOODMat, 100 );
    this.wheelL.translateY(  5 );
    this.wheelR.translateY( -5 );
    this.object.add( this.wheelL );
    this.object.add( this.wheelR );

    // Lifter
    this.lifter = new Lifter();
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
    
    this.omegaL = 0;
    this.omegaR = 0;

    this.RADIUS = 0;
    this.OMEGA = 0;

    this.currentState = 0;

    // var B = new BezierCurve([ -1, 0, 1 ]);
    // console.log("B(0.0) =", B.evaluate(0.0) );
    // console.log("B(0.5) =", B.evaluate(0.5) );
    // console.log("B(1.0) =", B.evaluate(1.0) );
}

// To execute one of these paths issue the following function call:
//   robot.path(0).start();
// where the argument to path selects the specific path listed below.
Robot.prototype.path = function(p) {
    if (p === undefined) return this.pause(5);
    var P = PATHS[p];
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

Robot.prototype.move = function( from, to, dt, rev ) {
    return makeTransition( from, to, dt, rev );
}

Robot.prototype.lowerBed = function() {
    return this.lifter.lowerBed();
}

Robot.prototype.raiseBed = function() {
    return this.lifter.raiseBed();
}

Robot.prototype.dropCart = function() {
    return this.lifter.dropCart();
}

Robot.prototype.grabCart = function() {
    return this.lifter.grabCart();
}

Robot.prototype.turn = function( phi, dphi ) {
    var dt = 2000*Math.abs(dphi)/Math.PI;
    var tween = new TWEEN.Tween( this.object.rotation )
        .to( { z: phi }, dt );
    return tween;
}

Robot.prototype.transferCoal = function(dt) {
    var cart = mineCarts[this.lifter.cartIndex];
    var coal = coalChute[0].userData.pieces;
    var tween = new TWEEN.Tween( { } )
        .to( { }, dt || 4000 )
        .onUpdate( function(cart, coal) {
            return function(t) {
                var index = Math.floor(23*t);
                coalChute[0].remove(coal[index]);
                var dx = 3;
                var dy = 10;
                var dz = 2;
                var x = dx*Math.random() - dx/2;
                var y = dy*Math.random() - dy/2;
                var z = dz*Math.random() + 2;
                coal[index].position.x = x;
                coal[index].position.y = y;
                coal[index].position.z = z;
                cart.add(coal[index]);
            }
        }(cart, coal) );
    return tween;
}

// Transfer cart to scoring bin
Robot.prototype.scoreCoal = function() {
    return this.pause(500);
}

Robot.prototype.reset = function(dt) {
    return new TWEEN.Tween({})
        .to({}, dt)
        .onComplete(function() {
            console.log("Attempting to refresh page.");
            location.reload();
        } );
}

// The pause tween can also be used as a place holder that does
// nothing, when there is nothing to be done.
Robot.prototype.pause = function( duration ) {
    var dt = duration || 1000;
    var begin = {};
    var end = {};
    var tween = new TWEEN.Tween( begin ).to( end, dt );
    return tween;
}



//--------------------------------------------------------------------
// Accelerate the robot wheel speeds
Robot.prototype.accel = function(alphaL, alphaR) {
    var r = 3;              // wheel radius
    var d = 10;             // wheel separation
    this.omegaL += alphaL;  // angular velocity of left wheel
    this.omegaR += alphaR;  // angular velocity of right wheel
    var delta = (this.omegaR - this.omegaL)/d;
    // compute radius of turn
    this.RADIUS = (delta ? 0.5*(this.omegaL + this.omegaR)/delta : 0);
    // compute angular velocity of turn
    this.OMEGA = r*delta;
}

//--------------------------------------------------------------------
// Set the speeds of the robot's wheels
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

//--------------------------------------------------------------------
// Update the robot's motion based on the current wheel speeds
Robot.prototype.updateMotion = function(dt) {
    this.object.rotation.x = 0;
    this.object.rotation.y = 0;
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
    this.object.__dirtyPosition = true;
    this.object.__dirtyRotation = true;
    if (this.cartIndex >= 0) {
        mineCarts[this.cartIndex].__dirtyPosition = true;
        mineCarts[this.cartIndex].__dirtyRotation = true;
    }
}

function Lifter() {
    this.lowerAngle =  0.125*Math.PI;
    this.raiseAngle =  0.5*Math.PI;
    this.currAngle = this.raiseAngle;
    this.raised = true;
    this.liftLock = false;
    this.cartLock = false;

    var elbowGeom = new THREE.TorusGeometry(1.5, 0.625, 12, 12, Math.PI/2);
    var cylSideGeom = new THREE.CylinderGeometry( 0.5, 0.5, 10 );
    var cylBackGeom = new THREE.CylinderGeometry( 0.5, 0.5, 6 );
    var suppGeom = new THREE.BoxGeometry(4, 0.5, 0.75);

    var elbowL = new THREE.Mesh( elbowGeom, PVCMat );
    var elbowR = new THREE.Mesh( elbowGeom, PVCMat );
    var cylL = new THREE.Mesh( cylSideGeom, PVCMat );
    var cylR = new THREE.Mesh( cylSideGeom, PVCMat );
    // var cylB = new THREE.Mesh( cylBackGeom, PVCMat );
    this.obj = makeCylinderMesh( cylBackGeom, PVCMat, 100 );
    
    elbowL.translateX( 1.5 );
    elbowL.translateY( 2.5 );
    elbowL.rotateOnAxis( zAxis, Math.PI/2 );
    // cylB.add( elbowL );
    this.obj.add( elbowL );
    
    elbowR.translateX( 1.5 );
    elbowR.translateY(-2.5 );
    elbowR.rotateOnAxis( zAxis, Math.PI );
    // cylB.add( elbowR );
    this.obj.add( elbowR );

    cylL.translateX( 6.0 );
    cylL.translateY( 4.0 );
    cylL.translateZ( 0.0 );
    cylL.rotateOnAxis( zAxis, Math.PI/2 );
    // cylB.add( cylL );
    this.obj.add( cylL );
    
    cylR.translateX( 6.0 );
    cylR.translateY(-4.0 );
    cylR.translateZ( 0.0 );
    cylR.rotateOnAxis( zAxis, Math.PI/2 );
    // cylB.add( cylR );
    this.obj.add( cylR );
    
    // this.obj = new THREE.Object3D();
    // this.obj.add( cylB );

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
        // cylB.add( this.axel[i] );
        this.obj.add( this.axel[i] );
    }
    this.obj.position.x = 3.0*Math.cos(this.currAngle) + 3.5;
    this.obj.position.z = 3.0*Math.sin(this.currAngle) - 1.5;

    this.cartNode = new THREE.Object3D();
    this.cartNode.translateX( 7.5 );
    this.cartNode.translateZ( -2 );
    this.cartNode.rotateOnAxis( zAxis, Math.PI/2 );

    var cart = makeCopperCart(WOODMat);
    cart.position.copy( this.cartNode.position );
    cart.rotation.copy( this.cartNode.rotation );
    if (usePhysics) {
        cart.setLinearFactor(nullVec);
        cart.setAngularFactor(nullVec);
    }
    this.obj.add(cart);
    this.cartIndex = mineCarts.length;
    mineCarts.push(cart);
}

Lifter.prototype.raiseBed = function() {
    if (this.liftLock || this.raised) return robot.pause(5);
    return this.liftTween();
}

Lifter.prototype.lowerBed = function() {
    if (this.liftLock || !this.raised) return robot.pause(5);
    return this.liftTween();
}

Lifter.prototype.liftTween = function () {
    if (this.liftLock) return robot.pause(5);
    this.liftLock = true;
    console.log("%s the bed.", (this.raised ? "Lowering" : "Raising"));
    var tween = new TWEEN.Tween( this )
        .to( { currAngle: (this.raised ? this.lowerAngle : this.raiseAngle) },
             1000 )
        .onUpdate( function(obj, axel) {
            return function() {
                obj.position.x = 3.0*Math.cos(this.currAngle) + 3.5;
                obj.position.z = 3.0*Math.sin(this.currAngle) - 1.5;
                for (var i=0; i<4; ++i) {
                    axel[i].rotation.y = -this.currAngle;
                }
            }
        }(this.obj, this.axel) )
        .onComplete( function(lifter) {
            return function() {
                lifter.raised = (this.currAngle == lifter.raiseAngle);
                lifter.liftLock = false;
            }
        }(this) );
    return tween;
}

Lifter.prototype.dropCart = function() {
    // Check to see if we are carrying a cart
    if (this.cartLock || this.cartIndex < 0) return robot.pause(5);

    console.log('Dropping Cart %s', this.cartIndex);
    this.cartLock = true;
    // If the bed is up, then lower it down
    var t0 = new TWEEN.Tween( this.cartIndex )
        .to( -1, 200)
        .onComplete( function( parent, child ) {
            return function() {
                child.applyMatrix( parent.obj.matrixWorld );
                parent.obj.remove( child );
                scene.add( child );
                parent.cartIndex = -1;
                parent.cartLock = false;
            }
        }(this, mineCarts[this.cartIndex]) );
    return t0;
}

Lifter.prototype.grabCart = function() {
/*
    // If any of the carts are already attached, then we can't pick up
    // any more now can we?
    if (this.cartLock || this.cartIndex >= 0) return robot.pause(5);

    // Find the closest cart
    var distSq = 1e12, index = -1;
    for (var i=0; i<mineCarts.length; ++i) {
        var world = mineCarts[i].position.clone();
        var local = this.obj.worldToLocal(world);
        var dSq = local.lengthSq();
        if (dSq < distSq) {
            distSq = dSq;
            index = i;
        }
    }
    // Look to see if we are close enough to the cart to pick it up.
    if (distSq > 100) {
        console.log("No carts are in range of the lifter.");
        return robot.pause(5);
    }
*/
    var index = 0;
    console.log("Grabbing cart %s.", index);
    this.cartLock = true;
    // Pick up the closest cart
    var t0 = new TWEEN.Tween( this.cartIndex )
        .to( index, 200)
        .onComplete( function( parent, child, index ) {
            return function() {
                console.log(parent);
                console.log(child);
                console.log(index);
                var Minv = new THREE.Matrix4();
                Minv.getInverse( parent.obj.matrixWorld );
                // Center it on the robot
                child.position.copy(parent.cartNode.position);
                child.rotation.copy(parent.cartNode.rotation);
                child.applyMatrix( Minv );
                scene.remove( child );
                parent.obj.add( child );
                parent.cartIndex = index;
                parent.cartLock = false;
            }
        }(this, mineCarts[index], index) );

    return t0;
}
