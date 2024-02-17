describe("Servers Test Suite", function () {
  beforeEach(function () {
    // Initialization logic
    serverNameInput.value = 'Alice'; // Set initial server name input value

    // Set initial payment data
    allPayments = {
      payment1: { billAmt: 100, tipAmt: 30 },
      payment2: { billAmt: 50, tipAmt: 15 }
    }

    // Set initial server data 
    allServers = {
      server1: { serverName: serverNameInput.value },
      server2: { serverName: 'Hatter' }
    }
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    allServers = {}; // Clear all server data before submitting server info
    submitServerInfo(); // Function call
    expect(Object.keys(allServers).length).toEqual(1); // Check if a new server is added
    expect(allServers['server' + serverId].serverName).toEqual('Alice'); // Check the server name (should match initial server name)
  });

  it('should add a new row to the table for each server on updateServerTable()', () => {
    updateServerTable(); // Function call
    expect(serverTbody.children.length).toEqual(2); // Check if a row is added for each server in allServers 
  });

  it('should calculate the correct tip ammount for each server on updateServerTable()', () => {
    updateServerTable(); // Function call

    // Check if correct tip amount is assigned for each server in server table
    expect(serverTbody.children[0].children[1].outerText).toEqual(`$22.50`);
    expect(serverTbody.children[1].children[1].outerText).toEqual(`$22.50`);
  });

  afterEach(function () {
    // Tear-down logic: Resetting values and clearing tables
    serverNameInput.value = '';
    serverId = 0;
    allServers = {};
    allPayments = {};
    updateServerTable();
  });
});


