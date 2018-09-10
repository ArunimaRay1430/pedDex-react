import React, { Component } from 'react'
import '../style/Tabel.css'
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

    componentDidMount = () => {
        this.tableDataFromRelay();  
    }

    // tableDataFromRelay = () =>{
    //     this.setState({ isLoading: true })
    //     axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
    //         const resp = res.data;
    //         console.log(resp,"--hey resp");
    //         this.setState({data: resp})
    //         this.setState({ isLoading: false })
    //     }, (error) => {
    //         console.log(error)
    //         this.setState({ isLoading: false })
    //     })
    // }


    tableDataFromRelay = () => {
        this.setState({ isLoading: true })
    axios({
        method: 'GET',
        url:'http://apipegdex.zero2pi.com/getreltoken',

        // headers: {
        //   'Accept': 'application/json',
        //   'Access-Control-Allow-Origin': 'http://localhost:8080',
        //   'Authorization': 'Bearer ' + addAccountDetailsToken,
        // },
  
      }).then((response) => {
        console.log("tableData---------------->",response)
        this.setState({
            data: response.data, isLoading: false
        })
      })
  
        .catch((error) => {
          console.log('errorrrrr---------->',error.response)
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
                                    <td className="inh9">Token</td>
                                    <td>Price</td>
                                    <td>Liquidity Depths</td>
                                    <td>My Balance</td>
                                    <td className="tr">
                                    <input type="checkbox" /> Hide tokens with 0 balance
                                </td>
                                </tr>
                                {this.state.data.map((value,v )=><tr key={v} className="_tokenN">
                                    <td className="inh9">
                                        <p className="mg0 f15 bd c6 f2">{value.username}</p>
                                        <p className="mg0 f13 c2">{value.name}</p>
                                    </td>
                                    <td>
                                        <p className="mg0">{value.price}</p>
                                        {/* <p className="mg0 f13 c2">$0.0300</p> */}
                                    </td>
                                    <td>
                                        <p className="mg0">{value.liquidity}</p>
                                        {/* <p className="mg0 f13 c2">$0.0300</p> */}
                                    </td>
                                    <td>
                                        <p>{value.balance}
                                            {/* <span className="sub4">{value.username}</span> */}
                                        </p>
                                    </td>
                                    <td className="tr">
                                        <button className="bySel">Buy / Sell</button>
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
