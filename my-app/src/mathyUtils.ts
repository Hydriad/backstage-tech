const getRangeArray = (n: number): number[] => {
  return Array.from({length: n + 1}, (x, i) => i);
}

export const getSumOfSquares = (n: number): number => {
	const arry = getRangeArray(n);
	console.log(arry);

	const x = arry.reduce((total, current) => {
	  return Math.pow(current, 2) + total;
	}, 0);

	console.log("sum of squares", x);

	return x;
}

export const getSqareOfSum = (n: number): number => {
	const arry = getRangeArray(n);
	console.log(arry);

	const x = arry.reduce((total, current) => {
	  return current + total;
	}, 0);
	const squaredSum = Math.pow(x, 2)

	console.log("squaredSum", squaredSum);

	return squaredSum;
}