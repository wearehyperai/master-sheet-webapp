export function divideArray<T>(arr: T[], n: number): T[][] {
    const result: T[][] = Array.from({ length: n }, () => []);
    arr.forEach((item, index) => {
        result[index % n].push(item);
    });
    return result;
}