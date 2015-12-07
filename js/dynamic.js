function addDynamicObjects() {
    // Add spodumene crystals to the spodumene tower
    addSpodumeneCrystals();

    // Add dynamic elements to each of the sections
    for (var i=0; i<4; ++i) {
        var phi = i*Math.PI/2;
        
        //--------------------
        // GROUND LEVEL
        //--------------------
        
        // Limestone aggregate pieces
        addLimestonePieces(i);

        // Replacement pipe
        var pipe = makeReplacementPipe(colorMats[i]);
        pipe.rotateOnAxis( zAxis, phi );
        pipe.translateX(-83.4 );
        pipe.translateY(-93.5125 );
        pipe.translateZ( 11.6 );
        scene.add(pipe);

        // Replacement air filter
        var filter = makeReplacementFilter();
        filter.rotateOnAxis( zAxis, phi );
        filter.translateX( -89 );
        filter.translateY( -93.5125 );
        filter.translateZ( 7.5 );
        filter.rotateOnAxis( yAxis, Math.PI/4 );
        scene.add(filter);

        //--------------------
        // SUBLEVEL 1
        //--------------------
        
        // Coal chute
        coalChute[i] = makeCoalChute(colorMats[i]);
        coalChute[i].rotateOnAxis( zAxis, phi );
        coalChute[i].translateX(-70.75 );
        coalChute[i].translateY(-93.5125 );
        coalChute[i].translateZ( 31 );
        coalChute[i].rotateOnAxis( yAxis, 15*Math.PI/180 );
        coalChute[i].userData.triggered = false;
        scene.add( coalChute[i] );

        if (usePhysics) {
            var x = -73.5;
            var y = -93.5125;
            var z = 30.75;
            var r = Math.sqrt(x*x + y*y);
            var theta = phi + Math.atan2(y, x);
            var origin = new THREE.Vector3(r*Math.cos(theta),
                                           r*Math.sin(theta), z);
            constraint = new Physijs.HingeConstraint(
                coalChute[i], undefined, origin, yAxis );
            scene.addConstraint( constraint );
        }

        // Coal chute support
        var supportGeom = new THREE.BoxGeometry( 3.5, 0.75, 24 );
        coalSupport[i]  = makeBoxMesh(supportGeom, colorMats[i], 10);
        coalSupport[i].castShadow = useShadows;
        coalSupport[i].receiveShadow = useShadows;
        coalSupport[i].rotateOnAxis( zAxis, phi );
        coalSupport[i].translateX( -72.75 );
        coalSupport[i].translateY( -85.2625 );
        coalSupport[i].translateZ( 18 );
        if (usePhysics) {
            coalSupport[i].setLinearFactor( nullVec );
            coalSupport[i].setAngularFactor( nullVec );
        }
        scene.add( coalSupport[i] );
        
        if (usePhysics) {
            var x = -74.5;
            var y = -84.8875;
            var z = 18;
            var r = Math.sqrt(x*x + y*y);
            var theta = phi + Math.atan2(y, x);
            var origin = new THREE.Vector3(r*Math.cos(theta),
                                           r*Math.sin(theta), z);
            constraint = new Physijs.HingeConstraint(
                coalSupport[i], undefined, origin, zAxis );
            scene.addConstraint( constraint );
        }
        
        // Coal pieces
        addCoalPieces(i);

        // var cart = makeCopperCart(WOODMat);
        // cart.rotateOnAxis(zAxis, phi);
        // cart.translateX(-50);
        // cart.translateY(-90);
        // scene.add(cart);
        
        // Magnetite vein
        magnetiteVein[i] = new MagnetiteVein(colorMats[i]);
        magnetiteVein[i].obj.rotateOnAxis( zAxis, phi );
        magnetiteVein[i].obj.translateX( -18.625 );
        magnetiteVein[i].obj.translateY( -104.375 );
        magnetiteVein[i].obj.translateZ( 8.25 );
        magnetiteVein[i].obj.rotateOnAxis( xAxis, 16*Math.PI/180 );
        
        // Magnetite pieces
        addMagnetitePieces(i);

        scene.add( magnetiteVein[i].obj );

        if (usePhysics) {
            var x = -18.625;
            var y = -104.375;
            var z = 8;
            var r = Math.sqrt(x*x + y*y);
            var theta = phi + Math.atan2(y, x);
            var origin = new THREE.Vector3(r*Math.cos(theta),
                                           r*Math.sin(theta), z);
            var constraint = new Physijs.HingeConstraint(
                magnetiteVein[i].obj, undefined, origin, xAxis );
            scene.addConstraint( constraint );
        }

        //--------------------
        // SUBLEVEL 2
        //--------------------
        
	      //Copper Box
	      var cart = makeCopperCart(colorMats[i]);
        mineCarts.push( cart );
        cart.isAttached = false;
        cart.rotateOnAxis( zAxis, phi );
        cart.translateX( -0.375 );
        cart.translateY( -117.125 );
	      scene.add( cart );

        for (var m=0; m<3; ++m) {
            for (var n=0; n<4; ++n) {
                var chalcopyrite = makeChalcopyrite();
                chalcopyrite.rotateOnAxis( zAxis, phi );
                var dx = (i%2 ? 10 :  3);
                var dy = (i%2 ?  3 : 10);
                var dz = 2;
                var x = dx*Math.random() - dx/2;
                var y = dy*Math.random() - dy/2;
                var z = dz*Math.random() + 2;
                chalcopyrite.translateX(x);
                chalcopyrite.translateY(y);
                chalcopyrite.translateZ(z);
                chalcopyrite.rotateOnAxis( xAxis, Math.random()*Math.PI);
                chalcopyrite.rotateOnAxis( yAxis, Math.random()*Math.PI);
                chalcopyrite.rotateOnAxis( zAxis, Math.random()*Math.PI);
                cart.add( chalcopyrite );
            }
	      }

        // Bauxite
        for (var n=0; n<10; ++n) {
            var bauxite = makeBauxite();
            bauxite.rotateOnAxis( zAxis, phi );
            bauxite.translateX(27);
            bauxite.translateY(n*3 - 136);
            bauxite.translateZ(2.25);
            scene.add( bauxite );
        }
        for (var n=0; n<6; ++n) {
            var bauxite = makeBauxite();
            bauxite.rotateOnAxis( zAxis, phi );
            bauxite.translateX(47.5 - n*2.9);
            bauxite.translateY(-107.5);
            bauxite.translateZ(2.5);
            scene.add( bauxite );
        }

        //--------------------
        // SUBLEVEL 3
        //--------------------
        var samples = makeCoreSamples(colorMats[i]);
        for (var n=0; n<3; ++n) {
            samples[n].rotateOnAxis( zAxis, phi );
            samples[n].translateX(2.5-n*1.04);
            samples[n].translateY(-41 - n*2.5);
            samples[n].translateZ((n+1)*6);
            samples[n].rotateOnAxis( xAxis, Math.PI/2 );
            samples[n].rotateOnAxis( zAxis, Math.PI/18 );
            scene.add(samples[n]);
        }
    }
}

