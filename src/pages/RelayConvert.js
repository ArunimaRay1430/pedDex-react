import React, { Component } from 'react'
import '../utils/methods.js'
import '../style/Create.css'
import { buyToken, convertToken, convertFromRelayTwo } from '../utils/methods.js';
import { sellToken, convertToRelay, convertFromRelay, convertTwoRelay } from '../utils/methods.js';
import axios from 'axios';
import { Modal } from 'antd';
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
export default class RelayConvert extends Component {
    constructor(props) {
        super(props);
        console.log("inside conver", this.props.location.state)
        this.state = ({
            token1: '',
            token2: '',
            token11: '',
            token22: '',
            token111: '',
            token222: '',
            conn1fix: this.props.location.state.symbol1,
            conn2fix: this.props.location.state.symbol2,
            conn1sym: this.props.location.state.symbol1,
            conn2sym: this.props.location.state.symbol2,
            connprice: this.props.location.state.price,
            conn1amount: this.props.location.state.conn1amount,
            conn2amount: this.props.location.state.conn2amount,
            echconnprice: '',
            mrp: 1 / this.props.location.state.pricetoken,
            mrktcap: this.props.location.state.mrktcap,
            liqui: this.props.location.state.liqui,
            sym: this.props.location.state.symbol,
            token1Address: this.props.location.state.conn1add,
            token2Address: this.props.location.state.conn2add,
            data: [],
            isLoading: false,
            visible: false,
            BNTUSD1: this.props.location.state.symbol,
            BNTUSD2: this.props.location.state.symbol,
            BNT: this.props.location.state.symbol2,
            PEGUSD: this.props.location.state.symbol1,
            check: true,
        })
    }


    componentDidMount() {
        console.log("welcome");
    }
    handleTransfer = () => {
        
        let scatter = window.scatter;
        console.log("selltoken called");
        const eos = scatter.eos(network, Eos, eosOptions);
        let account = scatter.identity.accounts[0].name;
        let accounttoken;
        let am;
        let amt;
        if (this.state.conn1sym == "ATDI") {
            accounttoken = this.state.token1Address;
            am = this.state.conn1sym;
            amt = this.state.conn1amount;
        } else {
            accounttoken = this.state.token2Address;
            am = this.state.conn1sym;
        }

        if (this.state.token1 < amt )
        {
            eos.transaction(
                {
                    actions: [
                        {
                            account: accounttoken,
                            name: 'transfer',
                            authorization: [{
                                actor: account,
                                permission: 'active'
                            }],
                            data: {
                                from: account,
                                to: "intermediate",
                                quantity: `${parseFloat(this.state.token1).toFixed(4)} ${am}`,
                                memo: "hello"
                            }
                        }
                    ]
                }, (err, result) => {
                    if (err) {
                        console.log(err)
                        if (err.type == undefined) {
                            const parsedResponse = JSON.parse(err);
                            alert(parsedResponse.error.details[0].message);
                        }
                        alert("TRANSACTION NOT COMPLETED")
                    } else {
                        if (this.state.conn1sym == "ATDI") {
                            var s = parseFloat(this.state.token1).toFixed(4) + " " + this.state.conn1sym;
                            convertToken(s, this.state.sym, this.state.conn2sym, "")
                        } else if (this.state.conn1sym == "CET") {
                            var s = parseFloat(this.state.token1).toFixed(4) + " " + this.state.conn1sym;
                            convertToken(s, this.state.sym, this.state.conn2sym, "")
                        }
                    }
                }
            )
        }

        else{
            alert("Input connector amount exceeds availabality")
        }
            
    }

