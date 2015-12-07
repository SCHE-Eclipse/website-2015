function BezierCurve(b) {
    this.k = b.length;
    this.b = b;
}
// Return the evaluated Bezier curve and it's derivative
BezierCurve.prototype.evaluate = function(t) {
    var u = [ (1-t), t ], du = [ -1, 1 ];
    var b = [], db = [];
    for (var p=0; p<this.k-1; ++p) {
        db[p] = du[0]*this.b[p] + du[1]*this.b[p+1];
        b[p] = u[0]*this.b[p] + u[1]*this.b[p+1];
    }
    //console.log("b:", b, "db:", db);
    for (var m=this.k-2; m>=0; --m) {
        for (var p=0; p<m; ++p) {
            db[p] = du[0]*b[p] + u[0]*db[p] + du[1]*b[p+1] + u[1]*db[p+1];
            b[p] = u[0]*b[p] + u[1]*b[p+1];
        }
    }
    return [ b[0], db[0] ];
};
