import   { sum } from '../../src/controller/helloTS';
import hello from '../../src/controller/helloTS' ;
test('basic sum',()=>{
    expect(sum(5,7)).toBe(12);
});

test('test name function',()=>{
    expect(hello.hello("thong")).toBe("thong hello");
})