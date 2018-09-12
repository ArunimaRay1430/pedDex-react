import React, { Component } from 'react';
import '../../style/Tabel.css';
// import { Link,history } from "react-router-dom";
import Loader from '../loader/Loader';
import axios from 'axios';
import { myTest } from '../../service/Http_service';

import Button from '../button/Button';
export default class componentName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
        }
        console.log("symbol---",this.state.sym)
    }

    componentDidMount = () => {
        this.getTableData()
    }

    getTableData = () => {
        this.setState({ isLoading: true })
        axios.get(`http://apipegdex.zero2pi.com/getsmarttoken`).then(res => {
            const resp = res.data;
            console.log(resp, "---hay")
            this.setState({ data: resp, isLoading: false })
        }, (error) => {
            console.log(error.response);
            this.setState({ isLoading: false })
        })
    }


    buySell = (data) => {
        //alert('this is it:');
    }

    convertContinue = (path) => {
      this.props.history.push('/Convert/',{symbol:path.symbol, price:path.priceEachToken,mrktcap:path.marketCap,liqui:path.liquidity})
        
    }

    render() {

        return (
            <div>
                {this.state.isLoading ?
                    <Loader /> :
                    <div className="row appRowHome pad">
                         <Button type="Token"/>
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
                                        <td>{(value.priceEachToken).toFixed(4)}</td>
                                        <td>${value.marketCap.toFixed(4)}</td>
                                        <td>{value.liquidity}</td>
                                        <td>$15,000.00</td>
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
