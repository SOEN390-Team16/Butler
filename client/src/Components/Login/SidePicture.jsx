import React from "react";
import './SidePicture.css'

// This is the Component that renders the side building in the Login. 
// Props.Children accepts any component to inserted on the element
const SidePicture = props => {

    return(
        <div className="login__picture">
               {props.children} 
           </div>
    )
}

export default SidePicture;