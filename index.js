var express = require('express')
var app = express()

var solc = require('solc');

var BigNumber = require('bignumber.js');

var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8001"));

var eth  = web3.eth;

var fs = require('fs');
            require.extensions['.sol'] = function(module, filename) {
                module.exports = fs.readFileSync(filename, 'utf8');
                // Logger.info("filename: ", filename);
            };

var myTokenSource = require("./MyToken.sol");

var myTokenCompiled = eth.compile.solidity(myTokenSource);

// console.log(myTokenSource);

var myTokenContract = eth.contract(myTokenCompiled.MyToken.info.abiDefinition);

var myTokenObject = myTokenContract.new(10000,{from:eth.accounts[0], data: myTokenCompiled.MyToken.code, gas: 300000},function(e,contract){
    if(!e) {

      if(!contract.address) {
        console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

      } else {
        console.log("Contract mined! Address: " + contract.address);

        // console.log(contract);
        // console.log(eth.getCode(greeter.address));
       	 console.log(myTokenObject.myBalance("alas"));
        // var caller=myTokenContract.at(contract.address);

        // caller.myBalance("alas",,{from:eth.accounts[0]}function(err,objValue){
        // 	if(err){
        // 		console.log("error: ",err);
        // 	}
        // 	else{
        // 		console.log("data: ",objValue);

        // 	}
        // });
      }

    }else{
    	console.log(e);
    }
})

web3.personal.unlockAccount(eth.accounts[0], "sample1");


//Contract 1

// var input = 'contract x { function g() {} }';

// var output = solc.compile(input, 1); // 1 activates the optimiser

//Contract 2

// var input = 'contract test { function multiply(uint a) returns(uint d) { return a * 7; } }';

// var output = eth.compile.solidity(input).test

// Greeter Contract

// var greeterSource = 'contract mortal { address owner; function mortal() { owner = msg.sender; } function kill() { if (msg.sender == owner) selfdestruct(owner); } } contract greeter is mortal { string greeting; function greeter(string _greeting) public { greeting = _greeting; } function greet(string newGreet) constant returns (string) { return newGreet; } }'

// var greeterCompiled = eth.compile.solidity(greeterSource)

// var _greeting = "Hello World!"

// var greeterContract = eth.contract(greeterCompiled.greeter.info.abiDefinition);

// var greeter = greeterContract.new(_greeting,{from:eth.accounts[0], data: greeterCompiled.greeter.code, gas: 300000}, function(e, contract){
//     if(!e) {

//       if(!contract.address) {
//         console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

//       } else {
//         console.log("Contract mined! Address: " + contract.address);

//         // console.log(contract);
//         // console.log(eth.getCode(greeter.address));
//         console.log(greeter.greet("alas"));
//       }

//     }else{
//     	console.log(e);
//     }
// })


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {

var number = eth.getCompilers(function(err,data){
if(err){console.log(err)} else {

	console.log(greeter.greet())

	res.send(web3.version.node)
}
});
})

app.get('/secondCall',function(req,res){
	var abi = greeterCompiled.greeter.info.abiDefinition;
	var address = greeter.address;

	var greeter2 = eth.contract(abi).at(address);

	console.log(greeter2.greet());

	res.send("done");	
})

app.get("/greeting",function(req,res){
	// console.log(greeter.greet());
	res.send(greeter.greet());
})

app.get("/deleteGreeting",function(req,res){
	if(greeter){
	greeter.kill.sendTransaction({from:eth.accounts[0]})
	res.send("deleted");
	// res.send(eth.getCode(greeter.address));
	}else{
		res.send("no greeter contract");
	}
})

app.listen(9003, function () {
  console.log('Example app listening on port 9003!')
})

// var greeterSource = 'contract mortal { address owner; function mortal() { owner = msg.sender; } function kill() { if (msg.sender == owner) selfdestruct(owner); } } contract greeter is mortal { string greeting; function greeter(string _greeting) public { greeting = _greeting; } function greet(string newGreet) constant returns (string) { return greeting; } }'


//this doesn't work
// function changeGreeting(string newGreeting) public {greeting = newGreeting;}
//        greeter.changeGreeting("hello amit");




// 	for (var contractName in output.contracts) {
//     // code and ABI that are needed by web3
//     console.log(contractName + ': ' + output.contracts[contractName].bytecode);
//     console.log(contractName + '; ' + JSON.parse(output.contracts[contractName].interface));
// }

// console.log(output);

// console.log(greeter);

	// var balance = new BigNumber('131242344353464564564574574567456');
// res.send(balance);

// var web3 = require('web3_ipc');

//     var options_ipc = {
//       // host: '/home/oodles/.ethereum-testnet/testnet/geth.ipc',
//       // host: '/home/amit/Documents/ether-private/firstserver/geth.ipc',
//       host: '/home/amit/Documents/EthSample/sample/geth.ipc',
//       ipc:true,
//       personal: true,
//       admin: false,
//       debug: false
//     };
//     web3_ipc = web3.create(options_ipc);