//====================================================================
// Ground Level
//--------------------------------------------------------------------
function addLimestonePieces(section) {
    var limeGeom = new THREE.CylinderGeometry( 2.5, 2.5, 4.5, 16 );
	  for (var n=0; n<5; n++) {
	      var limeMesh = makeCylinderMesh(limeGeom, grayMat, 0.5);
        limeMesh.castShadow = useShadows;
        limeMesh.receiveShadow = useShadows;
        limeMesh.rotateOnAxis( zAxis, section*Math.PI/2 );
	      limeMesh.translateX( -77 );
	      limeMesh.translateY( -114 );
	      limeMesh.translateZ( 3 + n*4.5 );
        // Add a small random perturbation to the (x,y) coordinates
        limeMesh.translateX( 0.4*Math.random() - 0.2 );
        limeMesh.translateY( 0.4*Math.random() - 0.2 );
        // Rotate the cylinder axis to vertical
	      limeMesh.rotateOnAxis( xAxis, Math.PI/2 );
	      scene.add(limeMesh);
	  }
}

//====================================================================
// SubLevel 1
//--------------------------------------------------------------------
function addCoalPieces(section) {
    coalPieces[section] = [];
    coalChute[section].userData.pieces = [];
    var phi = section*Math.PI/2;
    for (var j=0; j<8; ++j) {
        for (var k=0; k<3; ++k) {
            var obj = new Coal( section == 0 );
            var mesh = obj.mesh;
            if (usePhysics && section == 0) {
                // Positioning relative to game field
                mesh.rotateOnAxis( zAxis, phi );
                mesh.translateZ( 32.5 );
                mesh.translateX( -72.75 + k*2 );
                mesh.translateY( -107.5125 + j*4 );
                if (obj.physics) {
                    // Null out the moments so the pieces don't jiggle
                    // in the tray
                    mesh.setLinearFactor(nullVec);
                    mesh.setAngularFactor(nullVec);
                    mesh.setLinearVelocity(nullVec);
                    mesh.setAngularVelocity(nullVec);
                }
                scene.add(mesh);
                coalChute[section].userData.pieces.push(mesh);
            }
            else {
                // Positioning relative to chute tray
                mesh.translateX( -2 + k*2 );
                mesh.translateY( -3.5*4 + j*4 );
                mesh.translateZ( 1.5 );
                if (obj.physics) {
                    // Null out the moments so the pieces don't jiggle
                    // in the tray
                    mesh.setLinearFactor(nullVec);
                    mesh.setAngularFactor(nullVec);
                    mesh.setLinearVelocity(nullVec);
                    mesh.setAngularVelocity(nullVec);
                }
                coalChute[section].add(mesh);
                coalChute[section].userData.pieces.push(mesh);
            }
        }
    }
}

