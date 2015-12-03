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

        // Magnetite vein
        magnetiteVein[i] = makeMagnetiteVein(colorMats[i]);
        magnetiteVein[i].rotateOnAxis( zAxis, phi );
        magnetiteVein[i].translateX( -18.625 );
        magnetiteVein[i].translateY( -113.375 );
        magnetiteVein[i].translateZ( 9.25 );
        
        // Magnetite pieces
        addMagnetitePieces(i);

        scene.add( magnetiteVein[i] );

        if (usePhysics) {
            var x = -18.625;
            var y = -104.375;
            var z = 8;
            var r = Math.sqrt(x*x + y*y);
            var theta = phi + Math.atan2(y, x);
            var origin = new THREE.Vector3(r*Math.cos(theta),
                                           r*Math.sin(theta), z);
            var constraint = new Physijs.HingeConstraint(
                magnetiteVein[i], undefined, origin, xAxis );
            scene.addConstraint( constraint );
        }

        //--------------------
        // SUBLEVEL 2
        //--------------------
        
	      //Copper Box
	      var mineCart = makeCopperCart(colorMats[i]);
        mineCart.rotateOnAxis( zAxis, phi );
        mineCart.translateX( -0.375 );
        mineCart.translateY( -117.125 );
	      scene.add( mineCart )

        for (var m=0; m<3; ++m) {
            for (var n=0; n<4; ++n) {
                var chalcopyrite = makeChalcopyrite();
                chalcopyrite.rotateOnAxis( zAxis, phi );
                chalcopyrite.translateX( -3.5 + 3*m );
                chalcopyrite.translateY( -121 + 3*n );
                chalcopyrite.translateZ( 10 );
                scene.add( chalcopyrite );
            }
	      }

        // Bauxite
        for (var n=0; n<10; ++n) {
            var bauxite = makeBauxite();
            bauxite.rotateOnAxis( zAxis, phi );
            bauxite.translateX(27);
            bauxite.translateY(n*3 - 136);
            bauxite.translateZ(2.5);
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
	      var limeMesh = makeCylinderMesh(limeGeom, grayMat, 5);
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
            var mesh = makeConvexMesh( makeCoalGeometry(), coalMat, 1 );
            if (true) {
                // Positioning relative to chute tray
                mesh.castShadow = useShadows;
                mesh.translateX( -2 + k*2 );
                mesh.translateY( -3.5*4 + j*4 );
                mesh.translateZ( 1.5 );
                if (usePhysics) {
                    mesh.setLinearFactor(new THREE.Vector3(0,0,0));
                    mesh.setAngularFactor(new THREE.Vector3(0,0,0));
                    mesh.setLinearVelocity(new THREE.Vector3(0,0,0));
                    mesh.setAngularVelocity(new THREE.Vector3(0,0,0));
                }
                coalChute[section].add(mesh);
                coalChute[section].userData.pieces.push(mesh);
            }
            else {
                // Positioning relative to game field
                mesh.rotateOnAxis( zAxis, phi );
                mesh.translateZ( 32.5 );
                mesh.translateX( -72.75 + k*2 );
                mesh.translateY( -107.5125 + j*4 );
                scene.add(mesh);
                coalPieces[section].push(mesh);
            }
        }
    }
}

