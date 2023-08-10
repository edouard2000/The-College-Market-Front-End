import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import profileHolder from '../../images/profileHolder.jpeg'
import AccountNavigation from "./accountNavigation";
import './account.css'; 

const Account = (props) => {
    
    const [Profile, setProfile] = useState();
    const [userId, setUSerid] = useState();

    const personalLinksFunctions = {
        "Personal information": {
            "My profile": function () { },
            "Upload profile picture": function () { },
            "Email preferences": function () { },
            "Browsing History": function () { },
            "Request My information": function () { },
            "Privavy settings": function () { },
        },
        "Security information ": {
            'Change email adress': function () { console.log('something to be called'); },
            'Change Password': function (password) { console.log(password) },
            'Set security Questions ': function () { console.log('setting security questions'); },
            'Manage verifications Phones': function () { console.log('managing phones'); },
            'Manage connected accounts': function () { console.log('managing account'); },
            "Close your account": function () { }

        },
        "Finance information": {
            "My transactions": function () { },
            "Logistics": function () { },
            "Payment Methods": function () { }
        }
    }

    const returnComponents = Object.keys(personalLinksFunctions).map(key => {
        return (
            <div className="detail">
                <h4 className="head_content">{key}</h4>
                <hr className="horizontaldetail" />
                {Object.keys(personalLinksFunctions[key]).map(component => {
                    return <Link className="link">{component}</Link>
                })}
            </div>
        )

    });
   

    console.log(returnComponents);

    return (
        <div>
            <AccountNavigation navContent={{
                "Messages": 'messages',
                "My trading dashboard": "account/trading_index"
            }} />
            <div className="accountPage">
                <div className="accountCard">
                    <div className="heading">
                        <div className="partOne">
                            <img src={(Profile) ? Profile : profileHolder} alt="personalImage" height='20%' className="profileImage" />
                        </div>
                        <div className="partTwo">
                            <h4 className="head_content">Your member id:  <span className="userId">some user id here; to be handled</span></h4>
                            <h4 className="head_content">Email :  <span className="spanning_element_email">some email here<Link className="changeButton">Change emial address</Link></span></h4>
                            <h4 className="head_content">Linked Mobile: <span className="spanning_element">some phone number here<Link className="changeButton">Change phone number</Link></span></h4>
                        </div>
                    </div>
                    <hr className="horizontal" />
                    <div className="details">
                        {returnComponents}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;
