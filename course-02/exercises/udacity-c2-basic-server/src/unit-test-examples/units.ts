// Super Simple Unit Functions

import { type } from "os";

export const add = (a: number, b: number) => {
    return a + b;
    }

export const divide = (a: number, b: number) => {
    if(b === 0) { throw new Error('div by 0') }

    return a / b;
    }

// @TODO try creating a method "concat" to concatenate two strings
// it should take two string paramaters.
// it should return one string combining the two strings.
// it should throw an error if either of the strings are empty.
// ensure your function is exported.

export const concat = (a: string, b: string): string => {
    if(!a || !b) {
        throw new Error('one param is empty')
    }

    return a + ' ' +  b;
};