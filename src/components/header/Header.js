import React, { Component } from 'react'
import '../../style/Header.css';
import Button from '../button/Button';
import { Link } from "react-router-dom";
import { scatterLogin, transfer, createRelay, createSmart, buyToken, sellToken, convertToken } from "../../utils/methods"
import { getBal } from '../../utils/methods.js';
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
export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            login: "login",
            scatterAvailable: false,
        }
    }

    componentWillMount() {
        //    console.log("scat",documenscatter.identity);
        document.addEventListener('scatterLoaded', scatterExtension => {

            scatter = window.scatter;
            if (scatter.identity) {
                console.log("1==============")
                this.setState({ login: "Logout" })
                this.setState({ scatterAvailable: true });
                console.log(this.state.login)
            }
            else {
                console.log("2==========")
                this.setState({ login: "Login" })
                console.log(this.state.login)
            }
            console.log("scatter inside", scatter)
            // console.log("scatterLoaded",scatter);
            // if (scatter.identity!==null){
            //     this.setState({login:"logout"})
            // }

        })
    }

    render() {
        // console.log(scatter)
        return (
            <div>
                <div className="row clrboth appHeader">
                    <div className="container">
                        <div className="navbar-collapse ui-lg-6 cw nopad">
                            <a className="noR10">PEGDEX:USD</a>
                            <ul>
                                <Link to="/"><li>TOKEN</li></Link>
                                <Link to="/Relays"><li>RELAYS</li></Link>
                            </ul>
                        </div>
                        <div className="ui-lg-4 ui-lg-offset-1 tr">
                            <input type="text" className="ui-lg-8 f1" placeholder="Search Now" />
                            <div style={{ display: "flex" }}>
                                <button onClick={() => this.hello()}>Search</button>

                                <button onClick={() => this.login()}>{this.state.login}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /*------------If scatter Not Available then show------------*/}
                {!this.state.scatterAvailable ? <div className="container">
                    <div className="dangerLogIn ui-lg-12">
                        <p className="mg0">Please login with scatter</p>
                    </div>
                </div> : null}
            </div>
        )
    }

    async login() {
        if (scatter.identity) {
            scatter.forgetIdentity().then(() => {
                this.setState({ login: "Login" })
            });

        } else {
            scatterLogin((err, value) => {
                this.setState({ login: "Logout" })
            })
           

        
    }
}

    hello() {
        console.log("in hello");
        /* createRelay("smartcreate1", "1000.0000 ATDRLY", "100000.0000 ATDRLY", "50.0000 ATDI", "eosatidiumio", "50.0000 CET", "eosiochaince", () => {

            console.log("done")

        }) */
        // alert('hello hi');
        /* createSmart("smartcreate1", "1000.0000 ATDSMT", "100000.0000 ATDSMT", "50.0000 ATDI", "eosatidiumio", ".8", () => {

            console.log("done")

        }) */

        /* buyToken("30.0000 ATDI", "ATDSMT", "smartcreate1", () => {

            console.log("done")

        }) */

        /* sellToken("50.0000 ATDSMT", "smartcreate1", () => {

            console.log("done")

        }) */

        /* convertToken("30.0000 CET", "ATDRLY", "ATDI", "smartcreate1", () => {

            console.log("done")

        }) */
    }
}


