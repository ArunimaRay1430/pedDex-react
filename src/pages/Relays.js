import React, { Component } from 'react'
import '../style/Table.css'
import Button from '../components/button/Button';
// import { Link } from "react-router-dom";
import axios from 'axios';
import Loader from "../components/loader/Loader";
import * as Eos from 'eosjs';
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

export default class Relays extends Component {
// import { Link } from "react-router-dom";
    constructor(props){
        super(props);
        this.state=({
            data:[],
            isLoading:false,
        })
    }
  
   
    componentDidMount = () => {
        this.setState({ isLoading: true })
        this.tableDataFromRelay()
       
        console.log("outside ", this.state.bal);
    }

    tableDataFromRelay = () =>{
        this.setState({ isLoading: true })
        axios.get(`http://apipegdex.zero2pi.com/getreltoken`).then(res => {
            const resp = res.data;
            console.log(resp,"--hey resp");
            this.setState({data: resp})
            this.setState({ isLoading: false })
            this.setAmount();
        }, (error) => {
            console.log(error)
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

    
    convertContinue = (path) => {
        console.log(path.priceEachToken);
        this.props.history.push('/RelayConvert/',{symbol1:path.connector1Symbol,symbol2:path.connector2Symbol, price:path.priceATDItoCET,symbol:path.symbol,mrktcap:path.marketCap,liqui:path.liquidity, pricetoken:path.priceEachToken,conn1add:path.connector1Address,conn2add:path.connector2Address,conn1amount:path.conn1Amount,conn2amount:path.conn2Amount})
          
      } 

    render() {
        return (
            <div>
                {this.state.isLoading ? <Loader/>:
                <div className="row appRowHome pad">
                <Button type="Relay"/>
                    <div className="container c5">
                        <table className="full">
                            <tbody>
                                <tr className="hpHed56">
                                    <td colSpan="3">Token Name</td>
                                        <td>Price</td>
                                        <td>Market Cap</td>
                                        <td className="c">Liquidity Depth <i className="fa fa-caret-down"></i></td>
                                        <td>My Balance</td>
                                        <td colSpan="2">My Balance</td>
                                </tr>
                                {this.state.data.map((value, k) => <tr key={k} className="_tokenN" >
                                        <td>
                                            <img src={require('../images/img250/download.png')} />
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
                                        <td>
                                        <button className="bySel" onClick={(e) => this.convertContinue(value)}>Buy / Sell</button>
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
