import {getRangeArray, getSquareOfSum, getSumOfSquares} from "../mathyUtils";

describe("getRangeArray", () => {
	it("given number n, returns an array of range from 0 to n", () => {
		const array = getRangeArray(4);

		expect(array).toEqual([0,1,2,3,4])
	})
})

describe("getSquareOfSum", () => {
	it("given number n, returns the square of sum of range from 1 to n", () => {
		const result = getSquareOfSum(4)
		expect(result).toEqual(100)
	})
})

describe("getSumOfSquares", () => {
	it("given number n, returns the sum of range from 1 to n where each number in the range is squared", () => {
		const result = getSumOfSquares(4)
		expect(result).toEqual(30)
	})
})