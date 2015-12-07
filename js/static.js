//====================================================================
// The geometry described in this file are static. They are not
// expected to move at any point during the simulation, but may be
// interacted with by other dynamic objects.
//====================================================================

function makeStaticArena() {
    // Add the arena floor
    addFloor();
    
    // Make and add the spodumene tower to the center of the arena
    spodumeneTower = makeSpodumeneTower();
    scene.add( spodumeneTower );

    // Add the walls, gates, and other static elements to each of the
    // sections
    var geom, mesh;
    for (var i=0; i<4; ++i) {
        var phi = i*Math.PI/2;

        addWalls(i);
        addGates(i);

        //--------------------
        // GROUND LEVEL
        //--------------------
        
        // Scoring bin supports
        var binSupport = makeScoringBinSupport( colorMats[i] );
        binSupport.rotateOnAxis( zAxis, phi );
        binSupport.translateX( -128.625 );
        binSupport.translateY( -108.875 );
        scene.add( binSupport );
    
        // Add all scoring bins for this section
        scoringBins[i] = [];
        for (var j=0; j<5; ++j) {
            var bin = makeScoringBin( colorMats[i] );
            bin.rotateOnAxis( zAxis, phi );
            bin.translateX( -136.1 );
            bin.translateY( -135.1 + j*13.1);
            scene.add( bin );
            scoringBins[i][j] = bin;
        }
        
        // Spare parts rack
        var rack = makeSparePartsRack(colorMats[i]);
        rack.rotateOnAxis(zAxis, phi);
        rack.translateX(-86.528 );
        rack.translateY(-93.5125 );
        rack.translateZ( 0.375 );
        scene.add(rack);
        sparePartsRack[i] = rack;
    
        //--------------------
        // SUBLEVEL 1
        //--------------------
        
        // Support tower for coal chute
        var coalTower = makeCoalTower(colorMats[i]);
        coalTower.rotateOnAxis( zAxis, phi );
        coalTower.translateX(-75.25 );
        coalTower.translateY(-93.5125 );
        coalTower.translateZ( 30.375 );
        scene.add( coalTower );

        // Air Duct
        var duct = makeAirDuct(colorMats[i]);
        duct.rotateOnAxis( zAxis, phi );
        duct.translateX(-36.375 );
        duct.translateY(-136.632);
        scene.add( duct );
        // Magnetite vein base
        var magBase = makeMagnetiteBase(colorMats[i]);
        magBase.rotateOnAxis( zAxis, phi );
        magBase.translateX( -18.625 );
        //magBase.translateY( -103.625 );
        magBase.translateY( -109.875 );
        magBase.translateZ( 0.375 );
        scene.add( magBase );

        //--------------------
        // SUBLEVEL 2
        //--------------------
        
	      // Broken pipe platform / Bauxite vein
        var platform = makeBrokenPipe(colorMats[i]);
        platform.rotateOnAxis( zAxis, phi );
        platform.translateX( 36 );
        platform.translateY( -123.6 );
        scene.add(platform);

        //--------------------
        // SUBLEVEL 3
        //--------------------
        
        // Core Sample Holder
        var csh = makeCoreSampleHolder(colorMats[i]);
        csh.rotateOnAxis( zAxis, phi );
        csh.translateX( 4.25 );
        csh.translateY( -43.5 );
        scene.add(csh);

    }

}

//--------------------------------------------------------------------
// Add the arena floor and all taped off boxes
function addFloor() {
    // FLOOR
    var floorGeom = new THREE.BoxGeometry( 284.75, 284.75, 1.0);
    var floorMesh = makeBoxMesh( floorGeom, floorMat, 0 );
    // Move floorMesh down so that it's top is at z=0
    floorMesh.translateZ( -0.5 );
    floorMesh.receiveShadow = useShadows;

    // COLOR TAPE BOXES
    for (var i=0; i<4; ++i) {
        var phi = i*Math.PI/2;

        // Robot Starting Box
        var rsb = makeFloorBox( 24, 24, colorMats[i] );
        rsb.rotateOnAxis( zAxis, phi );
        rsb.translateX( -129.625 );
        rsb.translateY( -60.75 );
        rsb.translateZ( 0.5 );
        floorMesh.add( rsb );

        // Return Box
        var rb = makeFloorBox( 24, 24, colorMats[i] );
        rb.rotateOnAxis( zAxis, phi );
        rb.translateX( 35.25 );
        rb.translateY( -36 );
        rb.translateZ( 0.5 );
        floorMesh.add( rb );

        // Driver Box
        var db = makeFloorBox( 48, 24, colorMats[i] );
        db.rotateOnAxis( zAxis, phi );
        db.translateX( -15 );
        db.translateY( -154.375 );
        db.translateZ( 0.5 );
        floorMesh.add( db );

        // Spotter Box
        var sb = makeFloorBox( 24, 92.875, colorMats[i] );
        sb.rotateOnAxis( zAxis, phi );
        sb.translateX( -154.375 );
        sb.translateY( -95.1875 );
        sb.translateZ( 0.5 );
        floorMesh.add( sb );

        // Copper Cart Box
        var ccb = makeFloorBox( 8.5, 17, colorMats[i] );
        ccb.rotateOnAxis( zAxis, phi );
        ccb.translateX( -0.375 );
        ccb.translateY( -117.125 );
        ccb.translateZ( 0.5 );
        floorMesh.add( ccb );
    }
    scene.add(floorMesh);
}

