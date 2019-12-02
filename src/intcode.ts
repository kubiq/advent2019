
import { readFile } from 'fs';

function doInstruction(opcode: number, aPosition: number, bPosition: number, resultPosition: number) {
    let res;

    if (opcode === 1) {
        // res = sum(instructions[instruction[1]], instructions[instruction[2]]);
    }
}

function sum(a: number, b: number): number {
    return a + b;
}

function multi(a: number, b: number): number {
    return a * b;
}

readFile('data/opcodes.data', (err, data: Buffer) => {
    if (err) throw err;

    const instructions = data.toString().split(",").map(val => parseInt(val));
    console.log('length', instructions.length);

    let operation = instructions[0];
    let instructionPointer = 0;

    instructions[1] = 12;
    instructions[2] = 2;

    do {
        const instruction = instructions.slice(instructionPointer, instructionPointer + 4);
        console.log('instruction', instructionPointer, instruction);

        const resultPosition = instruction[3];

        let res;
        if (operation === 1) {
            res = sum(instructions[instruction[1]], instructions[instruction[2]]);
            instructions[resultPosition] = res;

        } else if (operation === 2) {
            res = multi(instructions[instruction[1]], instructions[instruction[2]]);
            instructions[resultPosition] = res;
        } else if (operation === 99) {
            console.log('end' );
            // instructions[1] = 12;
            // instructions[2] = 2;
        }

        instructionPointer = instructionPointer + 4;
        operation = instructions[instructionPointer];

    } while (operation !== 99);

    // for (let i = 0, len = instructions.length; i < len; i = i + 4) {
    //
    // }



    console.log('instructions', instructions);

});

