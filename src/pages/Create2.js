import React, { Component } from 'react'
import '../style/Create.css';
export default class Create2 extends Component {

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
                                    <input type="text" placeholder="VeChain Token(VEN)" className="f16 f3 c3" />
                                    <h5 className="f2 mg0 c3 mgtb mgf1">VEN Deposit Amount</h5>
                                    <input type="text" placeholder="Initial Token Funding Deposit" className="f16 f3 c3" />
                                    <h5 className="f2 mg0 c3 mgtb mgf1">PEG:USD Deposit Amount</h5>
                                    <input type="text" placeholder="Initial PEG:USD Funding Deposit" className="f16 f3 c3" />
                                    <h5 className="f2 mg0 c3 mgtb mgf1">Initial Token Address</h5>
                                    <input type="text" placeholder="$0.00" className="f16 f3 c3" />
                                </div>
                                <div className="full pad tr bn5x">
                                    <button className="c7 br2" onClick={()=>this.props.history.push("/Create/3")}>NEXT</button>
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
