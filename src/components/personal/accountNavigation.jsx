import React from "react";
import { Link } from "react-router-dom";
import "./accountNavigationCss.css";

const AccountNavigation = (props)=>{
    return(
        <div className="account_navigation">
            <Link to={`/`} className = "accountLinks">The College Market</Link>
            <div className="rightLinks">
                {Object.keys(props.navContent).map(content=>{
                    return(
                        <Link to = {(props.navContent[content])} className = "accountLinks">{content}</Link>
                    )
                })}
            </div>
        </div>
    )
}

export default AccountNavigation;