function addCoalPieces(section) {
    coalPieces[section] = [];
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
                mesh.setLinearFactor(new THREE.Vector3(0,0,0));
                mesh.setAngularFactor(new THREE.Vector3(0,0,0));
                mesh.setLinearVelocity(new THREE.Vector3(0,0,0));
                mesh.setAngularVelocity(new THREE.Vector3(0,0,0));
                coalChute[section].add(mesh);
            }
            else {
                // Positioning relative to game field
                mesh.rotateOnAxis( zAxis, phi );
                mesh.translateZ( 32.5 );
                mesh.translateX( -72.75 + k*2 );
                mesh.translateY( -107.5125 + j*4 );
                scene.add(mesh);
                coalPieces[section][j*3+k] = mesh;
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
