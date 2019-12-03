import { promises } from 'fs';

interface IPoint {
  x: number;
  y: number;
}

interface IWire {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  parent: IWire | null;
}

class Circuit {

  private readonly paths: IWire[][];
  private readonly points: Map<string, number> = new Map();

  constructor(paths: string[][]) {

    this.paths = paths.map(path => {
      let x = 0;
      let y = 0;
      let parent: IWire | null = null;

      return path.filter(Boolean).map(step => {
        let startX = x;
        let startY = y;
        [x, y] = parseStep(x, y, step);

        const wire = {x1: startX, y1: startY, x2: x, y2: y, parent};

        parent = wire;
        return wire;
      });

    }).filter(path => path.length);

    const path1 = this.paths[0];
    const path2 = this.paths[1];
    setPoints(path1, path2, this.points);

    function setPoints(path1: IWire[], path2: IWire[], pointsMap) {
      for (let i = 0; i < path2.length; i++) {
        let wire = path2[i];

        path1.forEach((usedWire) => {
          const intersection = intersectPoint(usedWire, wire);
          if (intersection && intersection.x !== 0 && intersection.y !== 0) {
            const wire1Sprunikem = {x1: wire.parent.x2, y1: wire.parent.y2, x2: intersection.x, y2: intersection.y, parent: wire.parent};
            const wire2Sprunikem = {x1: usedWire.parent.x2, y1: usedWire.parent.y2, x2: intersection.x, y2: intersection.y, parent: usedWire.parent};
            let newValue = wireLength(wire1Sprunikem) + wireLength(wire2Sprunikem);
            if (pointsMap.has(mapKey(intersection))) {
              const oldValue = pointsMap.get(mapKey(intersection));
              newValue = newValue < oldValue ? newValue : oldValue;
            }
            pointsMap.set(mapKey(intersection), newValue)
          }
        });
      }
    }

  }

  getShortestPath(): number {
    return Array.from(this.points.values()).sort(compareInt).shift()
  }

  getClosestPoint(): number {

    function absSum(a: number, b: number) {
      return Math.abs(a) + Math.abs(b);
    }
    return Array.from(this.points.keys()).map(key => key.split(':').map(n => parseInt(n))
        .reduce(absSum, 0))
        .sort(compareInt)
        .shift()
  }

}

function mapKey(point: IPoint) {
  return `${point.x}:${point.y}`
}

function compareInt(a: number, b: number) {
  return a < b ? -1 : 1;
}

function intersectPoint(a: IWire, b: IWire): IPoint | false {
  return intersect(a.x1, a.y1, a.x2, a.y2, b.x1, b.y1, b.x2, b.y2);
}

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): IPoint | false {

  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  // Lines are parallel
  if (denominator === 0) {
    return false;
  }

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  // Return a object with the x and y coordinates of the intersection
  let x = x1 + ua * (x2 - x1);
  let y = y1 + ua * (y2 - y1);

  return {x, y};
}

function parseStep(startX: number, startY: number, val: string): [number, number] {

  const direction = val.slice(0, 1);
  const distance = parseInt(val.slice(1));

  switch (direction) {

    case 'U':
      return [startX, startY + distance];
    case 'D':
      return [startX, startY - distance];
    case 'L':
      return [startX - distance, startY];
    case 'R':
      return [startX + distance, startY];
    default:
      throw new Error('unknown direction' + direction);
  }
}

function wireLength({x1, y1, x2, y2, parent}: IWire): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2) + (parent ? wireLength(parent) : 0)
}

promises.readFile('data/wires.data')
    .then((data: Buffer) => {
      const wiresData = data.toString().split('\n');
      const paths: string[][] = wiresData.map(wire => wire.split(','));

      const circuit = new Circuit(paths);

      console.log('closest point', circuit.getClosestPoint());
      console.log('shortest path', circuit.getShortestPath());

    })
    .catch(err => {
      throw err;
    });