function MagnetiteVein(mat) {
    var tubeCapGeom = new THREE.CylinderGeometry(1.5, 1.5, 2.5, 12, 1);
    var tubeBodyGeom = new THREE.CylinderGeometry(1, 1, 36, 12, 1, true);
    var anchorGeom = new THREE.BoxGeometry( 5, 5, 0.5 );

    this.tubeCap  = makeCylinderMesh(tubeCapGeom, pvcMat, 10, 0.5, 0.1);
    this.tubeBody = makeCylinderMesh(tubeBodyGeom, pvcMat, 50, 0.5, 0.1);
    this.anchor   = makeBoxMesh(anchorGeom, mat, 20, 0.5, 0.1);

    this.anchor.castShadow = useShadows;
    this.anchor.receiveShadow = useShadows;
    this.anchor.translateY( -2.5 );
    
    this.tubeCap.castShadow = useShadows;
    this.tubeCap.receiveShadow = useShadows;
    this.tubeCap.translateY(-18 );
    //this.tubeCap.material.wireframe = true;
    
    this.tubeBody.castShadow = useShadows;
    this.tubeBody.receiveShadow = useShadows;
    this.tubeBody.translateY(-6.5);
    this.tubeBody.translateZ(1.25);
    //this.tubeBody.material.wireframe = true;
    
    this.tubeBody.add(this.tubeCap);
    this.anchor.add(this.tubeBody);
    
    this.obj = new THREE.Object3D();
    this.obj.add( this.anchor );

    this.pieces = [];
}

// Make and add the magnetite pieces (golf balls)
function addMagnetitePieces(section) {
    magnetitePieces[section] = [];
    var phi = section*Math.PI/2;
    for (var i=0; i<20; ++i) {
        var sphereGeom = new THREE.SphereGeometry( 0.85, 12, 8 );
        var sphere = makeSphereMesh( sphereGeom, whiteMat, 10, 0.5, 0.4 );
        if (true) {
            // Position with respect to the magnetite vein
            sphere.translateY( -18 + 1.7*i );
            if (usePhysics) {
                sphere.setLinearFactor(nullVec);
                sphere.setAngularFactor(nullVec);
                sphere.setLinearVelocity(nullVec);
                sphere.setAngularVelocity(nullVec);
            }
            magnetiteVein[section].tubeBody.add(sphere);
            magnetiteVein[section].pieces.push(sphere);
        }
        else {
            // Position with respect to the global scene
            sphere.rotateOnAxis( zAxis, phi );
            sphere.translateX( -18.625 );
            sphere.translateY( -130.875 + 1.7*i );
            sphere.translateZ( 9.5 );
            if (usePhysics) {
                sphere.setLinearFactor(nullVec);
                sphere.setAngularFactor(nullVec);
                sphere.setLinearVelocity(nullVec);
                sphere.setAngularVelocity(nullVec);
            }
            scene.add(sphere);
            magnetitePieces[section][i] = sphere;
        }
    }
}