//--------------------------------------------------------------------
// Taped off boxes on the arena floor
function makeFloorBox( outerWidth, outerLength, mat) {
    var box = new THREE.Object3D();
    var geom1 = new THREE.BoxGeometry( outerWidth, 2, 0.25 );
    var geom2 = new THREE.BoxGeometry( 2, outerLength, 0.25 );
    var side1a = new THREE.Mesh( geom1, mat );
    var side2a = new THREE.Mesh( geom2, mat );
    var side1b = side1a.clone();
    var side2b = side2a.clone();
    var halfWidth = outerWidth/2 - 1;
    var halfLength = outerLength/2 - 1;
    side1a.translateY(-halfLength);
    side1b.translateY( halfLength);
    side2a.translateX(-halfWidth);
    side2b.translateX( halfWidth);
    side1a.receiveShadow = useShadows;
    side1b.receiveShadow = useShadows;
    side2a.receiveShadow = useShadows;
    side2b.receiveShadow = useShadows;
    box.add(side1a);
    box.add(side1b);
    box.add(side2a);
    box.add(side2b);
    box.receiveShadow = useShadows;
    return box;
}

//--------------------------------------------------------------------
// Add all of the walls for the given section
function addWalls(i) {
    var phi = i*Math.PI/2;
    // Outside wall
    geom = new THREE.BoxGeometry( 284, 0.75, 3.5 );
    mesh = makeBoxMesh( geom, woodMat, 0 );
    mesh.castShadow = useShadows;
    mesh.receiveShadow = useShadows;
    mesh.rotateOnAxis( zAxis, phi );
    mesh.translateX(0.375);
    mesh.translateY(-142);
    mesh.translateZ(1.75);
    scene.add( mesh );

    // Interior wall (ground level, sublevel 1, 2, and 3)
    geom = new THREE.BoxGeometry( 164.125, 0.75, 3.5 );
    mesh = makeBoxMesh( geom, woodMat, 0 );
    mesh.castShadow = useShadows;
    mesh.receiveShadow = useShadows;
    mesh.rotateOnAxis( zAxis, phi );
    mesh.translateX(-59.5625);
    mesh.translateY(-48.375);
    mesh.translateZ(1.75);
    scene.add( mesh );

    // Interior wall (ground level and sublevel 1)
    geom = new THREE.BoxGeometry( 0.75, 61.375, 3.5 );
    mesh = makeBoxMesh( geom, woodMat, 0 );
    mesh.castShadow = useShadows;
    mesh.receiveShadow = useShadows;
    mesh.rotateOnAxis( zAxis, phi );
    mesh.translateX(-78.375);
    mesh.translateY(-79.4375);
    mesh.translateZ(1.75);
    scene.add( mesh );

    // Interior wall (sublevel 1 and 2)
    geom = new THREE.BoxGeometry( 0.75, 58.125, 3.5 );
    mesh = makeBoxMesh( geom, woodMat, 0 );
    mesh.castShadow = useShadows;
    mesh.receiveShadow = useShadows;
    mesh.rotateOnAxis( zAxis, phi );
    mesh.translateX(-15);
    mesh.translateY(-112.5625);
    mesh.translateZ(1.75);
    scene.add( mesh );

    // Interior wall (Tunnel, sublevel 2 and 3)
    geom = new THREE.BoxGeometry( 16, 0.75, 3.5 );
    mesh = makeBoxMesh( geom, colorMats[i], 0 );
    mesh.castShadow = useShadows;
    mesh.receiveShadow = useShadows;
    mesh.rotateOnAxis( zAxis, phi );
    mesh.translateX(-15);
    mesh.translateY(-83.125);
    mesh.translateZ(1.75);
    scene.add( mesh );

    // Interior wall (Tunnel, sublevel 1)
    geom = new THREE.BoxGeometry( 0.75, 12, 3.5 );
    mesh = makeBoxMesh( geom, colorMats[i], 0 );
    mesh.castShadow = useShadows;
    mesh.receiveShadow = useShadows;
    mesh.rotateOnAxis( zAxis, phi );
    mesh.translateX(-34.125);
    mesh.translateY(-54.75);
    mesh.translateZ(1.75);
    scene.add( mesh );

    // Interior wall (Tunnel, sublevel 2)
    geom = new THREE.BoxGeometry( 0.75, 12, 3.5 );
    mesh = makeBoxMesh( geom, colorMats[i], 0 );
    mesh.castShadow = useShadows;
    mesh.receiveShadow = useShadows;
    mesh.rotateOnAxis( zAxis, phi );
    mesh.translateX(4.125);
    mesh.translateY(-54.75);
    mesh.translateZ(1.75);
    scene.add( mesh );
}

