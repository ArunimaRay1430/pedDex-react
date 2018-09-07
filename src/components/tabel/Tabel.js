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
    }

    componentDidMount = () => {
        this.getTableData()
    }

    getTableData = () => {
        this.setState({ isLoading: true })
        axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
            const resp = res.data;
            console.log(resp, "---hay")
            this.setState({ data: resp, isLoading: false })
        }, (error) => {
            console.log(error.response);
            this.setState({ isLoading: false })
        })
    }


    buySell = (data) => {
        alert('this is:' + data.website);
    }

    convertContinue = (path) => {
        this.props.history.push('/Convert/' + path.phone)
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
                                        <td colSpan="3">Name</td>
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
                                            <p className="mg0 f13 c2">Bancor Network Token</p>
                                        </td>
                                        <td>
                                            <a target="_" href={value.website}>
                                                <i className="fa fa-check-circle f13 chk2B"></i>
                                            </a>
                                        </td>
                                        <td>{value.id}</td>
                                        <td>$0.0001</td>
                                        <td>{value.phone}</td>
                                        <td>$15,000.00</td>
                                        <td>
                                            <p>{value.website}
                                                <span className="sub4">KIN</span>
                                            </p>
                                        </td>
                                        <td>
                                            <button className="bySel" onClick={(e) => this.buySell(value)}>Buy / Sell</button>
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
