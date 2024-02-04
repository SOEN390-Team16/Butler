import React from "react";
import './InformationHolder.css';


const InformationHolder = props => {

    return(
        <div className="information__holder__box">
            {props.children}
            
        </div>
    )
}

export default InformationHolder;