//--------------------------------------------------------------------
// Add all of the gates for the given section
function addGates(i) {
    var phi = i*Math.PI/2;
    
    // Gate 1 (ground level / sublevel 1)
    var gate1 = makeGate( 30, 24, colorMats[i] );
    gate1.rotateOnAxis( zAxis, phi );
    gate1.translateX( -77 );
    gate1.translateY( -125.8875 );
    scene.add( gate1 );

    // Gate 2 (sublevel 1 / tunnel)
    var gate2 = makeGate( 24, 24, colorMats[i] );
    gate2.rotateOnAxis( zAxis, phi );
    gate2.translateX( -28.75 );
    gate2.translateY( -72.125 );
    gate2.rotateOnAxis( zAxis, Math.atan2(11.5, 22.75) );
    gate2.translateX( -1.75 );
    scene.add( gate2 );
    
    // Gate 3 (tunnel / sublevel 2)
    var gate3 = makeGate( 24, 24, colorMats[i] );
    gate3.rotateOnAxis( zAxis, phi );
    gate3.translateX( -1.25 );
    gate3.translateY( -72.125 );
    gate3.rotateOnAxis( zAxis, -Math.atan2(11.5, 22.75) );
    gate3.translateX( 1.75 );
    scene.add( gate3 );

    // Gate 4 (sublevel 2 / sublevel 3)
    var gate4 = makeGate( 24, 20, colorMats[i] );
    gate4.rotateOnAxis( zAxis, phi );
    gate4.translateX( 35.25 );
    gate4.translateY(-49.75 );
    gate4.rotateOnAxis( zAxis, Math.PI/2 );
    scene.add( gate4 );
}

//--------------------------------------------------------------------
// Make a single gateway with the provided dimensions and material
function makeGate( innerWidth, innerHeight, mat ) {
    var halfWidth = 0.5*innerWidth + 0.375;
    var halfHeight = 0.5*innerHeight + 0.375;

    var horizontalGeom = new THREE.BoxGeometry( 3.5, innerWidth + 1.5, 0.75 );
    var verticalGeom = new THREE.BoxGeometry( 3.5, 0.75, innerHeight )
    
    var bot = makeBoxMesh( horizontalGeom, mat, 0 );
    var top = makeBoxMesh( horizontalGeom, mat, 0 );
    var left = makeBoxMesh( verticalGeom, mat, 0 );
    var right = makeBoxMesh( verticalGeom, mat, 0 );
    
    bot.translateZ( 0.375 );
    bot.castShadow = useShadows;
    bot.receiveShadow = useShadows;
    
    top.translateZ( innerHeight + 0.75 );
    top.castShadow = useShadows;
    top.receiveShadow = useShadows;
    
    left.translateY(-halfWidth);
    left.translateZ( halfHeight);
    left.castShadow = useShadows;
    left.receiveShadow = useShadows;
    
    right.translateY( halfWidth);
    right.translateZ( halfHeight);
    right.castShadow = useShadows;
    right.receiveShadow = useShadows;
    
    bot.add(top);
    bot.add(left);
    bot.add(right);
    return bot;
}

//====================================================================
// Ground Level
//--------------------------------------------------------------------

//--------------------------------------------------------------------
// Make the braces that hold the scoring bins in place
function makeScoringBinSupport(mat) {
    var frontBraceGeom  = new THREE.BoxGeometry(0.75, 65.5, 1.5);
    var sideBraceGeom   = new THREE.BoxGeometry(13.375, 0.75, 3.5);
    
    var frontBrace  = makeBoxMesh( frontBraceGeom, mat, 0 );
    var sideBrace   = makeBoxMesh( sideBraceGeom,  mat, 0 );
    
    frontBrace.translateZ( 0.75 );
    frontBrace.castShadow = useShadows;
    frontBrace.receiveShadow = useShadows;
    
    sideBrace.translateX( -6.3125 );
    sideBrace.translateY( 65.5/2 + 0.375 );
    sideBrace.translateZ( 1.00 );
    sideBrace.castShadow = useShadows;
    sideBrace.receiveShadow = useShadows;
    
    frontBrace.add(sideBrace);
    return frontBrace;
}

