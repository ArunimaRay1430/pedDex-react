export function scatterLogin(cb){
let scatter = window.scatter;
var pubkey = "EOS8KcZx26i1E4H1fxek1ug7QZWQeu4FP2j8b3wYDYWQKkqvuNL6w";
const network = {
  protocol:'http', // Defaults to https
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
  

scatter.getIdentity(requiredFields).then(identity => {
    console.log("identity",identity);
    cb(null,identity)
}).catch(error => {
    console.log("error",error)
    // cb(null)
});
console.log(scatter);
}


export function createRelay(account_nameissuer,
    total_supply,
    max_supply,
    connector1,
    account_name_accaddress1,
    connector2,
    account_name_accaddress2) {

}
export function createSmart(account_name_issuer,
    total_supply,
    max_supply,
    connector1,
    account_name_accaddress1,
    weight) {

}
export function issue(account_name_to, quantity, memo) {

}
export function transfer(account_name_from,
    account_name_to,
    quantity,
    memo) {

}
export function buyToken( in_, stoken, account_name_issuer) {

}
export function sellToken(in_ , account_name_user) {

}
export function convert(in_ , string_symbol, string_symbol2, account_name_user) {

}