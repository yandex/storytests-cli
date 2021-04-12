type T = {
    hello: 'hello';
};

const t: T = { hello: 'hello' };

console.log((t as any).hello);
