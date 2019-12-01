
import { readFile } from 'fs';

function fuel(moduleMass: number): number {

    return Math.floor(moduleMass / 3) - 2;
}
console.log(1969, fuel(1969));
console.log(100756, fuel(100756));

function sum(a: number, b: number) {
    return a + b;
}

readFile('data/modules.data', (err, data: Buffer) => {
    if (err) throw err;

    const modules = data.toString().split("\n").map(val => parseInt(val));

    const fuels = modules.map(fuel).reduce(sum, 0);
    console.log('fuels', fuels);
});