    bnttransfer() {

        let scatter = window.scatter;
        console.log("bnttransfer called");
        const eos = scatter.eos(network, Eos, eosOptions);
        let account = scatter.identity.accounts[0].name;
        let accounttoken = this.state.token2Address;
        let am = this.state.BNT;
        if (this.state.token111 < this.state.conn2amount) {
            eos.transaction(
                {
                    actions: [
                        {
                            account: accounttoken,
                            name: 'transfer',
                            authorization: [{
                                actor: account,
                                permission: 'active'
                            }],
                            data: {
                                from: account,
                                to: "intermediate",
                                quantity: `${parseFloat(this.state.token111).toFixed(4)} ${am}`,
                                memo: "hello"
                            }
                        }
                    ]
                }, (err, result) => {
                    if (err) {
                        console.log(err)
                        if (err.type == undefined) {
                            const parsedResponse = JSON.parse(err);
                            alert(parsedResponse.error.details[0].message);
                        }
                        alert("BNT TRANSACTION NOT COMPLETED")
                    } else {
                        alert("BNT TRANSACTION  COMPLETED")
                        if (this.state.token11 != "") {
                            var s = parseFloat(this.state.token11).toFixed(4) + " " + this.state.PEGUSD;
                            var e = parseFloat(this.state.token111).toFixed(4) + " " + this.state.BNT;
                            convertTwoRelay(s, e, this.state.sym)
                        } else {
                            var s = parseFloat(this.state.token111).toFixed(4) + " " + this.state.BNT;
                            convertToRelay(s, this.state.BNTUSD2, "")
                        }

                    }
                }
            )
        } else {
            alert("Input connector2 amount exceeds availabality")
            if (this.state.token11 != "") {
                var s = parseFloat(this.state.token11).toFixed(4) + " " + this.state.PEGUSD;
                convertToRelay(s, this.state.sym)
            }
        }

    }
    atditransfer() {
        let scatter = window.scatter;
        console.log("atitransfer called");
        const eos = scatter.eos(network, Eos, eosOptions);
        let account = scatter.identity.accounts[0].name;
        let accounttoken = this.state.token1Address;
        let am = this.state.PEGUSD;
        if (this.state.token11 < this.state.conn1amount) {
            eos.transaction(
                {
                    actions: [
                        {
                            account: accounttoken,
                            name: 'transfer',
                            authorization: [{
                                actor: account,
                                permission: 'active'
                            }],
                            data: {
                                from: account,
                                to: "intermediate",
                                quantity: `${parseFloat(this.state.token11).toFixed(4)} ${am}`,
                                memo: "hello"
                            }
                        }
                    ]
                }, (err, result) => {
                    if (err) {
                        console.log(err)
                        if (err.type == undefined) {
                            const parsedResponse = JSON.parse(err);
                            alert(parsedResponse.error.details[0].message);
                        }
                        alert("ATDI TRANSACTION NOT COMPLETED")
                    } else {
                        alert("ATDI TRANSACTION  COMPLETED")

                        if (this.state.BNT == "CET" && this.state.token111 != "") {
                            this.bnttransfer();
                        } else {
                            var s = parseFloat(this.state.token11).toFixed(4) + " " + this.state.PEGUSD;
                            convertToRelay(s, this.state.sym, "")
                        }



                    }
                }
            )
        }
        else {
            alert("Input connector amount (PEGUSD) exceeds availabality")

        }


    }
    handleTransfer2 = (e) => {
        if (this.state.PEGUSD == "ATDI") {
            if (this.state.PEGUSD == "ATDI" && this.state.token11 != "") {
                this.atditransfer();
            } else if (this.state.BNT == "CET" && this.state.token111 != "") {
                this.bnttransfer();
            }
        } else {
            if (this.state.token11 !== "" && this.state.token111 != "") {
                var s1 = parseFloat(this.state.token11).toFixed(4) + " " + this.state.PEGUSD;
                var s2 = parseFloat(this.state.token111).toFixed(4) + " " + this.state.BNT;
                convertFromRelayTwo(s1, this.state.BNTUSD1, s2, this.state.BNTUSD2, "")
            } else {
                if (this.state.PEGUSD == this.state.sym && this.state.token11 != "" && this.state.BNTUSD1 == "ATDI") {
                    var s = parseFloat(this.state.token11).toFixed(4) + " " + this.state.PEGUSD;
                    convertFromRelay(s, this.state.BNTUSD1, "");
                } else if (this.state.BNT == this.state.sym && this.state.token111 != "" && this.state.BNTUSD2 == "CET") {
                    console.log("cet")
                    var s = parseFloat(this.state.token111).toFixed(4) + " " + this.state.BNT;
                    convertFromRelay(s, this.state.BNTUSD2, "");
                }
            }
        }


    }
    ////
    search = () => {
        console.log("search");
        this.handleTransfer()
    }
    pass = (e) => {
        this.setState({ visible: true })
    }
    convert1 = (props) => {
        console.log(this.state.check)
        if (this.state.check == true) {
            this.setState({
                PEGUSD: this.state.BNTUSD1,
                BNT: this.state.BNTUSD2,
                BNTUSD1: this.state.PEGUSD,
                BNTUSD2: this.state.BNT,
                check: false,
            })
        }
        else {
            this.setState({
                PEGUSD: this.state.PEGUSD,
                BNT: this.state.BNT,
                BNTUSD1: this.state.BNTUSD1,
                BNTUSD2: this.state.BNTUSD2,
                check: true,
            })
            console.log()
        }
    }

