import { promises } from 'fs';

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

function checkResult(result: number) {
  return result === 19690720;
}

function calculateProgram(memory: number[], noun: number, verb: number) {

  memory = [...memory];
  let operation = memory[0];
  let instructionPointer = 0;
  let result = null;
  memory[1] = noun;
  memory[2] = verb;

  do {
    const instruction = memory.slice(instructionPointer, instructionPointer + 4);

    const resultPosition = instruction[3];

    result = doInstruction(operation, memory[instruction[1]], memory[instruction[2]]);
    memory = storeResult(memory, resultPosition, result);

    instructionPointer = instructionPointer + 4;
    operation = memory[instructionPointer];

  } while (operation !== NOOP);

  return result;
}

const NOOP = 99;
const MAX_OPCODE = 99;

promises.readFile('data/opcodes.data')
    .then((data: Buffer) => {
      const memory = data.toString().split(',').map(val => parseInt(val));

      let noun = 0;
      let verb = 0;
      let result = null;
      do {
        verb = 0;
        do {
          result = calculateProgram(memory, noun, verb);
          if (!checkResult(result)) {
            verb++;
          }
        } while (verb <= MAX_OPCODE && !checkResult(result));

        if (!checkResult(result)) {
          noun++;
        }
      } while (noun <= MAX_OPCODE && !checkResult(result));

      if (checkResult(result)) {
        console.log('Program result is', noun * 100 + verb);
      } else {
        console.log('no result found');
      }

    })
    .catch(err => {
      throw err;
    });

