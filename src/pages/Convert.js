import React, { Component } from 'react'
import '../utils/methods.js'
import '../style/Create.css'
import axios from 'axios';
import { buyToken } from '../utils/methods.js';
import { sellToken } from '../utils/methods.js';
import * as Eos from 'eosjs'
export default class Convert extends Component {
    constructor(props) {
        super(props);
        console.log("inside conver", this.props.location.state)
        this.state = ({
            token1: '',
            token2: '',
            tokensym: this.props.location.state.symbol,
            connamount:this.props.location.state.connamount,
            weight:this.props.location.state.weight,
            connsym: 'ATDI',
            connsymfixed: 'ATDI',
            mrktcap: this.props.location.state.mrktcap,
            liqui: this.props.location.state.liqui,
            price: this.props.location.state.price,
            echtokprice:'',
            mrp: parseFloat(1 / this.props.location.state.price).toFixed(5),
            tokenAddress: this.props.location.state.add,
        })

    }

    componentWillMount() {
        //this.setState({echtokprice:-parseFloat(this.state.liqui) * (1 - Math.pow(1 + parseFloat(this.state.token1) / parseFloat(this.state.connamount)+parseFloat(this.state.token1), parseFloat(this.state.weight)))}) ;
             
        console.log("welcome");
    }
    handleTransfer = () => {
        if (this.state.connsym == "ATDI") {
            var s = this.state.token1 + " " + this.state.connsym;
            console.log(this.state.connsym)
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
                                quantity: `${this.state.token1} ${this.state.connsym}`,
                                memo: "hello"
                            }
                        }
                    ]
                }, (err, result) => {
                    if (err) {
                        console.log(err)
                        alert(" transaction not completed")
                    } else {

                        buyToken(s, this.state.tokensym, ""); 
                    }
                }
            )       
        } else {
            var s = this.state.token1 + " " + this.state.connsym;
            sellToken(s, "");

        }

        console.log("transaction")
    }

    search = () => {
        console.log("search");
        this.handleTransfer();
    }

    convert = () => {
        this.setState({ tokensym: this.state.connsym, connsym: this.state.tokensym })
    }
    convertto() {
        console.log("--",this.state.connamount)
        var g=parseFloat(this.state.connamount)+parseFloat(this.state.token1)
        this.setState({echtokprice:-parseFloat(this.state.liqui) * (1 - Math.pow(1 + parseFloat(this.state.token1)/ g , parseFloat(this.state.weight)))})
        this.setState({ token2: this.state.echtokprice})
    }  
    convertfrom() {
        var g=1/parseFloat(this.state.weight)
        this.setState({echtokprice:parseFloat(this.state.connamount) * ( Math.pow(1 + parseFloat(this.state.token1)/ parseFloat(this.state.liqui) , g)-1)})
        this.setState({ token2: this.state.echtokprice})
    }

    onChange(e) {
        if (this.state.connsym == "ATDI") {
            this.setState({ token1: e.target.value})
            
            this.convertto();
        } else {
            this.setState({ token1: e.target.value})
            this.convertfrom();
        }

    }

    render() {
        return (
            <div>
                <div>
                    <div className="row bancorN6 pad">
                        <div className="container c5 clrboth">
                            <div className="full pad w sh br2 clrboth">
                                <div className="ui-lg-2 ico-x1 LHS nopad">
                                    <img src={require('../images/img250/download.png')} />
                                </div>
                                <div className="ui-lg-6 _tokennfo">
                                    <h5 className="mg0 ellip f1 c3">Bancor Network Token (BNT)</h5>
                                    <p className="mg0 f13">
                                        <a className="ellip d" href="">
                                            <i className="fa fa-check-circle"></i>
                                            <span>eosiotoken12</span>
                                        </a>
                                    </p>
                                </div>
                                <div className="ui-lg-5 tr">
                                    <button className="bgt cw byRBt f15 u br2 f1" >Buy The Relay Token</button>
                                </div>{/*--end of header part--*/}
                                <div className="ui-lg-11 nopad infXo4 f13">
                                    <ul className="pad">
                                        <li>Price: <span>${this.state.mrp}</span></li>
                                        <li>Market Cap: <span>${this.state.mrktcap}</span></li>
                                        <li>Liquidity Depth: <span>${this.state.liqui}</span></li>
                                        <li>Relay: <span>eosiotoken12</span></li>
                                    </ul>
                                </div>{/*-----End of rate,mar,more--*/}
                                <div className="ui-lg-12 full nopad fullContainerSet">
                                    <h5 className="c3 f1">Convert BNT</h5>
                                    <div className="ui-lg-5 nopad ext5Ner">
                                        <label className="full d f13 c7">SPEND</label>
                                        <input className="f1 c3" type="text" placeholder={this.state.connsym + " (format 0.0000)"} value={this.state.token1} onChange={(e) => { this.onChange(e) }} />
                                        <time className="full d tr c1 f1">Your Balance: 2000</time>
                                    </div>
                                    <div className="ui-lg-2 tc">
                                        {<span className="fa fa-arrows-h pad c" onClick={this.convert}></span>}

                                    </div>
                                    <div className="ui-lg-5 nopad ext5Ner">
                                        <label className="full d f13 c7">RECEIVE</label>
                                        <input className="f1 c3" type="text" placeholder={this.state.tokensym} value={this.state.token2} onChange={(e) => { this.onChange(e) }} />
                                        <time className="full d tr c1 f1">Your Balance: 0.00000000</time>
                                    </div>
                                </div>{/*-----End of RECEIVE box--*/}
                                <div className="ui-lg-5 ui-lg-offset-7 extra-info">
                                    <div className="full">
                                        <table className="full f1 c3">
                                            <tbody>
                                                <tr>
                                                    <td>Rate:</td>
                                                    <td className="tr" >1 {this.state.connsym} = ${parseFloat(this.state.price).toFixed(5)}</td>
                                                </tr>
                                                <tr>
                                                    <td>Slippage:</td>
                                                    <td className="tr">{(this.state.token2 / this.state.liqui).toFixed(4)}%</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="full f1 c3">
                                        <tr ><button className="tr pos1" onClick={(e) => { this.search(e) }}>CONFIRM</button> </tr>
                                        </div>
                                    </div>
                                </div>{/*-----End of rate box--*/}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
