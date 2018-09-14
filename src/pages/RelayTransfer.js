import React, { Component } from 'react'
import '../style/Create.css';
import * as Eos from 'eosjs';
import { convertToken } from '../utils/methods.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class RelayTransfer extends Component {
    constructor(props){
        super(props);
        this.state = {
            tokenAddress : '',
            status:'0',
            amount:this.props.location.state.amount,
            conn1sym: this.props.location.state.sym1,
            conn2sym: this.props.location.state.sym2,
            tokensym: this.props.location.state.sym,
        };
        this.handleTransfer = this.handleTransfer.bind(this);
    }

     ///////////////////////
     componentWillMount() {
        this.setState({
            status: true
        })
    }
   
    handleTransfer = () => {
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
        let scatter = window.scatter;
        console.log("selltoken called");
        const eos = scatter.eos(network, Eos, eosOptions);
        let account = scatter.identity.accounts[0].name;
        console.log(account);
        eos.transaction(
            {
                actions: [
                    {
                        account: this.state.tokenAddress,
                        name: 'transfer',
                        authorization: [{
                            actor: account,
                            permission: 'active'
                        }],
                        data: {
                            from: account,
                            to: "intermediate",
                            quantity: `${this.state.amount} ${this.state.conn1sym}`,
                            memo: "hello"
                        }
                    }
                ]
            }, (err, result) => {
                if (err) {
                   alert("TRANSACTION NOT COMPLETED")
                } else {
                    if (this.state.conn1sym=="ATDI") { 
                        var s = this.state.amount+" "+this.state.conn1sym ; 
                       convertToken(s,this.state.tokensym,this.state.conn2sym,"")
                }else if(this.state.conn1sym=="CET"){
                    var s = this.state.amount+" "+this.state.conn1sym ; 
                    convertToken(s,this.state.tokensym,this.state.conn2sym,"")
                }
                }
            }
        )
   
      
      
    }
   //////////////////////
    render() {
        return (
            <div>
                <div className="row createToken pad">
                    <div className="container c5 nopad">
                        <div className="ui-lg-6 npl">
                            <div className="ui-lg-12 sh w b2 br2 tokenadd nopad">
                                <p className="c5x mg0 pad f3 f16 c3">List a New Token on PEGDEX</p>
                                <div className="pad">
                                    <h5 className="f2 mg0 c3 mgtb">Token Address (Connector1)</h5>
                                    <input type="text" placeholder="connector1 address" className="f16 f3 c3" onChange={(e)=>this.setState({tokenAddress:e.target.value})} />
                                    <small className="eror er">Please provide a valid account address with length 12..</small>
                                </div>
                                <div className="full pad tr bn5x">
                                {<button className="c7 br2" onClick={()=>{this.handleTransfer()}}>NEXT</button>}
                                </div>
                            </div>
                        </div>
                        <div className="ui-lg-6 npr">
                            <div className="ui-lg-12 sh w br2 nopad">
                                <p className="f15 pad c3">Listing a token on PegDex is easy. You can use this form to generate a new relay between your token and the PEG:USD stabletoken. Once you have created a relay it will automatically be listed on PegDex. You will receive the entire initial supply of relay tokens, and they can be sold at any time to pull out your deposit amounts. By owning relay token(s) you will also earn fees whenever people buy or sell through the relay on PegDex. All new listings must be funded with a minimum of 20,000 PEG:USD Tokens.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}