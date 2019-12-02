import { promises } from 'fs';

function fuel(mass: number): number {
  const fuelForMass = Math.floor(mass / 3) - 2;

  return fuelForMass > 0 ? fuelForMass + fuel(fuelForMass) : 0;
}

function sum(a: number, b: number) {
  return a + b;
}

promises.readFile('data/modules.data')
    .then((data: Buffer) => {

      const modules = data.toString().split('\n').map(val => parseInt(val));

      const fjul = modules.map(fuel).reduce(sum, 0);
      console.log('Total Fuel', fjul);
    })
    .catch(err => {
      throw err;
    });
