import React, { Component } from 'react'
import '../style/Table.css'
import Button from '../components/button/Button';
// import { Link } from "react-router-dom";
import axios from 'axios';
import Loader from "../components/loader/Loader";

export default class Relays extends Component {
// import { Link } from "react-router-dom";
    constructor(props){
        super(props);
        this.state=({
            data:[],
            isLoading:false,
        })
    }
    buySell = (data) => {
        
    }
    convertContinue = (path) => {
        console.log(path.priceEachToken);
        this.props.history.push('/RelayConvert/',{symbol1:path.connector1Symbol,symbol2:path.connector2Symbol, price:path.priceEachConn,symbol:path.symbol,mrktcap:path.marketCap,liqui:path.liquidity, pricetoken:path.priceEachToken})
          
      } 
    componentDidMount = () => {
        this.tableDataFromRelay();  
    }

    tableDataFromRelay = () =>{
        this.setState({ isLoading: true })
        axios.get(`http://apipegdex.zero2pi.com/getreltoken`).then(res => {
            const resp = res.data;
            console.log(resp,"--hey resp");
            this.setState({data: resp})
            this.setState({ isLoading: false })
        }, (error) => {
            console.log(error)
            this.setState({ isLoading: false })
        })
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
                                {this.state.data.map((value, k) => <tr key={k} className="_tokenN" onClick={(e) => this.convertContinue(value)}>
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
                                        <td>$15,000.00</td>
                                        <td>
                                        <button className="bySel" onClick={(e) => this.buySell(value.priceEachRel)}>Buy / Sell</button>
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
