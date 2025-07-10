export default class Stack {
    #maxSize;
    #stack;

    constructor(maxSize = 0) {
        this.#maxSize = Math.max(0, maxSize);
        this.#stack = [];
    }

    push(item) {
        if (this.#maxSize > 0 && this.#stack.length === this.#maxSize)
            throw new Error('Stack is full!');

        this.#stack.push(item);
    }

    pop() {
        return this.#stack.pop();
    }

    peek() {
        return this.#stack[this.#stack.length - 1];
    }

    isEmpty() {
        return this.#stack.length === 0;
    }

    size() {
        return this.#stack.length;
    }

    clear() {
        this.#stack = [];
    }

    hasItem(item) {
        return this.#stack.includes(item);
    }

    toArray() {
        return [...this.#stack];
    }
}