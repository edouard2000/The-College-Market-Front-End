import React from "react";
import { Link } from "react-router-dom";
const Icon = (props)=>{

    

    return(
        <div className="icon">
            <Link className="linking" to={`/${props.action}`}> 
            <img src={props.icon} alt = {`${props.name}-icon`} />
            <p className="iconText">{props.title}</p></Link>
        </div>
    )
}

export default Icon;