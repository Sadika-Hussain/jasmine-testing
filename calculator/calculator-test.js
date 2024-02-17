describe('calculateMonthlyPayment() tests', () => {

  it('should calculate the monthly rate correctly', function () {
    expect(calculateMonthlyPayment({ amount: 20000, years: 6, rate: 3.5 })).toEqual('308.37');
    expect(calculateMonthlyPayment({ amount: 15050, years: 5, rate: 4.3 })).toEqual('279.21');
  });

  it("should return a result with 2 decimal places", function () {
    expect(calculateMonthlyPayment({ amount: 10000, years: 3, rate: 5 })).toEqual('299.71');
  });

  it("should throw an error for invalid inputs", function () {
    expect(() => calculateMonthlyPayment({ amount: 10000, years: three, rate: 5 })).toThrow();
    expect(() => calculateMonthlyPayment({ amount: 10000, years: 3, rate: five })).toThrow();
  });
});