//--------------------------------------------------------------------
// Make a single scoring bin with the specified material
function makeScoringBin(mat) {
    var baseGeom        = new THREE.BoxGeometry(11, 13, 0.25);
    var frontGeom       = new THREE.BoxGeometry(5, 13, 0.25);
    var backGeom        = new THREE.BoxGeometry(0.75, 11.5, 3.5);
    var sideGeom        = makeCustomBoard(
        [-7.250, -7.250, -7.250, -7.250,  3.750,  7.250,  3.750,  7.250],
        [-0.375, -0.375,  0.375,  0.375, -0.375, -0.375,  0.375,  0.375],
        [-1.750,  1.750, -1.750,  1.750, -1.750,  1.750, -1.750,  1.750]
    );
    
    var base        = makeBoxMesh( baseGeom,    mat, 0 );
    var front       = makeBoxMesh( frontGeom,   mat, 0 );
    var back        = makeBoxMesh( backGeom,    mat, 0 );
    var side1       = makeConvexMesh( sideGeom, mat, 0 );
    var side2       = makeConvexMesh( sideGeom, mat, 0 );
    
    base.castShadow = useShadows;
    base.receiveShadow = useShadows;
    base.translateZ( 0.125);

    front.castShadow = useShadows;
    front.receiveShadow = useShadows;
    front.translateX( 7.268 );
    front.translateZ( 1.625 );
    front.rotateOnAxis( yAxis, -Math.PI/4 );
    base.add(front);

    back.castShadow = useShadows;
    back.receiveShadow = useShadows;
    back.translateX( -5.5 + 0.375 );
    back.translateZ( 1.625 );
    base.add(back);

    side1.castShadow = useShadows;
    side1.receiveShadow = useShadows;
    side1.translateX( 1.75 );
    side1.translateY( -6.125 );
    side1.translateZ( 1.625 );
    base.add(side1);
    
    side2.castShadow = useShadows;
    side2.receiveShadow = useShadows;
    side2.translateX( 1.75 );
    side2.translateY(  6.125 );
    side2.translateZ( 1.625 );
    base.add(side2);

    return base;
}

//--------------------------------------------------------------------
// Make the rack that holds the spare parts
function makeSparePartsRack(mat) {
    var baseGeom = new THREE.BoxGeometry(15.556, 3.5, 0.75);
    var backGeom = new THREE.BoxGeometry(0.75, 17.25, 3.5);
    var shelfGeom = new THREE.BoxGeometry(5.5, 0.75, 1.5);
    var sideGeom = makeCustomBoard(
        [-10.607, -15.556, -10.607, -15.556,  0.000,  0.000,  0.000,  0.000],
        [ -0.375,  -0.375,   0.375,   0.375, -0.375, -0.375,  0.375,  0.375],
        [  0.000,   0.000,   0.000,   0.000, 10.607, 15.556, 10.607, 15.556]
    );
    
    var base = makeBoxMesh(baseGeom, mat, 0);
    var back = makeBoxMesh(backGeom, mat, 0);
    var side1 = makeConvexMesh(sideGeom, mat, 0);
    var side2 = makeConvexMesh(sideGeom, mat, 0);
    var shelf1 = makeBoxMesh(shelfGeom, mat, 0);
    var shelf2 = makeBoxMesh(shelfGeom, mat, 0);
    var shelf3 = makeBoxMesh(shelfGeom, mat, 0);
    var shelf4 = makeBoxMesh(shelfGeom, mat, 0);
    
    base.castShadow = useShadows;
    base.receiveShadow = useShadows;
    
    back.castShadow = useShadows;
    back.receiveShadow = useShadows;
    back.translateX( 8.153 );
    back.translateZ(13.431 );
    
    side1.castShadow = useShadows;
    side1.receiveShadow = useShadows;
    side1.translateX( 7.778 );
    side1.translateY(-2.125 );
    side1.translateZ(-0.375 );
    
    side2.castShadow = useShadows;
    side2.receiveShadow = useShadows;
    side2.translateX( 7.778 );
    side2.translateY( 2.125 );
    side2.translateZ(-0.375 );
    
    shelf1.castShadow = useShadows;
    shelf1.receiveShadow = useShadows;
    shelf1.translateX(-4.244 );
    shelf1.translateY(-2.875 );
    shelf1.translateZ( 2.1 );
    shelf1.rotateOnAxis( yAxis, Math.PI/4 );
    
    shelf2.castShadow = useShadows;
    shelf2.receiveShadow = useShadows;
    shelf2.translateX(-4.244 );
    shelf2.translateY( 2.875 );
    shelf2.translateZ( 2.1 );
    shelf2.rotateOnAxis( yAxis, Math.PI/4 );
    
    shelf3.castShadow = useShadows;
    shelf3.receiveShadow = useShadows;
    shelf3.translateX( 3.181 );
    shelf3.translateY(-2.875 );
    shelf3.translateZ( 9.525 );
    shelf3.rotateOnAxis( yAxis, Math.PI/4 );
    
    shelf4.castShadow = useShadows;
    shelf4.receiveShadow = useShadows;
    shelf4.translateX( 3.181 );
    shelf4.translateY( 2.875 );
    shelf4.translateZ( 9.525 );
    shelf4.rotateOnAxis( yAxis, Math.PI/4 );
    
    base.add(back);
    base.add(side1);
    base.add(side2);
    base.add(shelf1);
    base.add(shelf2);
    base.add(shelf3);
    base.add(shelf4);
    return base;
}

