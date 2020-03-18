import { sum } from '../../src/controllers/Heathcheck';
import Heathcheck from '../../src/controllers/Heathcheck';
test('basic sum',()=>{
    expect(sum(5,7)).toBe(12);
});
test('heloo test',()=>{
    expect(Heathcheck.hello('thong')).toEqual('thong hello');
})