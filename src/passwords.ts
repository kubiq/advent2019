function hasDouble(input: string, c: string): boolean {
  return input.includes(`${c}${c}`);
}

export function hasDoubles(input: string): boolean {

  return (
      hasDouble(input, '1') ||
      hasDouble(input, '2') ||
      hasDouble(input, '3') ||
      hasDouble(input, '4') ||
      hasDouble(input, '5') ||
      hasDouble(input, '6') ||
      hasDouble(input, '7') ||
      hasDouble(input, '8') ||
      hasDouble(input, '9')
  );
}

export function dvojicky(input: string) {
  let found = false;
  // has input atleast one twin, it must be alone tho
  for (let i = 0; i <= 4; i++) {
    if (
           input[i - 1] != input[i]
        && input[i] === input[i + 1]
        && input[i + 1] != input[i + 2]
  ) {
      return true;
    }
  }


  return found;
}

export function increases(cifry: string) {
  return cifry.split('').reduce((acc, cifra, index) => {

    if (acc && (index === 0 || cifra >= cifry[index - 1])) {
      return true;
    }

    return false;
  }, true);
}

type Rule = (input: string) => boolean;

export function passwords(min: number, max: number, rules: Rule[]) {
  let passwords = [];
  for (let i = min; i <= max; i++) {

    if (
        rules.reduce((acc, rule) => {
          return acc && rule(i.toString());
        }, true)
    ) {
      passwords.push(i);
    }
  }

  return passwords;
}