//====================================================================
// SubLevel 1
//--------------------------------------------------------------------
function makeCoalChute(mat) {
    var trayBaseGeom  = new THREE.BoxGeometry(7.5, 33.5, 0.5);
    var trayBackGeom  = new THREE.BoxGeometry(0.75, 33.5, 1.5);
    var trayFrontGeom = new THREE.BoxGeometry(0.75, 33.5, 0.75);
    var traySideGeom  = new THREE.BoxGeometry(6.0, 0.75, 1.5);

    var trayBase  = makeBoxMesh(trayBaseGeom,  mat, 10);
    var trayBack  = makeBoxMesh(trayBackGeom,  mat, 10);
    var trayFront = makeBoxMesh(trayFrontGeom, mat, 10);
    var traySide1 = makeBoxMesh(traySideGeom,  mat, 10);
    var traySide2 = makeBoxMesh(traySideGeom,  mat, 10);

    trayBase.castShadow = useShadows;
    trayBase.receiveShadow = useShadows;
    
    trayBack.castShadow = useShadows;
    trayBack.receiveShadow = useShadows;
    trayBack.translateX(-3.375 );
    trayBack.translateZ( 1 );
    trayBase.add( trayBack );
    
    trayFront.castShadow = useShadows;
    trayFront.receiveShadow = useShadows;
    trayFront.translateX( 3.375 );
    trayFront.translateZ( 0.625 );
    trayBase.add( trayFront );
    
    traySide1.castShadow = useShadows;
    traySide1.receiveShadow = useShadows;
    traySide1.translateY( 16.4 );
    traySide1.translateZ( 1 );
    trayBase.add( traySide1 );
    
    traySide2.castShadow = useShadows;
    traySide2.receiveShadow = useShadows;
    traySide2.translateY(-16.4 );
    traySide2.translateZ( 1 );
    trayBase.add( traySide2 );
    
    return trayBase;
}

function makeCoalTower(mat) {
    var towerTopGeom  = new THREE.BoxGeometry( 3.5, 17.25, 0.75 );
    var towerSideGeom = new THREE.BoxGeometry( 3.5, 0.75, 30 );
    
    var towerTop  = makeBoxMesh(towerTopGeom,  mat, 0);
    var towerSide1= makeBoxMesh(towerSideGeom, mat, 0);
    var towerSide2= makeBoxMesh(towerSideGeom, mat, 0);

    towerTop.castShadow = useShadows;
    towerTop.receiveShadow = useShadows;

    towerSide1.castShadow = useShadows;
    towerSide1.receiveShadow = useShadows;
    towerSide1.translateX( -1 );
    towerSide1.translateY( 8.25);
    towerSide1.translateZ(-15.375);

    towerSide2.castShadow = useShadows;
    towerSide2.receiveShadow = useShadows;
    towerSide2.translateX(-1);
    towerSide2.translateY(-8.25);
    towerSide2.translateZ(-15.375);

    towerTop.add(towerSide1);
    towerTop.add(towerSide2);

    return towerTop;
}

