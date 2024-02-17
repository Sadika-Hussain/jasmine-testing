describe('Payments Test Suite', () => {
    beforeEach(() => {
        // Initialization logic
        billAmtInput.value = '100'; // Set bill amount input value
        tipAmtInput.value = '20'; // Set tip amount input value
    });

    it('should update payment and summary table info on submitPaymentInfo()', () => {
        // Call the function
        submitPaymentInfo();

        // Check if payment table has a new payment row
        expect(paymentTbody.children.length).toEqual(1);

        // Check if summary table has been updated 
        expect(summaryTds[0].outerText).toEqual('$100');
        expect(summaryTds[1].outerText).toEqual('$20');
        expect(summaryTds[2].outerText).toEqual('20%');
    });

    it('should create a new payment object on createCurPayment() only if input values are not empty', () => {
        // Call the function and assign it to a variable 
        let currentPayment = createCurPayment();

        // Check if currPayment is defined
        expect(currentPayment).not.toBeUndefined();

        /* Check if created payment object contains the correct 
        billAmt, tipAmt, and tipPercent based on the initial input data*/
        expect(currentPayment.billAmt).toEqual('100');
        expect(currentPayment.tipAmt).toEqual('20');
        expect(currentPayment.tipPercent).toEqual(20);

        // Reset input values
        billAmtInput.value = '';
        tipAmtInput.value = '';

        // Call the function again
        let newPayment = createCurPayment();

        // Check if newPayment is undefined 
        expect(newPayment).toBeUndefined();
    });

    it('should create a new table row element on appendPaymentTable()', () => {
        // Define a payment Object
        let currentPayment = { billAmt: 100, tipAmt: 30, tipPercent: 30 }

        // Function call
        appendPaymentTable(currentPayment);

        // Check if a new row is added to the payment table
        expect(paymentTbody.children.length).toEqual(1);
    });

    it('should update summary table with calculated sum of all payments on updateSummary()', () => {
        // Define sample payment data
        allPayments = {
            payment1: { billAmt: '100', tipAmt: '20', tipPercent: 20 },
            payment2: { billAmt: '200', tipAmt: '30', tipPercent: 15 }
        };

        // Call the function
        updateSummary();

        /* Check if summary table has the correct amount of 
        bill, tip, and tipPercent based on sample payment data */
        expect(summaryTds[0].outerText).toEqual('$300');
        expect(summaryTds[1].outerText).toEqual('$50');
        expect(summaryTds[2].outerText).toEqual('18%');
    });

    afterEach(() => {
        // Tear-down logic: Resetting values and clearing tables
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds.forEach(td => td.innerHTML = '');
        allPayments = {};
        paymentId = 0;
    });
});
