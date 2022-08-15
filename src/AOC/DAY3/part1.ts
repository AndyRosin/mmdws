import { readLines } from '../lib/util';

const input = readLines(__dirname, './input.txt');
function part1(input:string[]) {
    let gammaBits: number[] = [];
    let epsilonBits: number[] = [];
    for (let i = 0; i < input[0].length; i++) {
        let count0 = 0;
        let count1 = 0;
        for (let j = 0; j < input.length; j++) {
            if(input[j][i] === '0') {
                count0++;
            } else {
                count1++;
            }
        }
        gammaBits[i] = count0 > count1 ? 0: 1;
        epsilonBits[i] = count0 > count1 ? 1: 0;
    }
    const gamma = parseInt(gammaBits.join(''), 2);
    const epsilon = parseInt(epsilonBits.join(''), 2);
    return gamma * epsilon;
}
console.log (part1(input));
