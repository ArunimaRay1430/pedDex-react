import React, { Component } from 'react';
import { scatterLogin, transfer, createRelay, createSmart, buyToken, sellToken, convertToken } from "../utils/methods";
import '../style/Create.css';
import Eos from "eosjs";
var scatter={};
export default class Create4 extends Component {
    constructor(props){
        super(props);
        console.log("checking----",this.props.location.state);
        this.state={
             from:"innotical123",
             to:"intermediate",
            tokenAddress : this.props.location.state.tokenAddress,
            tokenSymbol:this.props.location.state.tokenSymbol,
            numberOfToken:this.props.location.state.numberOfToken,
            pegDiposit:this.props.location.state.pegDiposit,
            weight :this.props.location.state.weight,
            ButtonState : false,
        };
        this.changeButtonState = this.changeButtonState.bind(this);
        console.log("this is the value",this.props.location.state.tokenAddress);
        console.log("this is the value",this.props.location.state.tokenSymbol);
        console.log("this is the value",this.props.location.state.numberOfToken);
        console.log("this is the value",this.props.location.state.pegDiposit);
        console.log("this is the value",this.props.location.state.weight);
    }
    changeButtonState(){
        this.setState({
            ButtonState : true,
        })
    }

    componentWillMount() {
        console.log("window",window);
           document.addEventListener('scatterLoaded', scatterExtension => {
               console.log("window");
            scatter = window.scatter;
            console.log("scatter inside",scatter.identity.accounts["0"]);
            let {name,authority}=scatter.identity.accounts["0"];
            this.setState({from:name,permission:authority});
        })
       }

       check= ()=>{
           alert("called check add event")
       }
        handleTransfer=()=> {
        let eosOptions = {
        chainId: "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca"
      };
      
    let network = {
        protocol: "http", // Defaults to https
        blockchain: "eos",
        host: "193.93.219.219",
        port: 8888,
        chainId: "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca"
      };
    console.log("transfer initiated");
    let scatter = window.scatter;
    let eos= scatter.eos(network, Eos, eosOptions)
    //console.log("this is the value",this.props.location.state.pegdDisposit)
    eos.transaction(
      {
        actions: [
          {
            account: 'eosatidiumio',
            name: 'transfer',
            authorization: [{
              actor: this.state.from,
              //permission: this.state.permission
              permission: 'active'
            }],
            data: {
              from: this.state.from,
              to: this.state.to,
              quantity: `${this.state.pegDiposit} ATDI`,
              memo: "hello"
              //memo: parseInt(this.compareData[0].gameresult)+ parseInt(this.logIn.controls['pegDiposit'].value)
            }
          }
        ]
      }, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
        }
      }
      // options -- example: {broadcast: false}
    )
}
 createToken(){
      
    var  asset = this.props.location.state.numberOfToken+" "+this.props.location.state.tokenSymbol;
    var  smart = this.props.location.state.pegDiposit +" "+"ATDI";
    var address = this.props.location.state.tokenAddress;
    var wt = this.props.location.state.weight;
    var tokenSym = this.props.location.state.tokenSymbol
  createSmart(asset,smart,address,wt,tokenSym)    
  console.log(smart,asset,address,wt);

 }

    render() {
        return (
            <div>
                <div className="row createToken pad">
                    <div className="container c5 nopad">
                        <div className="ui-lg-6 npl">
                            <div className="ui-lg-12 sh w b2 br2 tokenadd nopad">
                                <p className="c5x mg0 pad f3 f16 c3">List a New Token on PEGDEX</p>
                                <div className="pad">
                                    <h5 className="f2 mg0 c3 mgtb">Deposit PEG:USD pegDiposit</h5>
                                    <h1>${this.props.location.state.pegDiposit}</h1>
                                    <button className="c7 br2" onClick={()=>{ this.handleTransfer(),this.changeButtonState()}}>Transfer</button>
                                    {/* <input type="text" placeholder="VeChain Token(VEN)" className="f16 f3 c3" /> */}
                                </div>
                                <div className="full pad tr bn5x">
                                    <button disabled={!this.state.ButtonState} className="c7 br2" onClick = {() => this.createToken()}>CREATE</button>
    
                                </div>
                            </div>
                        </div>
                        <div className="ui-lg-6 npr">
                            <div className="ui-lg-12 sh w br2 nopad">
                                <p className="f15 pad c3">Listing a token on PegDex is easy. You can use this form to generate a new relay between your token and the PEG:USD stabletoken. Once you have created a relay it will automatically be listed on PegDex. You will receive the entire initial supply of relay tokens, and they can be sold at any time to pull out your deposit pegDiposits. By owning relay token(s) you will also earn fees whenever people buy or sell through the relay on PegDex. All new listings must be funded with a minimum of 20,000 PEG:USD Tokens.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
