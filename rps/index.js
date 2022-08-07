const {basename, relative} = require('node:path');

//Gets a random choice based on the length of a array
function pickOne(arr) {
    const choice = Math.floor(Math.random() * arr.length);
    return arr[choice];
}

const beatenBy = {
    "rock": "paper",
    "paper": "scissors",
    "scissors": "rock",
};

function winner(userChoice, computerChoice) {
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

function cleanup(str) {
    if (typeof str === "string") {
        return str.trim().toLowerCase();
    }
    return null;
}
function main() {
    const choices = Object.keys(beatenBy);
    // Get the user's choice
    const userChoice = cleanup(process.argv[2]);
    // Validates if user choice is accounted for
    if (Object.hasOwnProperty.call(beatenBy, userChoice)) {
        const computerChoice = pickOne(choices); // Get the computer's choice
        const result = winner(userChoice, computerChoice); // Get winner out of User and computer choises
        // Prints things to the console
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