//====================================================================
// SubLevel 2
//--------------------------------------------------------------------
function makeCopperCart(mat) {
    var baseGeom       = new THREE.BoxGeometry(3.5, 12, 1.5);
    var sideGeom       = new THREE.BoxGeometry(0.5, 12, 8.25);
    var endBox         = new THREE.BoxGeometry( 8.875, 0.5, 8 );
    var endGeom        = makeCustomBoard(
        [ -2.25, -4.4375, -2.25, -4.4375,  2.25,  4.4375,  2.25,  4.4375 ],
        [ -0.25, -0.2500,  0.25,  0.2500, -0.25, -0.2500,  0.25,  0.2500 ],
        [ -4.00,  4.0000, -4.00,  4.0000, -4.00,  4.0000, -4.00,  4.0000 ]
    );
    var base        = makeBoxMesh( baseGeom, mat, 500 );
    var side1       = makeBoxMesh( sideGeom, mat, 500 );
    var side2       = makeBoxMesh( sideGeom, mat, 500 );
    var end1        = makeBoxMesh( endBox,  mat, 500 );
    var end2        = makeBoxMesh( endBox,  mat, 500 );
    var endMesh1 = new THREE.Mesh( endGeom, mat );
    var endMesh2 = new THREE.Mesh( endGeom, mat );

    base.translateZ( 0.75);

    side1.castShadow = useShadows;
    side1.receiveShadow = useShadows;
    side1.translateX( -3.1 );
    side1.translateZ( 3.5 );
    side1.rotateOnAxis(  yAxis, -Math.PI/12 );
    
    side2.castShadow = useShadows;
    side2.receiveShadow = useShadows;
    side2.translateX( 3.1 );
    side2.translateZ( 3.5 );
    side2.rotateOnAxis(  yAxis,  Math.PI/12 );
    
    end1.translateY( 6.25 );
    end1.translateZ( 3.46875 );
    end1.visible = false;

    end2.translateY( -6.25 );
    end2.translateZ( 3.46875 );
    end2.visible = false;

    endMesh1.castShadow = useShadows;
    endMesh1.receiveShadow = useShadows;
    endMesh1.translateY( 6.25 );
    endMesh1.translateZ( 3.46875 );
    
    endMesh2.castShadow = useShadows;
    endMesh2.receiveShadow = useShadows;
    endMesh2.translateY( -6.25 );
    endMesh2.translateZ( 3.46875 );

    base.add(side1);
    base.add(side2);
    base.add(end1);
    base.add(end2);
    base.add(endMesh1);
    base.add(endMesh2);
    return base;
}

//====================================================================
// SubLevel 3
//--------------------------------------------------------------------
function addSpodumeneCrystals( ) {
    spodumeneTower.userData.pieces = [];
    var crystalGeom = makeCustomBoard(
        [ -0.750, -0.750, -0.750, -0.750,  0.750,  0.750,  0.750,  0.750 ],
        [ -6.364, -5.303,  0.000,  0.000, -6.364, -5.303,  0.000,  0.000 ],
        [  6.364,  7.425,  0.000,  2.305,  6.364,  7.425,  0.000,  2.305 ]
    );
    for (var n=0; n<4; ++n) {
        var phi = n*Math.PI/2;
        for (var c=0; c<2; ++c) {
            var crystal = makeConvexMesh( crystalGeom, woodMat, 20 );
            crystal.rotateOnAxis( zAxis, phi );
            crystal.translateY(-1.75);
            crystal.translateZ( 14 + c*12 );
            if (usePhysics) {
                crystal.setLinearFactor(nullVec);
                crystal.setAngularFactor(nullVec);
                crystal.setLinearVelocity(nullVec);
                crystal.setAngularVelocity(nullVec);
            }
            spodumeneTower.userData.pieces.push(crystal);
            spodumeneTower.add(crystal);
        }
    }
}

