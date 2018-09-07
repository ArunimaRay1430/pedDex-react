import React, { Component } from 'react'
import '../../style/Header.css';
import Button from '../button/Button';
import { Link } from "react-router-dom";
import {scatterLogin} from "../../utils/methods"

var scatter = {};
export default class Header extends Component {
    constructor(){
        super();
        this.state={
             login:"login",
             scatterAvailable:false,
        }
    }
   componentWillMount() {
    //    console.log("scat",documenscatter.identity);
       document.addEventListener('scatterLoaded', scatterExtension => {

        scatter = window.scatter;
        if(scatter.identity)
        {
            console.log("1==============")
            this.setState({login:"Logout"})
            this.setState({scatterAvailable:true});
        }
        else{
            console.log("2==========")
            this.setState({login:"Login"})
        }
        console.log("scatter inside",scatter)
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
                            <div style={{display:"flex"}}>
                            <button>Search</button>
                            <button onClick={()=>this.login()}>{this.state.login}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /*------------If scatter Not Available then show------------*/}
                { !this.state.scatterAvailable ? <div className="container">
                    <div className="dangerLogIn ui-lg-12">
                        <p className="mg0">Please login with scatter</p>
                    </div>
                </div>: null}
            </div>
        )
    }

    async login(){
        if(scatter.identity){
            scatter.forgetIdentity().then(() => {
                this.setState({login:"Login"})
            });
            
        }else{
            scatterLogin((err,value)=>{
                this.setState({login:"Logout"})
            })
            
        }
    }
}
