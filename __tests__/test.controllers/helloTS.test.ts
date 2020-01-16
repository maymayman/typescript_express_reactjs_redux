import   { sum } from '../../src/controller/helloTS';
import { default as hello } from '../../src/controller/helloTS' ;
test('basic sum',()=>{
    expect(sum(5,7)).toBe(3);
});

test('test name function',()=>{
    expect(hello.heloo("thong")).toBe("thong hello");
})