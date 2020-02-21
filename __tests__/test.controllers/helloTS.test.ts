import { sum } from '../../src/controllers/Heathcheck';

test('basic sum',()=>{
    expect(sum(5,7)).toBe(12);
});