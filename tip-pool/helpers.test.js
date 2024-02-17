describe('Helpers Test Suite', () => {
    beforeEach(() => {
        // Initialization logic: Define sample payment data
        allPayments = {
            payment1: { billAmt: 100, tipAmt: 30, tipPercent: 30 },
            payment2: { billAmt: 50, tipAmt: 10, tipPercent: 20 },
            payment3: { billAmt: 200, tipAmt: 30, tipPercent: 15 },
        }
    });

    it('should calculate total payments of all types correctly on sumPaymentTotal()', () => {
        /* Check if total billAmt, tipAmt, and tipPercent are correct
        based on sample payment data */
        expect(sumPaymentTotal('tipPercent')).toEqual(65);
        expect(sumPaymentTotal('billAmt')).toEqual(350);
        expect(sumPaymentTotal('tipAmt')).toEqual(70);
    });

    it('should calculate tipPercent correctly on calculateTipPercent()', () => {
        let { billAmt, tipAmt } = allPayments.payment1;
        expect(calculateTipPercent(billAmt, tipAmt)).toEqual(30); // Check tipPercent calculation from sample payment 1
        expect(calculateTipPercent(10, 0)).toEqual(0); // Check tipPercent when tipAmt is 0
    });

    it('should create and append a new td element with given value to an expected tr element on appendTd()', () => {
        // Create a mock table row and define a sample value
        let mockTr = document.createElement('tr');
        let value = '30%';

        // Function call
        appendTd(mockTr, value);

        expect(mockTr.children.length).toEqual(1); // Check if a new td is appended
        expect(mockTr.children[0].outerText).toEqual('30%'); // Check the content of the new td 
    });

    it('should create and append a new td with value "X" and class "deleteBtn" on appendDeleteBtn()', () => {
        // Create a mock table row
        let mockTr = document.createElement('tr');

        // Function call
        appendDeleteBtn(mockTr);

        expect(mockTr.children.length).toEqual(1); // Check if new td is appended to table row
        expect(mockTr.children[0].outerText).toEqual('X'); // Check the content of the appended td
        expect(mockTr.children[0].classList.contains('deleteBtn')).toBe(true); // Check if the class is added
    });

    it('should delete corresponding row, update allPayments, update all tables (payment, summary, and server) on deleteTableRow()', () => {
        allPayments = {}; // Clear allPayments

        // Define mock payment data
        allPayments = {
            mockPayment: { billAmt: 200, tipAmt: 30, tipPercent: 15 }
        }

        let { mockPayment } = allPayments;

        // Create and append a mock payment row to payment table
        let mockPaymentTr = document.createElement('tr');
        mockPaymentTr.setAttribute('id', 'mockPayment');
        appendTd(mockPaymentTr, '$' + mockPayment.billAmt);
        appendTd(mockPaymentTr, '$' + mockPayment.tipAmt);
        appendTd(mockPaymentTr, mockPayment.tipPercent + '%');
        appendDeleteBtn(mockPaymentTr);
        paymentTbody.append(mockPaymentTr);

        updateSummary(); // Update summary table

        serverNameInput.value = 'Max';
        submitServerInfo(); // Update server table

        // Tests before deletion 
        expect(paymentTbody.children.length).toEqual(1);
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(summaryTds[0].outerText).toEqual('$200');
        expect(summaryTds[1].outerText).toEqual('$30');
        expect(summaryTds[2].outerText).toEqual('15%');
        expect(serverTbody.children[0].children[1].outerText).toEqual('$30.00');

        // Triggering a delete action by programmatically clicking the delete button
        let deleteBtn = document.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', deleteTableRow); // Adding an event listener and callback (deleteTableRow) to handle the click event
        deleteBtn.click();

        // Tests after deletion 
        expect(Object.keys(allPayments).length).toEqual(0); // Check if allPayments data is updated
        expect(paymentTbody.children.length).toEqual(0); // Check if payment table row is deleted

        // Check if summary table has been updated
        expect(summaryTds[0].outerText).toEqual('$0');
        expect(summaryTds[1].outerText).toEqual('$0');
        expect(summaryTds[2].outerText).toEqual('0%');

        // Check if server table is updated
        expect(serverTbody.children[0].children[1].outerText).toEqual('$0.00');
    });



    afterEach(() => {
        // Tear-down logic: Resetting values and clearing tables
        billAmtInput.value = '';
        tipAmtInput.value = '';
        serverNameInput.value = '';
        allPayments = {};
        allServers = {};
        serverId = 0;
        paymentId = 0;
        summaryTds.forEach(td => td.innerHTML = '');
        updateServerTable();
    });
});


