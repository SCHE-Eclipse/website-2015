//--------------------------------------------------------------------
// Constructor - Creates individual pieces
//--------------------------------------------------------------------
function LimestoneAggregate(enablePhysics, enableShadows) {
    this.physics = ( enablePhysics === undefined ? usePhysics :
                     enablePhysics && usePhysics );
    this.shadows = ( enableShadows === undefined ? useShadows :
                     enableShadows && useShadows );
    if (this.physics) {
        this.mesh = new Physijs.CylinderMesh( this.geometry,
                                              this.substance,
                                              this.mass );
    }
    else {
        this.mesh = new THREE.Mesh( this.geometry,
                                    this.material );
    }
    this.mesh.castShadow = this.shadows;
    this.mesh.receiveShadow = this.shadows;
}
//--------------------------------------------------------------------
// The prototype holds shared properties
//--------------------------------------------------------------------
LimestoneAggregate.prototype.mass = 5;
LimestoneAggregate.prototype.friction = 0.8;
LimestoneAggregate.prototype.restitution = 0.4;
LimestoneAggregate.prototype.geometry = new THREE.CylinderGeometry(
    2.5, 2.5, 4.5, 16
);
LimestoneAggregate.prototype.material = new THREE.MeshLambertMaterial(
    { color: "gray" }
);
LimestoneAggregate.prototype.substance = Physijs.createMaterial(
    LimestoneAggregate.prototype.material,
    LimestoneAggregate.prototype.friction,
    LimestoneAggregate.prototype.restitution
);
