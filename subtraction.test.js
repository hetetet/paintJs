const subtraction=require('./subtraction')

test('substracts 4 - 2 to equal 2',()=>{
    expect(subtraction(4,2)).toBe(2);
}); 