function makeCoalGeometry() {
    var geom = new THREE.Geometry();
    geom.vertices.push(new THREE.Vector3(-1.00, -2.00, -0.65));
    geom.vertices.push(new THREE.Vector3( 0.95, -0.90, -1.25));
    geom.vertices.push(new THREE.Vector3( 0.80,  0.00, -1.25));
    geom.vertices.push(new THREE.Vector3( 1.00,  1.40, -1.25));
    geom.vertices.push(new THREE.Vector3(-1.00, -0.90, -1.25));
    geom.vertices.push(new THREE.Vector3(-1.00,  1.40, -1.25));
    geom.vertices.push(new THREE.Vector3( 1.00,  1.70, -1.10));
    geom.vertices.push(new THREE.Vector3(-1.00,  1.70, -1.10));
    geom.vertices.push(new THREE.Vector3( 0.70,  2.00, -1.00));
    geom.vertices.push(new THREE.Vector3(-0.70,  2.00, -1.00));
    geom.vertices.push(new THREE.Vector3( 1.00, -1.45, -0.95));
    geom.vertices.push(new THREE.Vector3( 1.00, -1.75, -0.80));
    geom.vertices.push(new THREE.Vector3( 0.70, -2.00, -0.65));
    geom.vertices.push(new THREE.Vector3(-1.00, -2.00,  0.00));
    geom.vertices.push(new THREE.Vector3(-0.50, -2.00,  0.70));
    geom.vertices.push(new THREE.Vector3( 0.10, -2.00,  0.70));
    geom.vertices.push(new THREE.Vector3(-0.35, -1.70,  1.00));
    geom.vertices.push(new THREE.Vector3( 0.15, -1.70,  1.00));
    geom.vertices.push(new THREE.Vector3( 0.40, -1.20,  1.05));
    geom.vertices.push(new THREE.Vector3( 0.90, -0.50,  0.95));
    geom.vertices.push(new THREE.Vector3( 1.00, -1.45, -0.55));
    geom.vertices.push(new THREE.Vector3(-0.20, -0.50,  1.15));
    geom.vertices.push(new THREE.Vector3( 0.40, -0.10,  1.25));
    geom.vertices.push(new THREE.Vector3( 0.80,  0.00,  1.05));
    geom.vertices.push(new THREE.Vector3( 0.85,  0.30,  1.10));
    geom.vertices.push(new THREE.Vector3(-1.00,  0.80,  0.00));
    geom.vertices.push(new THREE.Vector3( 1.00,  1.40,  0.40));
    geom.vertices.push(new THREE.Vector3( 0.85,  1.40,  0.45));
    geom.vertices.push(new THREE.Vector3(-1.00,  1.70, -0.60));
    geom.vertices.push(new THREE.Vector3(-0.70,  2.00, -0.70));
    geom.vertices.push(new THREE.Vector3( 0.20,  2.00, -0.30));
    geom.vertices.push(new THREE.Vector3( 0.70,  2.00, -0.50));
    geom.vertices.push(new THREE.Vector3( 1.00,  1.70, -0.30));
    geom.faces.push(new THREE.Face3( 1,  4,  2));
    geom.faces.push(new THREE.Face3( 2,  4,  5));
    geom.faces.push(new THREE.Face3( 2,  5,  3));
    geom.faces.push(new THREE.Face3( 0,  4, 12));
    geom.faces.push(new THREE.Face3( 4,  1, 10));
    geom.faces.push(new THREE.Face3( 4, 10, 12));
    geom.faces.push(new THREE.Face3(10, 11, 12));
    geom.faces.push(new THREE.Face3( 3,  8,  6));
    geom.faces.push(new THREE.Face3( 5,  7,  9));
    geom.faces.push(new THREE.Face3( 3,  9,  8));
    geom.faces.push(new THREE.Face3( 5,  9,  3));
    geom.faces.push(new THREE.Face3( 0, 12, 13));
    geom.faces.push(new THREE.Face3(12, 15, 13));
    geom.faces.push(new THREE.Face3(13, 15, 14));
    geom.faces.push(new THREE.Face3(14, 15, 16));
    geom.faces.push(new THREE.Face3(15, 17, 16));
    geom.faces.push(new THREE.Face3(16, 17, 21));
    geom.faces.push(new THREE.Face3(17, 18, 21));
    geom.faces.push(new THREE.Face3(18, 22, 21));
    geom.faces.push(new THREE.Face3(18, 19, 22));
    geom.faces.push(new THREE.Face3(19, 23, 22));
    geom.faces.push(new THREE.Face3(22, 23, 24));
    geom.faces.push(new THREE.Face3( 2, 24, 23));
    geom.faces.push(new THREE.Face3(22, 24, 25));
    geom.faces.push(new THREE.Face3(21, 22, 25));
    geom.faces.push(new THREE.Face3(10, 20, 11));
    geom.faces.push(new THREE.Face3(12, 15, 18));
    geom.faces.push(new THREE.Face3(15, 18, 17));
    geom.faces.push(new THREE.Face3(11, 20, 12));
    geom.faces.push(new THREE.Face3(12, 20, 18));
    geom.faces.push(new THREE.Face3(18, 20, 19));
    geom.faces.push(new THREE.Face3(13, 14, 16));
    geom.faces.push(new THREE.Face3(13, 16, 25));
    geom.faces.push(new THREE.Face3(16, 21, 25));
    geom.faces.push(new THREE.Face3( 0, 13, 25));
    geom.faces.push(new THREE.Face3( 4,  0, 25));
    geom.faces.push(new THREE.Face3( 5,  4, 25));
    geom.faces.push(new THREE.Face3( 7,  5, 25));
    geom.faces.push(new THREE.Face3( 1, 20, 10));
    geom.faces.push(new THREE.Face3( 1, 19, 20));
    geom.faces.push(new THREE.Face3( 1,  2, 19));
    geom.faces.push(new THREE.Face3( 2, 23, 19));
    geom.faces.push(new THREE.Face3( 2, 26, 24));
    geom.faces.push(new THREE.Face3( 2,  3, 26));
    geom.faces.push(new THREE.Face3(24, 26, 27));
    geom.faces.push(new THREE.Face3(24, 27, 25));
    geom.faces.push(new THREE.Face3(25, 27, 28));
    geom.faces.push(new THREE.Face3( 9,  7, 28));
    geom.faces.push(new THREE.Face3( 9, 28, 29));
    geom.faces.push(new THREE.Face3( 8,  9, 29));
    geom.faces.push(new THREE.Face3(28, 30, 29));
    geom.faces.push(new THREE.Face3(27, 30, 28));
    geom.faces.push(new THREE.Face3( 8, 29, 30));
    geom.faces.push(new THREE.Face3( 3,  6, 32));
    geom.faces.push(new THREE.Face3( 3, 32, 26));
    geom.faces.push(new THREE.Face3( 6,  8, 32));
    geom.faces.push(new THREE.Face3( 8, 31, 32));
    geom.faces.push(new THREE.Face3(27, 32, 31));
    geom.faces.push(new THREE.Face3(27, 31, 30));
    geom.faces.push(new THREE.Face3(26, 32, 27));
    geom.faces.push(new THREE.Face3( 8, 30, 31));
    geom.faces.push(new THREE.Face3( 7, 25, 28));
    geom.faces.push(new THREE.Face3(12, 17, 15));
    geom.faces.push(new THREE.Face3(12, 18, 17));
    geom.computeFaceNormals();
    return geom;
}