function makeAirDuct(mat) {
    var baseGeom = new THREE.BoxGeometry(  18, 10,  0.5 );
    var topGeom = new THREE.BoxGeometry(  1.5, 10,  1 );
    var backGeom = new THREE.BoxGeometry( 1.5,  1, 10 );
    var sideGeom = new THREE.BoxGeometry( 0.5, 10, 13 );
    var pipeGeom = new THREE.CylinderGeometry( 2, 2, 4, 12 );
    var elbowGeom = new THREE.TorusGeometry( 2.5, 2, 12, 12, Math.PI/2 );
    var couplerGeom = new THREE.CylinderGeometry( 2.25, 2.25, 2, 12 );

    var base  = makeBoxMesh( baseGeom, mat, 0 );
    var top   = makeBoxMesh( topGeom, mat, 0 );
    var back  = makeBoxMesh( backGeom, mat, 0 );
    var side1 = makeBoxMesh( sideGeom, mat, 0 );
    var side2 = makeBoxMesh( sideGeom, mat, 0 );
    var pipe1 = makeCylinderMesh( pipeGeom, whiteMat, 0 );
    var pipe2 = makeCylinderMesh( pipeGeom, whiteMat, 0 );
    var elbow1 = new THREE.Mesh( elbowGeom, whiteMat );
    var elbow2 = new THREE.Mesh( elbowGeom, whiteMat );
    var coupler1 = makeCylinderMesh( couplerGeom, whiteMat, 0 );
    var coupler2 = makeCylinderMesh( couplerGeom, whiteMat, 0 );
    var coupler3 = makeCylinderMesh( couplerGeom, whiteMat, 0 );
    var coupler4 = makeCylinderMesh( couplerGeom, whiteMat, 0 );

    base.castShadow = useShadows;
    top.castShadow = useShadows;
    back.castShadow = useShadows;
    side1.castShadow = useShadows;
    side2.castShadow = useShadows;
    pipe1.castShadow = useShadows;
    pipe2.castShadow = useShadows;
    elbow1.castShadow = useShadows;
    elbow2.castShadow = useShadows;
    coupler1.castShadow = useShadows;
    coupler2.castShadow = useShadows;
    coupler3.castShadow = useShadows;
    coupler4.castShadow = useShadows;

    base.receiveShadow = useShadows;
    top.receiveShadow = useShadows;
    back.receiveShadow = useShadows;
    side1.receiveShadow = useShadows;
    side2.receiveShadow = useShadows;
    pipe1.receiveShadow = useShadows;
    pipe2.receiveShadow = useShadows;
    elbow1.receiveShadow = useShadows;
    elbow2.receiveShadow = useShadows;
    coupler1.receiveShadow = useShadows;
    coupler2.receiveShadow = useShadows;
    coupler3.receiveShadow = useShadows;
    coupler4.receiveShadow = useShadows;

    base.translateZ( 0.25);

    top.translateZ( 12.75 );

    back.translateY(-4.5 );
    back.translateZ( 6.25 );

    side1.translateX(-1 );
    side1.translateZ( 6.75 );

    side2.translateX( 1 );
    side2.translateZ( 6.75 );

    pipe1.translateX(-5.5 );
    pipe1.translateZ( 2.25 );
    pipe1.rotateOnAxis( xAxis, Math.PI/2 );
    
    pipe2.translateX( 5.5 );
    pipe2.translateZ( 2.25 );
    pipe2.rotateOnAxis( xAxis, Math.PI/2 );

    elbow1.translateX(-3 );
    elbow1.translateZ( 5 );
    elbow1.rotateOnAxis( zAxis, Math.PI/2 );
    elbow1.rotateOnAxis( yAxis, -Math.PI/2 );
    
    elbow2.translateX( 3 );
    elbow2.translateZ( 5 );
    elbow2.rotateOnAxis( xAxis, Math.PI/2 );

    coupler1.translateX(-5.5 );
    coupler1.translateZ( 4.25 );
    coupler1.rotateOnAxis( xAxis, Math.PI/2 );
    
    coupler2.translateX( 5.5 );
    coupler2.translateZ( 4.25 );
    coupler2.rotateOnAxis( xAxis, Math.PI/2 );
    
    coupler3.translateX(-2.25 );
    coupler3.translateZ( 7.5 );
    coupler3.rotateOnAxis( zAxis, Math.PI/2 );
    
    coupler4.translateX( 2.25 );
    coupler4.translateZ( 7.5 );
    coupler4.rotateOnAxis( zAxis, Math.PI/2 );
    
    base.add( top );
    base.add( back );
    base.add( side1 );
    base.add( side2 );
    base.add( pipe1 );
    base.add( pipe2 );
    base.add( elbow1 );
    base.add( elbow2 );
    base.add( coupler1 );
    base.add( coupler2 );
    base.add( coupler3 );
    base.add( coupler4 );
    return base;
}

