import * as Eos from 'eosjs'
const network = {
    protocol: 'http', // Defaults to https
    blockchain: "eos",
    host: "193.93.219.219",
    port: 8888,
    chainId:
        "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca"
};

const eosOptions = {
    chainId:
        "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca"
};
const requiredFields = {
    accounts: [
        {
            blockchain: "eos",
            host: "193.93.219.219",
            port: 8888,
            chainId:
                "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca"
        }
    ]
};
export function scatterLogin(cb) {
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";



    scatter.getIdentity(requiredFields).then(identity => {
        console.log("identity", identity.accounts[0].name);
        console.log("identity array", identity);
        cb(null, identity)
    }).catch(error => {
        console.log("error", error)
        // cb(null)
    });
    console.log(scatter);
}

export let transfer = async function (from, to, amount, memo, cb) {
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("transfer called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let contract = await eos.contract("eosio.token")
    let result = await contract.transfer(from, to, amount, memo, { authorization: "smartcreate1@active" })
}


export let createRelay = async function (total_supply, connector1, accaddress1, connector2, accaddress2,tokenSym, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("create relay called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let account=scatter.identity.accounts[0].name;
  
    let contract = await eos.contract("eosiotoken12")
    var max_supply = "100000.0000" + " " + tokenSym;
    console.log(max_supply);
    console.log(contract)
    await contract.createrelay(account, total_supply, max_supply, connector1, accaddress1, connector2, 
        accaddress2, { authorization:  account}).then(result => {
            alert("You have successfully created relay token..")

        }).catch(error => {
            console.log("error---", error)
            if(error.type==undefined)
            {
                const parsedResponse = JSON.parse(error);
           alert(parsedResponse.error.details[0].message);
            }
            else
            {
                console.log(error.message);
            }

        });
   
}

export let createSmart = async function (total_supply, connector1, accaddress1, weight,tokenSym, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("create smart called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let account=scatter.identity.accounts[0].name;
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    var max_supp = "100000.0000" + " " + tokenSym;
    console.log(max_supp);
    let result = await contract.createsmart(account, total_supply, max_supp, connector1, 
        accaddress1, weight, { authorization:  account}).then(result => {
            alert("You have successfully created smart token..")

        }).catch(error => {
            console.log("error---", error)
            if(error.type==undefined)
            {
                const parsedResponse = JSON.parse(error);
                alert(parsedResponse.error.details[0].message);
            }
            else
            {
                console.log(error.message);
            }
        });
   
}

export let buyToken = async function (input,stoken, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("buytoken called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let account=scatter.identity.accounts[0].name;
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    let result = await contract.buytoken(input, stoken, account, 
        { authorization: account}).then(result => {
            alert("Buy-Token is successfully completed..")

        }).catch(error => {
            console.log("error---", error)
            if(error.type==undefined)
            {
                const parsedResponse = JSON.parse(error);
           alert(parsedResponse.error.details[0].message);
            }
            else
            {
                console.log(error.message);
            }
        });
    
}
export let getBal = async function (stoken, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("getBalance called");
    const eos = scatter.eos(network, Eos, eosOptions);
   // let account=scatter.identity.accounts[0].name;
   let account = 'smartcreate1';
    let resultR = await eos.getTableRows({ code: 'eosatidiumio', scope: account, table: 'accounts',limit : 50, json: true, })
    let bal = []
    resultR.rows.forEach((rowR) => {
      console.log('row', rowR)
      let res = rowR.balance.split(" ");
      if (res[1] == 'ATDI') {
        let token = {};
        console.log('row', rowR)
        
        token.bal = rowR.balance;
        
        console.log("tokenbobj", token)
        bal.push(token)
       

      }
    })
    //let result = await contract.buytoken(input, stoken, account, { authorization: account})
    alert("Buy-Token is successfully completed..")
}

export let sellToken = async function (input, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("selltoken called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let account=scatter.identity.accounts[0].name;
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    let result = await contract.selltoken(input, account, 
        { authorization: account}).then(result => {
            alert("Sell-Token is successfully completed..")

        }).catch(error => {
            console.log("error---", error)
            if(error.type==undefined)
            {
                const parsedResponse = JSON.parse(error);
           alert(parsedResponse.error.details[0].message);
            }
            else
            {
                console.log(error.message);
            }
        });
   
}

export let convertToken = async function (input,symbol,symbol2, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("convert token called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let account=scatter.identity.accounts[0].name;
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    console.log("---",input,symbol,symbol2,account)
    let result = await contract.convert(input,symbol,symbol2,account, 
        { authorization: account}).then(result => {
            alert("Token convertion is successfully completed..")

        }).catch(error => {
            console.log("error---", error)
            if(error.type==undefined)
            {
                const parsedResponse = JSON.parse(error);
           alert(parsedResponse.error.details[0].message);
            }
            else
            {
                console.log(error.message);
            }
        });
    
}
 export let convertToRelay = async function (input,symbol, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("convert-to called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let account=scatter.identity.accounts[0].name;
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    console.log("---",input,symbol,account)
    let result = await contract.torelay(input,symbol,account, 
        { authorization: account}).then(result => {
            alert("Convertion to relay token is successfully completed..")

        }).catch(error => {
            console.log("error---", error)
            if(error.type==undefined)
            {
                const parsedResponse = JSON.parse(error);
           alert(parsedResponse.error.details[0].message);
            }
            else
            {
                console.log(error.message);
            }
        });
   
}  

export let convertFromRelay = async function (input,symbol, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("convert-from called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let account=scatter.identity.accounts[0].name;
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    console.log("---",input,symbol,account)
    let result = await contract.convertfrom(input,symbol,account, 
        { authorization: account}).then(result => {
            alert("Convertion from relay token is successfully completed..")

        }).catch(error => {
            console.log("error---", error)
            if(error.type==undefined)
            {
                const parsedResponse = JSON.parse(error);
           alert(parsedResponse.error.details[0].message);
            }
            else
            {
                console.log(error.message);
            }
        });
}


export let convertTwoRelay = async function (inputA,inputB,symbol, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("convert-to called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let account=scatter.identity.accounts[0].name;
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    //console.log("---",input,symbol,account)
    if(inputA!=undefined)
    {
        let result = await contract.torelay(inputA,symbol,account, 
            { authorization: account}).then(result => {
               // alert("Convertion to relay token is successfully completed..")
    
            }).catch(error => {
                console.log("error---", error)
                if(error.type==undefined)
                {
                    const parsedResponse = JSON.parse(error);
               alert(parsedResponse.error.details[0].message);
                }
                else
                {
                    console.log(error.message);
                }
            });
    }
    if(inputB!=undefined)
    {
        let result = await contract.torelay(inputB,symbol,account, 
            { authorization: account}).then(result => {
               // alert("Convertion to relay token is successfully completed..")
    
            }).catch(error => {
                console.log("error---", error)
                if(error.type==undefined)
                {
                    const parsedResponse = JSON.parse(error);
               alert(parsedResponse.error.details[0].message);
                }
                else
                {
                    console.log(error.message);
                }
            });
    }
    alert("Convertion to relay token is successfully completed..")   
} 

export let convertFromRelayTwo = async function (inputA,symbolA,inputB,symbolB, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("convert-from called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let account=scatter.identity.accounts[0].name;
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    
    if(inputA!=undefined)
    {
        let result = await contract.convertfrom(inputA,symbolA,account, 
            { authorization: account}).then(result => {
               // alert("Convertion from relay token is successfully completed..")
    
            }).catch(error => {
                console.log("error---", error)
                if(error.type==undefined)
                {
                    const parsedResponse = JSON.parse(error);
               alert(parsedResponse.error.details[0].message);
                }
                else
                {
                    console.log(error.message);
                }
            });
    }
    if(inputB!=undefined)
    {
        let result = await contract.convertfrom(inputB,symbolB,account, 
            { authorization: account}).then(result => {
               // alert("Convertion from relay token is successfully completed..")
    
            }).catch(error => {
                console.log("error---", error)
                if(error.type==undefined)
                {
                    const parsedResponse = JSON.parse(error);
               alert(parsedResponse.error.details[0].message);
                }
                else
                {
                    console.log(error.message);
                }
            });
    }

    alert("Convertion from relay token is successfully completed..")
    
}


export function issue(account_name_to, quantity, memo) {

}
