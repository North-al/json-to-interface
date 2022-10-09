# json-to-interface

```ts
[1, 2, 3] => Array<number>

[1, 2, '3'] => [number, number, string]

[1, { a: 1 }, [2]]
    ⬇
[number, { a: number }, Array<number>]