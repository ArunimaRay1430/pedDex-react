import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class Button extends Component {
    render() {
        return (
            <div>
                <div className="row headOfBtn pad">
                    <div className="container tr c5">
                    
                    
                        
                    
                        
                       
                        <Link to={(this.props.type=="Token") ? '/Create/1' : '/Create/1'}> <button className="c5"><i className="fa fa-plus-square"></i> {`List New ${this.props.type}`}</button></Link>
                        
                    </div>
                </div>
            </div>
        )
    }
}
