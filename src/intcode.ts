
import { readFile } from 'fs';

function doInstruction(operation: number, noun: number, verb: number) {

    if (operation === 1) {
        return sum(noun, verb);
    } else {
        return multi(noun, verb);
    }
}

function storeResult(memory: number[], position: number, result: number) {
    const newMemory = [...memory];
    newMemory[position] = result;
    return newMemory;
}

function sum(a: number, b: number): number {
    return a + b;
}

function multi(a: number, b: number): number {
    return a * b;
}

function checkResult(noun: number, verb: number, result: number) {
    if (result === 19690720) {
        throw Error('result is ' + (noun * 100 + verb));
    }
}

const MAX_OPCODE = 99;

readFile('data/opcodes.data', (err, data: Buffer) => {
    if (err) throw err;

    const originalMemory = data.toString().split(",").map(val => parseInt(val));

    for (let noun = 0, len = MAX_OPCODE; noun <= len; noun++) {
        for (let verb = 0, len = MAX_OPCODE; verb <= len; verb++) {

            let memory = [...originalMemory];
            let operation = memory[0];
            let instructionPointer = 0;
            memory[1] = noun;
            memory[2] = verb;
            let result;

            do {
                const instruction = memory.slice(instructionPointer, instructionPointer + 4);

                const resultPosition = instruction[3];

                result = doInstruction(operation, memory[instruction[1]], memory[instruction[2]]);
                memory = storeResult(memory, resultPosition, result);

                instructionPointer = instructionPointer + 4;
                operation = memory[instructionPointer];
                result = memory[0];

            } while (operation !== 99);

            checkResult(noun, verb, result);
        }
    }

});

