export const getRangeArray = (n: number): number[] => {
  return Array.from({length: n + 1}, (x, i) => i);
}

export const getSumOfSquares = (n: number): number => {
	const arry = getRangeArray(n);

	return arry.reduce((total, current) => {
	  return Math.pow(current, 2) + total;
	}, 0);
}

export const getSquareOfSum = (n: number): number => {
	const arry = getRangeArray(n);

	const sum = arry.reduce((total, current) => {
	  return current + total;
	}, 0);

	return Math.pow(sum, 2);
}