function makeMagnetiteBase(mat) {
    var supportGeom = makeCustomBoard(
        [ -0.375, -0.375, -0.375, -0.375,  0.375,  0.375,  0.375,  0.375 ],
        [ -3.050, -8.000,  0.000,  0.000, -3.050, -8.000,  0.000,  0.000 ],
        [  0.000,  0.000,  3.050,  8.000,  0.000,  0.000,  3.050,  8.000 ]
    );
    var baseGeom = new THREE.BoxGeometry( 5.0, 3.5, 0.75 );
    var topGeom = new THREE.BoxGeometry( 5.0, 0.75, 3.5 );

    var base     = makeBoxMesh(baseGeom, mat, 0);
    var top      = makeBoxMesh(topGeom, mat, 0);
    var support1 = makeConvexMesh(supportGeom, mat, 0);
    var support2 = makeConvexMesh(supportGeom, mat, 0);
    var support3 = makeConvexMesh(supportGeom, mat, 0);
    
    //base.translateY( -6.25 );
    base.castShadow = useShadows;
    base.receiveShadow = useShadows;
    
    //top.translateY( -0.375 );
    //top.translateY( 6.25 );
    top.translateY( 5.875 );
    top.translateZ( 5.875 );
    top.castShadow = useShadows;
    top.receiveShadow = useShadows;
    
    support1.translateX( 2.875 );
    support1.translateY( 6.25 );
    support1.translateZ(-0.375 );
    support1.castShadow = useShadows;
    support1.receiveShadow = useShadows;
    
    support2.translateX(2.875);
    support2.translateY( 6.25 );
    support2.translateZ(-0.375 );
    support2.rotateOnAxis( zAxis, Math.PI );
    support2.castShadow = useShadows;
    support2.receiveShadow = useShadows;
    
    support3.translateX(-2.875);
    support3.translateY( 6.25 );
    support3.translateZ(-0.375 );
    support3.castShadow = useShadows;
    support3.receiveShadow = useShadows;
    
    base.add(top);
    base.add(support1);
    base.add(support2);
    base.add(support3);
    
    return base;
}

//====================================================================
// SubLevel 2
//--------------------------------------------------------------------
function makeBrokenPipe(mat) {
    var baseGeom        = new THREE.BoxGeometry(24, 36, 0.5);
    var frontGeom       = new THREE.BoxGeometry(1.5, 36, 3.5);
    var pipeAdaptor = new THREE.CylinderGeometry(.6, .6, 2.5, 8, 1);
    var pipeGeom = new THREE.CylinderGeometry(0.5, 0.5, 8, 8, 1, true);
    var tapeGeom = new THREE.CylinderGeometry(0.51, 0.51, 1, 8, 1, true);
    var backGeom        = new THREE.BoxGeometry(17.5, 1.5, 3.5);

    var front       = makeBoxMesh(frontGeom, mat, 0 );
    var adp1 = new THREE.Mesh(pipeAdaptor, pvcMat );
    var adp2 = new THREE.Mesh(pipeAdaptor, pvcMat );
    var pipe1 = makeCylinderMesh(pipeGeom, pvcMat, 0);
    var pipe2 = makeCylinderMesh(pipeGeom, pvcMat, 0);
    var base       = makeBoxMesh( baseGeom, mat );
    var back1       = makeBoxMesh( backGeom, mat );
    var back2       = makeBoxMesh( backGeom, mat );
    var tapeMat = new THREE.MeshLambertMaterial( { color: 0x000000 } );
    var tape1 = new THREE.Mesh( tapeGeom, tapeMat ); 
    var tape2 = new THREE.Mesh( tapeGeom, tapeMat ); 
    base.translateZ( 3.75 );
    base.castShadow = useShadows;
    base.receiveShadow = useShadows;

    front.translateX( -6.25 );
    front.translateZ( -2 );
    front.castShadow = useShadows;
    front.receiveShadow = useShadows;

    back1.translateX( 3.25 );
    back1.translateY(-12.25 );
    back1.translateZ( -2 );
    back1.castShadow = useShadows;
    back1.receiveShadow = useShadows;

    back2.translateX( 3.25 );
    back2.translateY( 12.25 );
    back2.translateZ( -2 );
    back2.castShadow = useShadows;
    back2.receiveShadow = useShadows;

    adp1.translateX( -2.5 );
    adp1.translateY( -9 );
    adp1.rotateOnAxis( xAxis, Math.PI/2 );

    adp2.translateX( 2.5 );
    adp2.translateY( 9 );
    adp2.rotateOnAxis( xAxis, Math.PI/2 );

    pipe1.translateX( -2.5 );
    pipe1.translateY( -9 );
    pipe1.translateZ( 4 );
    pipe1.rotateOnAxis( xAxis, Math.PI/2 );
    pipe1.castShadow = useShadows;
    pipe1.receiveShadow = useShadows;

    tape1.translateY( 3.5 );
    pipe1.add( tape1 );

    pipe2.translateX( 2.5 );
    pipe2.translateY( 9 );
    pipe2.translateZ( 4 );
    pipe2.rotateOnAxis( xAxis, Math.PI/2 );
    pipe2.castShadow = useShadows;
    pipe2.receiveShadow = useShadows;

    tape2.translateY( 3.5 );
    pipe2.add( tape2 );

    base.add( adp1 );
    base.add( adp2 );
    base.add( pipe1 );
    base.add( pipe2 );
    base.add( front );
    base.add( back1 );
    base.add( back2 );

    return base;
}

