function calculateSumAndExecutionTime(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a non-negative integer');
    }

    const start = process.hrtime.bigint();

    // Using BigInt to handle very large numbers safely
    const sum = BigInt(n) * BigInt(n + 1) / BigInt(2);

    const end = process.hrtime.bigint();
    const elapsedTime = Number(end - start) / 1e9;

    return {
        timeInSeconds: elapsedTime,
        sum: sum
    };
}

// Test the function with different ranges
try {
    console.log('Sum from 1-100:', calculateSumAndExecutionTime(100));
    console.log('Sum from 1-100000:', calculateSumAndExecutionTime(100000));
    console.log('Sum from 1-1000000000:', calculateSumAndExecutionTime(1000000000));
    console.log('Sum from 1-9007199254740991 (MAX_SAFE_INTEGER):', calculateSumAndExecutionTime(Number.MAX_SAFE_INTEGER));
} catch (error) {
    console.error('Error:', error.message);
}
