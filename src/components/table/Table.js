import React, { Component } from 'react';
import '../../style/Table.css';
// import { Link,history } from "react-router-dom";
import Loader from '../loader/Loader';
import axios from 'axios';
import { getBal } from '../../utils/methods.js';
import { myTest } from '../../service/Http_service';
import * as Eos from 'eosjs';
import Button from '../button/Button';
var scatter = {};

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

export default class componentName extends Component {
    state = {}
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currency: [],
            isLoading: false,
            isL: false,
            login: false,
        }
        console.log("symbol---", this.state.sym)
    }

    componentDidMount = () => {
        this.setState({ isLoading: true })

        this.getTableData()

        console.log("outside ", this.state.bal);
        //this.getTableData()

    }

    getTableData = () => {
        // this.setState({ isLoading: true })
        axios.get(`http://apipegdex.zero2pi.com/getsmarttoken`).then(res => {
            const resp = res.data;
            console.log(resp, "---hay")
            this.setState({ data: resp, isLoading: false });
            this.setAmount();

        }, (error) => {
            console.log(error.response);
            this.setState({ isLoading: false })
        })
    }
    setAmount = () => {

        document.addEventListener('scatterLoaded', async (scatterExtension) => {
            this.setState({ login: true })

            scatter = window.scatter;
            if (scatter.identity) {
                console.log("1==============")
                this.setState({ login: "Logout" })
                this.setState({ scatterAvailable: true });
                this.setState({ scatter: true });
                const eos = scatter.eos(network, Eos, eosOptions)
                this.state.account = scatter.identity.accounts[0].name

                let curr = []
                // for (var i = 0; i < this.state.data.length; i++) {
                //     let symbol = this.state.data[i].symbol;
                //     eos.getCurrencyBalance('eosiotoken12', this.state.account, symbol).then(res => {
                //         curr[i] = res[0];
                //     })
                // }
                let data = await this.state.data.map((val, index) => {
                    let symbol = val.symbol;
                    eos.getCurrencyBalance('eosiotoken12', this.state.account, symbol).then(res => {
                        // val.balance = res[0];
                        this.state.data[index].balance = res[0];
                        this.setState({ data: this.state.data })

                    })

                })

               
            }
            else {

            }

        })
    }
   
    buySell = (data) => {

    }

    convertContinue = (path) => {
        this.props.history.push('/Convert/', { symbol: path.symbol, price: path.priceEachToken, mrktcap: path.marketCap, liqui: path.liquidity })

    }

    render() {

        return (
            <div>
                {this.state.isLoading ?
                    <Loader /> :
                    <div className="row appRowHome pad">
                        <Button type="Token" />
                        <div className="container c5">
                            <table className="full tl">
                                <tbody>
                                    <tr className="hpHed56">
                                        <td colSpan="3">Token Name</td>
                                        <td>Price</td>
                                        <td>Market Cap</td>
                                        <td className="c">Liquidity Depth <i className="fa fa-caret-down"></i></td>
                                        <td>My Balance</td>
                                        <td colSpan="2">My Balance</td>
                                    </tr>


                                    {this.state.data.map((value, k) => <tr key={k} className="_tokenN" onClick={(e) => this.convertContinue(value)}>




                                        <td>
                                            <img src={require('../../images/img250/download.png')} />
                                        </td>
                                        <td>
                                            <p className="mg0 f15 bd c6 f2">
                                                {value.name}
                                                <a href="">
                                                    <i className="fa fa-external-link f13"></i>
                                                </a>
                                            </p>
                                            <p className="mg0 f13 c2">{value.symbol}</p>
                                        </td>
                                        <td>
                                            <a target="_" href={value.website}>
                                                <i className="fa fa-check-circle f13 chk2B"></i>
                                            </a>
                                        </td>
                                        <td>{value.priceEachToken.toFixed(4)}</td>
                                        <td>${value.marketCap.toFixed(4)}</td>
                                        <td>{value.liquidity}</td>

                                        {<td >{(value.balance === undefined) ? 'NA' : value.balance}</td>}
                                        {/* <td >{(this.state.currency[1] === undefined) ? 'NA' : this.state.currency[0]}</td> */}

                                        <td>
                                            <button className="bySel" onClick={(e) => this.buySell(value.priceEachToken)}>Buy / Sell</button>
                                        </td>

                                    </tr>)}

                                </tbody>
                            </table>
                        </div>
                    </div>}

            </div>
        )

    }
}
