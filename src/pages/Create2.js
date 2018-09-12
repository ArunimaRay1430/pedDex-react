import React, { Component } from 'react'
import '../style/Create.css';
import Create from './Create'
export default class Create2 extends Component {
    constructor(props){
        super(props);
        this.state={
            tokenAddress : this.props.location.state.tokenAddress,
            tokenSymbol:'',
            numberOfToken:'',
            pegDiposit:'',
            weight :'',
            fields: {},
           errors: {},
        };
        console.log("address----",this.props.location.state.tokenAddress);
    }
    
        firstMethod(e) {
            const re = /[A-Z]/;
            if (!re.test(e.key)) {
              e.preventDefault();
            }
          };

          secondMethod(e) {
            const re = /[0-9,.]/;
            if (!re.test(e.key)) {
              e.preventDefault();
            }
          };

    render() {
        return (
            <div>
                <div className="row createToken pad">
                    <div className="container c5 nopad">
                        <div className="ui-lg-6 npl">
                            <div className="ui-lg-12 sh w b2 br2 tokenadd nopad">
                                <p className="c5x mg0 pad f3 f16 c3">List a New Token on PEGDEX</p>
                                <div className="pad">
                                    <h5 className="f2 mg0 c3 mgtb">Token</h5>
                                    <input ref="token" onKeyPress={(e) => this.firstMethod(e)} type="text" placeholder="Token-Symbol" className="f16 f3 c3" onChange={(e)=>this.setState({tokenSymbol:e.target.value})}   />
                                    
                                    <h5 className="f2 mg0 c3 mgtb mgf1">Number Of Token</h5>
                                    <input type="text" onKeyPress={(e) => this.secondMethod(e)} placeholder="number of token to be created"   className="f16 f3 c3" onChange={(e)=>this.setState({numberOfToken:e.target.value})} />
                                    <h5 className="f2 mg0 c3 mgtb mgf1">PEG:USD Deposit Amount</h5>
                                    <input type="text" onKeyPress={(e) => this.secondMethod(e)} placeholder="Initial PEG:USD Funding Deposit" className="f16 f3 c3" onChange={(e)=>this.setState({pegDiposit:e.target.value})} />
                                    <h5 className="f2 mg0 c3 mgtb mgf1">Weight</h5>
                                    <input type="text" onKeyPress={(e) => this.secondMethod(e)} placeholder="connectorWeight" className="f16 f3 c3" onChange={(e)=>this.setState({weight:e.target.value})}/>
                                </div>
                                <div className="full pad tr bn5x">
                                    {/* <button className="c7 br2" onClick={()=>this.props.history.push({pathname:'/Create/3',state:{tokenSymbol:this.state.tokenSymbol, numberOfToken:this.state.numberOfToken,pegDiposit:this.state.pegDiposit}})}>NEXT</button> */}

                                    {<button className="c7 br2" onClick={()=>{this.props.history.push({pathname:'/Create/4',state:{tokenSymbol:this.state.tokenSymbol, numberOfToken:this.state.numberOfToken,pegDiposit:this.state.pegDiposit,weight : this.state.weight , tokenAddress : this.props.location.state.tokenAddress}})}}>NEXT</button>}
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
