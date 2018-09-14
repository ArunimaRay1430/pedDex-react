import React, { Component } from 'react'
import '../style/Create.css';
import axios from 'axios'
import Create2 from './Create2';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class Create extends Component {
    constructor(props){
        super(props);
        this.state = {
            tokenAddress : '',
        };
    }

    handleClick()
    {
        const user = {
            tokenAddress: this.state.tokenAddress
          
          };
        //console.log(address)
            axios.post('http://193.93.219.219:8888/v1/chain/get_abi', { user})
              .then(response => {
                
                console.log(response);
              })
              
          
    }
    render() {
        return (
            <div>
                <div className="row createToken pad">
                    <div className="container c5 nopad">
                        <div className="ui-lg-6 npl">
                            <div className="ui-lg-12 sh w b2 br2 tokenadd nopad">
                                <p className="c5x mg0 pad f3 f16 c3">List a New Token on PEGDEX</p>
                                <div className="pad">
                                    <h5 className="f2 mg0 c3 mgtb">Token Address</h5>
                                    <input type="text" placeholder="Token Contract Address" className="f16 f3 c3" onChange={(e)=>this.setState({tokenAddress:e.target.value})} />
                                    <small className="eror er">Please provide a valid account address with length 12..</small>
                                </div>
                                <div className="full pad tr bn5x">
                                   {/*  {<button className="c7 br2" onClick={()=>this.props.history.push('/Create/2',state:{tokenAddress:this.props.location.state.tokenAddress}})}>NEXT</button>} */}
                                   {<button className="c7 br2" onClick={()=>{this.props.history.push({pathname:'/Create/2',state:{tokenAddress:this.state.tokenAddress}})}}>NEXT</button>}
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
