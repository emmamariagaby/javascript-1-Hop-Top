class CollisionDetection {
  playerCollidedWithBlock(
    { pos: { x: px, y: py }, radius }: Player,
    { pos: { x: bx, y: by }, width: bWidth, height: bHeight }: Block
  ) : boolean {
    let testX: number = px;
    let testY: number = py;
    // which edge is closest?
    // test left edge
    if (px < bx) {
      testX = bx;
 
    } else if (px > bx + bWidth) {
      testX = bx + bWidth; // right edge
    
    }
    // top edge
    if (py < by) {
      testY = by;
 
    }
    else if (py > by + bHeight) {
      testY = by + bHeight; // bottom edge

    }

    // get distance from closest edges
    const distance = dist(px, py, testX, testY);

    return distance <= radius 
  }
}

