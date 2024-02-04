import React from "react";
import './InformationHolder.css';


const InformationHolder = props => {

// The infromation holder is a component that holds the content for all the sign up option
// In other words, its the "white card" div thats holding all the information like sign in, sign up

    return(
        <div className="information__holder__box">
            {props.children}
            
        </div>
    )
}

export default InformationHolder;