function makeCoreSamples(mat) {
    var coreSamples = [];
    //geom
    var shortGeom = new THREE.CylinderGeometry(0.5, 0.5, 12, 8, 1);
    var medGeom = new THREE.CylinderGeometry(0.5, 0.5, 24, 8, 1);
    var longGeom = new THREE.CylinderGeometry(0.5, 0.5, 36, 8, 1);
    var colorTape = new THREE.CylinderGeometry(0.51, 0.51, 2, 8, 1, true);
    //meshes
    var shortCore = makeCylinderMesh(shortGeom, pvcMat, 15);
    var medCore = makeCylinderMesh(medGeom, pvcMat);
    var longCore = makeCylinderMesh(longGeom, pvcMat);
    var shortTape1 = new THREE.Mesh(colorTape, mat);
    var shortTape2 = shortTape1.clone();
    var medTape1 = shortTape1.clone();
    var medTape2 = shortTape1.clone();
    var longTape1 = shortTape1.clone();
    var longTape2 = shortTape1.clone();

    shortTape1.translateY(-5);
    shortTape2.translateY( 5);
    shortCore.add(shortTape1);
    shortCore.add(shortTape2);

    medTape1.translateY(-11);
    medTape2.translateY( 11);
    medCore.add(medTape1);
    medCore.add(medTape2);

    longTape1.translateY(-17);
    longTape2.translateY( 17);
    longCore.add(longTape1);
    longCore.add(longTape2);

    coreSamples.push(shortCore);
    coreSamples.push(medCore);
    coreSamples.push(longCore);
    return coreSamples;
}

//2.5 diameter, 16 balls
function makeBauxite() {
    var bauxiteGeom = new THREE.SphereGeometry(1.25+0.2*Math.random());
    //var bauxiteMat = new THREE.MeshLambertMaterial({color: 0xd3d3d3});
    var bauxite = makeSphereMesh(bauxiteGeom, grayMat, 5);
    return bauxite;
}

function makeReplacementPipe(mat) {
    var rPipeGeom = new THREE.CylinderGeometry(0.625, 0.625, 16.25);
    var rpTapeGeom = new THREE.CylinderGeometry(0.635, 0.635, 2, 8, 1, true);
    var elbowGeom = new THREE.TorusGeometry(1.5, 0.75, 12, 12, Math.PI/2);
    var rPipe = makeCylinderMesh(rPipeGeom, pvcMat, 20);
    var rpTape1 = new THREE.Mesh(rpTapeGeom, mat);
    var rpTape2 = rpTape1.clone();
    var rpElbow1 = makeConvexMesh(elbowGeom, pvcMat, 5);
    var rpElbow2 = makeConvexMesh(elbowGeom, pvcMat, 5);

    rpTape1.translateY(6.125);
    rPipe.add(rpTape1);

    rpTape2.translateY(-6.125);
    rPipe.add(rpTape2);

    rpElbow1.castShadow = useShadows;
    rpElbow1.receiveShadow = useShadows;
    rpElbow1.translateY(7.4);
    rpElbow1.translateZ(-1.5);
    rpElbow1.rotateOnAxis(yAxis, -Math.PI/2);
    rPipe.add(rpElbow1);

    rpElbow2.castShadow = useShadows;
    rpElbow2.receiveShadow = useShadows;
    rpElbow2.translateY(-7.4);
    rpElbow2.translateZ(-1.5);
    rpElbow2.rotateOnAxis(zAxis, -Math.PI/2);
    rpElbow2.rotateOnAxis(xAxis,  Math.PI/2);
    rPipe.add(rpElbow2);

    rPipe.castShadow = useShadows;
    rPipe.receiveShadow = useShadows;
    return rPipe;
}

function makeReplacementFilter() {
    var rfGeom = new THREE.BoxGeometry(0.75, 11, 8.5);
    var rfMat = new THREE.MeshBasicMaterial({color: 0xc1f0f6});
    var rfMesh = makeBoxMesh(rfGeom, rfMat);
    rfMesh.castShadow = useShadows;
    rfMesh.receiveShadow = useShadows;
    return rfMesh;
}

function makeChalcopyrite() {
    var elbowGeom = new THREE.TorusGeometry(0.75, 0.5, 8, 6, Math.PI/2);
    var cylGeom1 = new THREE.CylinderGeometry( 0.5, 0.5, 2, 8 );
    var cylGeom2 = new THREE.CylinderGeometry( 0.5, 0.5, 1, 8 );
    var elbow = makeConvexMesh( elbowGeom, pvcMat, 10 );
    var tee1 = makeCylinderMesh( cylGeom1, pvcMat, 10 );
    var tee2 = makeCylinderMesh( cylGeom2, pvcMat,  5 );

    elbow.receiveShadow = useShadows;

    tee1.translateX(0.75);
    tee1.translateY(-1);
    tee1.rotateOnAxis(xAxis, Math.PI/2);
    tee1.receiveShadow = useShadows;
    elbow.add(tee1)

    tee2.translateX(0.75);
    tee2.translateY(-0.5);
    tee2.receiveShadow = useShadows;
    elbow.add(tee2)

    return elbow;
}
