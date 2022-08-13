import { readLines } from "../lib/util";

interface State {
    hPos:number;
    depth:number;
}

interface Commands {
    [key:string]: (v:number,state:State) => State;
}

const stateFunctions: Commands = {
    forward: (v: number, state: State) => Object.assign(state, { hPos: state.hPos + v }),
    down: (v: number, state: State) => Object.assign(state, { depth: state.depth + v }),
    up: (v: number, state: State) => Object.assign(state, { depth: state.depth - v })
};
interface Command {
    dir: string;
    value: number;
}

const commands: Command[] = readLines(__dirname, './input.txt').map((v) => {
    const [dir,value] = v.split(' ');
    return {dir, value: parseInt(value,10)} as Command;
});

const result = commands.reduce((state: State, cur: Command) => stateFunctions[cur.dir](cur.value, state), {
    hPos: 0,
    depth: 0
});

console.log('Result:', result.hPos * result.depth);