//====================================================================
// SubLevel 3
//--------------------------------------------------------------------
function makeSpodumeneTower() {
    //The base
    var bg = new THREE.BoxGeometry(18,18,3);
    var bm = makeBoxMesh( bg, woodMat, 0 );
    bm.translateZ( 1.5 );
    bm.castShadow = useShadows;
    bm.receiveShadow = useShadows;
    
    //The hinge base
    var hg = new THREE.BoxGeometry(8,8,0.5);
    var hm = makeBoxMesh( hg, woodMat, 0 );
    hm.translateZ( 1.75 );
    hm.castShadow = useShadows;
    hm.receiveShadow = useShadows;
    bm.add( hm );
    
    //The tower itself
    var tg = new THREE.BoxGeometry(3.5,3.5,36)
    var tm = makeBoxMesh( tg, woodMat, 0 );
    tm.translateZ( 19.75 );
    tm.castShadow = useShadows;
    tm.receiveShadow = useShadows;
    bm.add( tm );
    
    return bm;
}

function makeCoreSampleHolder(mat) {
    var baseBackGeom = new THREE.BoxGeometry(1, 9, 0.75);
    var baseOutsideGeom = new THREE.BoxGeometry(2.5, 1.25, 0.75);
    var baseInsideGeom = new THREE.BoxGeometry(2.5, 1.00, 0.75);
    var sideGeom = new THREE.BoxGeometry(2.5, 0.75, 8);
    
    var baseBack = makeBoxMesh( baseBackGeom, mat, 0 );
    var baseOutside1 = makeBoxMesh( baseOutsideGeom, mat, 0 );
    var baseOutside2 = makeBoxMesh( baseOutsideGeom, mat, 0 );
    var baseInside1 = makeBoxMesh( baseInsideGeom, mat, 0 );
    var baseInside2 = makeBoxMesh( baseInsideGeom, mat, 0 );
    var topBack = makeBoxMesh( baseBackGeom, mat, 0 );
    var topOutside1 = makeBoxMesh( baseOutsideGeom, mat, 0 );
    var topOutside2 = makeBoxMesh( baseOutsideGeom, mat, 0 );
    var topInside1 = makeBoxMesh( baseInsideGeom, mat, 0 );
    var topInside2 = makeBoxMesh( baseInsideGeom, mat, 0 );
    var side1 = makeBoxMesh( sideGeom, mat, 0 );
    var side2 = makeBoxMesh( sideGeom, mat, 0 );

    baseBack.translateZ( 0.375 );
    baseBack.castShadow = useShadows;
    baseBack.receiveShadow = useShadows;

    baseOutside1.translateY(-3.875);
    baseOutside1.translateX(-1.75 );
    baseOutside1.castShadow = useShadows;
    baseOutside1.receiveShadow = useShadows;

    baseOutside2.translateY( 3.8755);
    baseOutside2.translateX(-1.75 );
    baseOutside2.castShadow = useShadows;
    baseOutside2.receiveShadow = useShadows;

    baseInside1.translateY(-1.25 );
    baseInside1.translateX(-1.75 );
    baseInside1.castShadow = useShadows;
    baseInside1.receiveShadow = useShadows;

    baseInside2.translateY( 1.25 );
    baseInside2.translateX(-1.75 );
    baseInside2.castShadow = useShadows;
    baseInside2.receiveShadow = useShadows;

    topBack.translateX(-3.5 );
    topBack.translateZ( 8.75 );
    topBack.castShadow = useShadows;
    topBack.receiveShadow = useShadows;

    topOutside1.translateY(-3.875);
    topOutside1.translateX( 1.75 );
    topOutside1.castShadow = useShadows;
    topOutside1.receiveShadow = useShadows;

    topOutside2.translateY( 3.8755);
    topOutside2.translateX( 1.75 );
    topOutside2.castShadow = useShadows;
    topOutside2.receiveShadow = useShadows;

    topInside1.translateY(-1.25 );
    topInside1.translateX( 1.75 );
    topInside1.castShadow = useShadows;
    topInside1.receiveShadow = useShadows;

    topInside2.translateY( 1.25 );
    topInside2.translateX( 1.75 );
    topInside2.castShadow = useShadows;
    topInside2.receiveShadow = useShadows;

    side1.translateX(-1.750 );
    side1.translateY(-4.125 );
    side1.translateZ( 4.375 );
    side1.castShadow = useShadows;
    side1.receiveShadow = useShadows;

    side2.translateX(-1.750 );
    side2.translateY( 4.125 );
    side2.translateZ( 4.375 );
    side2.castShadow = useShadows;
    side2.receiveShadow = useShadows;

    baseBack.add(baseOutside1);
    baseBack.add(baseOutside2);
    baseBack.add(baseInside1);
    baseBack.add(baseInside2);

    topBack.add(topOutside1);
    topBack.add(topOutside2);
    topBack.add(topInside1);
    topBack.add(topInside2);

    baseBack.add(topBack);

    baseBack.add(side1);
    baseBack.add(side2);

    return baseBack;
}
