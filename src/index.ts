
import { readFile } from 'fs';

function fuel(mass: number): number {
    const fuelForMass = Math.floor(mass / 3) - 2;

    return fuelForMass > 0 ? fuelForMass + fuel(fuelForMass) : 0;
}

function sum(a: number, b: number) {
    return a + b;
}

readFile('data/modules.data', (err, data: Buffer) => {
    if (err) throw err;

    const modules = data.toString().split("\n").map(val => parseInt(val));

    const fjul = modules.map(fuel).reduce(sum, 0);
    console.log('Total Fuel', fjul);
});
