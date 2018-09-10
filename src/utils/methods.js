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
        console.log("identity", identity);
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

/* export let createRelay = async function (issuer,total_supply,max_supply,connector1,accaddress1,connector2,accaddress2,cb){
    let scatter = window.scatter;
var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("create relay called");
    const eos = scatter.eos( network, Eos, eosOptions);
    let contract = await eos.contract("eosiotoken12")
    let result = await contract.createRelay(issuer,total_supply,max_supply,connector1,accaddress1,connector2,accaddress2,{authorization:"eosiotoken12@active"})
} */

export let createRelay = async function (issuer, total_supply, max_supply, connector1, accaddress1, connector2, accaddress2, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("create relay called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    let result = await contract.createrelay(issuer, total_supply, max_supply, connector1, accaddress1, connector2, accaddress2, { authorization:  ['eosiotoken12@active']})
}

export let createSmart = async function (issuer, total_supply, max_supply, connector1, accaddress1, weight, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("create smart called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    let result = await contract.createsmart(issuer, total_supply, max_supply, connector1, accaddress1, weight, { authorization:  ['eosiotoken12@active']})
}

export let buyToken = async function (input,stoken,issuer, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("buytoken called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    let result = await contract.buytoken(input, stoken, issuer, { authorization: "smartcreate1@active"})
}

export let sellToken = async function (input,issuer, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("selltoken called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    let result = await contract.selltoken(input, issuer, { authorization: "smartcreate1@active"})
}

export let convertToken = async function (input,symbol,symbol2,user, cb) {

    console.log("hello")
    let scatter = window.scatter;
    var pubkey = "EOS8ZjT6ahwoz39srfqR53rNYTb5KXm1CysmZYyvHHkUa2xAgmqVL";
    console.log("convert token called");
    const eos = scatter.eos(network, Eos, eosOptions);
    let contract = await eos.contract("eosiotoken12")
    console.log(contract)
    let result = await contract.convert(input,symbol,symbol2,user, { authorization: "smartcreate1@active"})
}
/* export function createRelay(account_nameissuer,
    total_supply,
    max_supply,
    connector1,
    account_name_accaddress1,
    connector2,
    account_name_accaddress2) {

} */
/* export function createSmart(account_name_issuer,
    total_supply,
    max_supply,
    connector1,
    account_name_accaddress1,
    weight) {

} */
export function issue(account_name_to, quantity, memo) {

}
// export function transfer(account_name_from,
//     account_name_to,
//     quantity,
//     memo) {

// }
/* export function buyToken(in_, stoken, account_name_issuer) {

} */
/* export function sellToken(in_, account_name_user) {

} */
/* export function convert(in_, string_symbol, string_symbol2, account_name_user) {

} */