    convert = () => {
        this.setState({ conn1sym: this.state.conn2sym, conn2sym: this.state.conn1sym })
    }
    convertto() {
        var g = parseFloat(this.state.conn1amount) + parseFloat(this.state.token1)
        var k = parseFloat(this.state.token1) / g;
        var re = -parseFloat(this.state.liqui) * (1 - Math.pow(1 + k, 0.5))
        var k2 = parseFloat(re) / parseFloat(this.state.liqui);
        var fire = parseFloat(this.state.conn2amount) * (Math.pow(1 + k2, 2) - 1)
        this.setState({ echconnprice: fire.toFixed(4) })
        this.setState({ token2: this.state.echconnprice })

    }
    convertfrom() {
        var g = parseFloat(this.state.conn2amount) + parseFloat(this.state.token1)
        var k = parseFloat(this.state.token1) / g;
        var re = -parseFloat(this.state.liqui) * (1 - Math.pow(1 + k, 0.5))
        var k2 = parseFloat(re) / parseFloat(this.state.liqui);
        var fire = parseFloat(this.state.conn1amount) * (Math.pow(1 + k2, 2) - 1)
        this.setState({ echconnprice: fire.toFixed(4) })
        this.setState({ token2: this.state.echconnprice })
    }

    onChange(e) {
        if (this.state.conn1sym == "ATDI") {
            this.setState({ token1: e.target.value })
            this.convertto();
        } else {
            this.setState({ token1: e.target.value })
            this.convertfrom();
        }

    }
    onChange2(e) {
        if (this.state.PEGUSD == "ATDI") {
            this.setState({ token11: e.target.value })
            var g = parseFloat(this.state.conn1amount) + parseFloat(this.state.token11)
            var k = parseFloat(this.state.token11) / g;
            var re = -parseFloat(this.state.liqui) * (1 - Math.pow(1 + k, 0.5))
            this.setState({ token22: re.toFixed(4) })
        } else {
            this.setState({ token11: e.target.value })
            var k2 = parseFloat(this.state.token11) / parseFloat(this.state.liqui);
            var fire = parseFloat(this.state.conn1amount) * (Math.pow(1 + k2, 2) - 1)
            console.log(fire)
            this.setState({ token22: fire.toFixed(4) })
        }

    }
    onChange3(e) {
        if (this.state.BNT == "CET") {
            this.setState({ token111: e.target.value })
            var g = parseFloat(this.state.conn2amount) + parseFloat(this.state.token111)
            var k = parseFloat(this.state.token111) / g;
            var re = -parseFloat(this.state.liqui) * (1 - Math.pow(1 + k, 0.5))
            this.setState({ token222: re.toFixed(4) })
        } else {
            this.setState({ token111: e.target.value })
            var k2 = parseFloat(this.state.token111) / parseFloat(this.state.liqui);
            var fire = parseFloat(this.state.conn2amount) * (Math.pow(1 + k2, 2) - 1)
            console.log(fire)
            this.setState({ token222: fire.toFixed(4) })
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
                                    <button className="bgt cw byRBt f15 u br2 f1" onClick={(e) => { this.pass(e) }}>Buy The Relay Token</button>
                                </div>{/*--end of header part--*/}
                                <div className="ui-lg-11 nopad infXo4 f13">
                                    <ul className="pad">

                                        <li>Price for Eachtoken: <span>${this.state.mrp}</span></li>
                                        <li>Market Cap: <span>${this.state.mrktcap}</span></li>
                                        <li>Liquidity Depth: <span>${this.state.liqui}</span></li>
                                        <li>Relay: <span>eosiotoken12</span></li>
                                    </ul>

                                </div>{/*-----End of rate,mar,more--*/}
                                <div className="ui-lg-12 full nopad fullContainerSet">
                                    <h5 className="c3 f1">Convert BNT</h5>
                                    <div className="ui-lg-5 nopad ext5Ner">
                                        <label className="full d f13 c7">SPEND</label>
                                        <input className="f1 c3" type="text" placeholder={this.state.conn1sym + " (format 0.0000)"} value={this.state.token1} onChange={(e) => { this.onChange(e) }} />
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
                                                    <td className="tr">1 {this.state.conn1fix}  = ${parseFloat(this.state.connprice).toFixed(5)} {this.state.conn2fix}</td>
                                                </tr>
                                                <tr>
                                                    <td>Slippage:</td>
                                                    <td className="tr">{(this.state.token2 / this.state.liqui).toFixed(4)}%</td>

                                                </tr>
                                                <Modal
                                                    title="USD-BNT"
                                                    visible={this.state.visible}
                                                    footer={null}
                                                    onCancel={() => { this.setState({ visible: false }) }}
                                                >
                                                    <div>
                                                        <tr>
                                                            <td> <input name="amount-usd" class="form-control amount amount-usd green-border" placeholder={this.state.PEGUSD} value={this.state.token11} onChange={(e) => { this.onChange2(e) }}></ input></td>
                                                            <td><input name="amount-connector" class="pos green-border" placeholder={this.state.BNTUSD1} value={this.state.token22} onChange={(e) => { this.onChange2(e) }} ></ input></td>
                                                        </tr>
                                                        <tr>
                                                            <td> <small class="text-muted">Spend: {this.state.PEGUSD}</small></td>
                                                            <td><small class="pos">Receive: {this.state.BNTUSD1}</small></td>
                                                        </tr>
                                                        <div class="div4    ">
                                                            <span class="direction fa fa-arrows-h green-border" onClick={this.convert1}></span>
                                                        </div>
                                                        <tr>
                                                            <td><input name="return-usd" class="form-control return-usd green-border" placeholder={this.state.BNT} value={this.state.token111} onChange={(e) => { this.onChange3(e) }}></ input></td>
                                                            <td><input name="return-connector" class="pos green-border" placeholder={this.state.BNTUSD2} value={this.state.token222} onChange={(e) => { this.onChange3(e) }}></ input></td>
                                                        </tr>
                                                        <tr>
                                                            <td> <small class="text-muted">Spend: {this.state.BNT}</small></td>
                                                            <td><small class="pos">Receive: {this.state.BNTUSD2}</small></td>
                                                        </tr>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" className="div3" onClick={(e) => { this.handleTransfer2(e) }}>
                                                            <span aria-hidden="true">Confirm</span>
                                                        </button>
                                                    </div>

                                                </Modal>
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
