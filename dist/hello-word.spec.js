"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello_world_1 = require("./hello-world");
describe('typeScript test suite', () => {
    it('should return "Hello world!"', () => {
        expect.assertions(1);
        expect((0, hello_world_1.helloWorld)()).toBe('Hello, World!');
    });
});
//# sourceMappingURL=hello-word.spec.js.map