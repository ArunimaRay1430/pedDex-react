import React, { Component } from 'react'
import '../utils/methods.js'
import '../style/Create.css'
import { buyToken, convertToken } from '../utils/methods.js';
import { sellToken } from '../utils/methods.js';
import axios from 'axios';
export default class RelayConvert extends Component {
    constructor(props) {
        super(props);
        console.log("inside conver",this.props.location.state)
        this.state = ({
            params: '',
            token1: '',
            token2: '',
            conn1fix:this.props.location.state.symbol1,
            conn2fix:this.props.location.state.symbol2,
            conn1sym: this.props.location.state.symbol1,
            conn2sym: this.props.location.state.symbol2,
            echconnprice:this.props.location.state.price,
            echtokenprice:this.props.location.state.pricetoken,
            mrktcap:this.props.location.state.mrktcap,
            liqui:this.props.location.state.liqui,
            sym:this.props.location.state.symbol,
           // connmrp:parseFloat(1/ this.props.location.state.price).toFixed(5),
        })

    }
    componentWillMount()
    {
        console.log("welcome");
    }
   
    search = () => {
        console.log("search");       
        this.props.history.push({pathname:'/RelayTransfer/',state:{amount:this.state.token1,sym1:this.state.conn1sym,sym2:this.state.conn2sym,sym:this.state.sym}});       
      
    }

    convert = () => {
        this.setState({ conn1sym: this.state.conn2sym, conn2sym: this.state.conn1sym })
    }
    convertto() {
       
            console.log("convertto1")
            this.setState({ token2: (parseFloat(this.state.token1) * this.state.echconnprice).toFixed(5) })
    
    }
    convertfrom() {
    
            console.log("convertfrom")
            this.setState({ token2:( parseFloat(this.state.token1) / this.state.echconnprice).toFixed(5) })
       
    }

    onChange(e) {
        if (this.state.conn1sym=="ATDI") {
            this.setState({ token1: e.target.value })
            console.log("onchange to")
            this.convertto();
        } else {
            this.setState({ token1: e.target.value })
            console.log("onchange from")
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
                                    <button className="bgt cw byRBt f15 u br2 f1" onClick={(e) => { this.search(e) }}>Buy The Relay Token</button>
                                </div>{/*--end of header part--*/}
                                <div className="ui-lg-11 nopad infXo4 f13">
                                    <ul className="pad">
                                    
                                        <li>Price for Eachtoken: <span>${this.state.echtokenprice}</span></li>
                                        <li>Market Cap: <span>${this.state.mrktcap}</span></li>
                                        <li>Liquidity Depth: <span>${this.state.liqui}</span></li>
                                        <li>Relay: <span>eosiotoken12</span></li>
                                    </ul>
                                    
                                </div>{/*-----End of rate,mar,more--*/}
                                <div className="ui-lg-12 full nopad fullContainerSet">
                                    <h5 className="c3 f1">Convert BNT</h5>
                                    <div className="ui-lg-5 nopad ext5Ner">
                                        <label className="full d f13 c7">SPEND</label>
                                        <input className="f1 c3" type="text" placeholder={this.state.conn1sym} value={this.state.token1} onChange={(e) => { this.onChange(e) }} />
                                        <time className="full d tr c1 f1">Your Balance: 2000</time>
                                    </div>
                                    <div className="ui-lg-2 tc">
                                        {<span className="fa fa-arrows-h pad c" onClick={this.convert}></span>}

                                    </div>
                                    <div className="ui-lg-5 nopad ext5Ner">
                                        <label className="full d f13 c7">RECEIVE</label>
                                        <input className="f1 c3" type="text" placeholder={this.state.conn2sym} value={this.state.token2} onChange={(e) => { this.onChange(e) }} />
                                        <time className="full d tr c1 f1">Your Balance: 0.00000000</time>
                                    </div>
                                </div>{/*-----End of RECEIVE box--*/}
                                <div className="ui-lg-5 ui-lg-offset-7 extra-info">
                                    <div className="full">
                                        <table className="full f1 c3">
                                            <tbody>
                                                <tr>
                                                    <td>Rate:</td>
                                                    <td className="tr">1 {this.state.conn1fix}  = ${parseFloat( this.state.echconnprice).toFixed(5)} {this.state.conn2fix}</td>
                                                </tr>
                                                <tr>
                                                    <td>Slippage:</td>
                                                    <td className="tr">0.00%</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="f1 f13 pad c8">* This transaction will fail if 1 BNT is higher than $1.7802047640614327</p>
                                    </div>
                                </div>{/*-----End of rate box--*/}
                                <div className="ui-lg-12 ad-settings">
                                    <h5 className="pad f2 c c3 mg0">ADVANCED SETTINGS <i className="fa fa-caret-down RHS"></i> </h5>
                                    <div className="ui-lg-12 pad">
                                        <div className="ui-lg-5 nopad ext5Ner">
                                            <label className="full d f13 c7">SPEND</label>
                                            <input className="f1 c3 bgt" type="text" placeholder="BNT" />
                                        </div>
                                        <div className="ui-lg-5 ui-lg-offset-1 nopad ext5Ner">
                                            <label className="full d f13 c7">BNT PRICE CHANGE</label>
                                            <input className="f1 c3 bgt" type="text" placeholder="BNT" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
