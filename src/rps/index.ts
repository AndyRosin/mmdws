import { basename, relative } from 'node:path';

enum RPS {
    ROCK = "rock",
    PAPER = "paper",
    SCISSORS = "scissors",
}
//Gets a random choice based on the length of a array
function pickOne(arr: RPS[]): RPS {
    const choice = Math.floor(Math.random() * arr.length);
    return arr[choice];
}

const beatenBy: {
    [K in RPS]: RPS
} = {
    [RPS.ROCK]: RPS.PAPER,
    [RPS.PAPER]: RPS.SCISSORS,
    [RPS.SCISSORS]: RPS.ROCK,
};

function winner(userChoice: RPS, computerChoice: RPS) {
    if (userChoice === computerChoice) {
        return "It's a Tie!";
    } 
    if (beatenBy[userChoice] === computerChoice) {
        return "You lose. L";
    }
    if (beatenBy[computerChoice] === userChoice) {
        return "You win. W";
    }

    throw new Error("SOMETHING WENT WRONG PLEASE FIX IT");
}

function cleanup(str: string): RPS | null {
    if (typeof str !== "string" ) {
        return null;
    }
    const clean:string = str.trim().toLowerCase();
    if (!Object.hasOwnProperty.call(beatenBy, clean)) {
        return null;
    }
    return clean as RPS;
}
function main() {
    const choices = Object.keys(beatenBy) as RPS[];
    // Get the user's choice
    const userChoice = cleanup(process.argv[2]);
    if (Object.hasOwnProperty.call(beatenBy, userChoice)) {
        const computerChoice = pickOne(choices);
        const result = winner(userChoice, computerChoice);
        console.log(`User chose "${userChoice}"`);
        console.log(`Computer chose "${computerChoice}"`);
        console.log("Result:", result);
    } else {
        console.log(`Error: "${
            process.argv[2]
        }" is not a valid choice. Usage: ${
            basename(process.argv[0])
        } ${
            relative(process.cwd(), process.argv[1])
        } {${
            choices.join("|")
        }}`);
    }

}
main();