function makeMagnetiteVein(mat) {
    var tubeCapGeom = new THREE.CylinderGeometry(1.5, 1.5, 2.5, 12, 1);
    var tubeBodyGeom = new THREE.CylinderGeometry(1, 1, 36, 12, 1, true);
    var anchorGeom = new THREE.BoxGeometry( 5, 5, 0.5 );

    var tubeCap  = makeCylinderMesh(tubeCapGeom, pvcMat, 10, 0.5, 0.1);
    var tubeBody = makeCylinderMesh(tubeBodyGeom, pvcMat, 50, 0.5, 0.1);
    var anchor   = makeBoxMesh(anchorGeom, mat, 20, 0.5, 0.1);

    anchor.castShadow = useShadows;
    anchor.receiveShadow = useShadows;
    anchor.translateY( 6.5 );
    anchor.translateZ(-1.25);
    
    tubeCap.castShadow = useShadows;
    tubeCap.receiveShadow = useShadows;
    tubeCap.translateY(-18 );
    //tubeCap.material.wireframe = true;
    
    tubeBody.castShadow = useShadows;
    tubeBody.receiveShadow = useShadows;
    //tubeBody.material.wireframe = true;
    
    tubeBody.add(tubeCap);
    tubeBody.add(anchor);
    return tubeBody;
}

// Make and add the magnetite pieces (golf balls)
function addMagnetitePieces(section) {
    magnetitePieces[section] = [];
    magnetiteVein[section].userData.pieces = [];
    var phi = section*Math.PI/2;
    for (var i=0; i<20; ++i) {
        var sphereGeom = new THREE.SphereGeometry( 0.85, 12, 8 );
        var sphere = makeSphereMesh( sphereGeom, whiteMat, 10, 0.5, 0.4 );
        if (true) {
            // Position with respect to the magnetite vein
            sphere.translateY( -18 + 1.7*i );
            if (usePhysics) {
                sphere.setLinearFactor(new THREE.Vector3(0,0,0));
                sphere.setAngularFactor(new THREE.Vector3(0,0,0));
                sphere.setLinearVelocity(new THREE.Vector3(0,0,0));
                sphere.setAngularVelocity(new THREE.Vector3(0,0,0));
            }
            magnetiteVein[section].add(sphere);
            magnetiteVein[section].userData.pieces.push(sphere);
        }
        else {
            // Position with respect to the global scene
            sphere.rotateOnAxis( zAxis, phi );
            sphere.translateX( -18.625 );
            sphere.translateY( -130.875 + 1.7*i );
            sphere.translateZ( 9.5 );
            if (usePhysics) {
                sphere.setLinearFactor(new THREE.Vector3(0,0,0));
                sphere.setAngularFactor(new THREE.Vector3(0,0,0));
                sphere.setLinearVelocity(new THREE.Vector3(0,0,0));
                sphere.setAngularVelocity(new THREE.Vector3(0,0,0));
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
    var baseGeom        = new THREE.BoxGeometry(3.5, 12, 1.5);
    var sideGeom       = new THREE.BoxGeometry(0.5, 12, 8.25);
    var endGeom        = makeCustomBoard(
        [ -2.25, -4.4375, -2.25, -4.4375,  2.25,  4.4375,  2.25,  4.4375 ],
        [ -0.25, -0.2500,  0.25,  0.2500, -0.25, -0.2500,  0.25,  0.2500 ],
        [ -4.00,  4.0000, -4.00,  4.0000, -4.00,  4.0000, -4.00,  4.0000 ]
    );
    var base        = makeBoxMesh( baseGeom,       mat );
    var side1       = makeBoxMesh( sideGeom,       mat );
    var side2       = makeBoxMesh( sideGeom,       mat );
    var end1        = makeBoxMesh( endGeom,       mat );
    var end2        = makeBoxMesh( endGeom,       mat );
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
    
    end1.castShadow = useShadows;
    end1.receiveShadow = useShadows;
    end1.translateY( 6.25 );
    end1.translateZ( 3.46875 );
    
    end2.castShadow = useShadows;
    end2.receiveShadow = useShadows;
    end2.translateY( -6.25 );
    end2.translateZ( 3.46875 );

    base.add(side1);
    base.add(side2);
    base.add(end1);
    base.add(end2);
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
                crystal.setLinearFactor(new THREE.Vector3(0,0,0));
                crystal.setAngularFactor(new THREE.Vector3(0,0,0));
                crystal.setLinearVelocity(new THREE.Vector3(0,0,0));
                crystal.setAngularVelocity(new THREE.Vector3(0,0,0));
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
