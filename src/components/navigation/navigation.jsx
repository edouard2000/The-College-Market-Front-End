import React, {useEffect} from "react";
import './navigation.css'
import inbox from '../../images/message.png'
import cart from '../../images/cart.png'
import tradein from '../../images/sell.png'
import account from '../../images/account.png'
import support from '../../images/support.png'
import Notice from "../../images/Notice.png"
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../components/icon";
import Subnavigation from "./subnavigation";
import { useState } from "react";
import Effect from "./effect";

const Navigation = (props) => {
    const [person, setPerson] = useState();

    const navigate = useNavigate();
    const iconsNavigation = {
        "Inbox": {
            "account/messages": inbox
        },
        "Notice": {
            "Notice": Notice,
        },
        "Post": {
            "sell": tradein
        },
        "Support": {
            "support": support
        },
        "Cart": {
            "account/cart": cart
        }
    }




    const SignInHandler = () => {
        if (localStorage.getItem('userToken')) {
            return (
                <div className="loggedIn" onClick={() => { navigate('/account') }}>
                    <p>Hello</p>
                    <h3>{person.firstName}</h3>
                </div>
            )
        } else {
            return (
                <div className="notLoggedIn" onClick={() => {
                    navigate('/account');
                }}>
                    <img src={account} alt="" className="account-image" />
                    <div className="navBeside">
                        <p className="sign-in-text">Sign in / Register</p>
                    </div>
                </div>
            )
        }
    }

   
const IconsToRender = Object.keys(iconsNavigation).map(iconKey => {
    if(iconKey === "Notice") {
        return (
            <div className="dropdown">
                <Icon name='name' icon={iconsNavigation[iconKey][Object.keys(iconsNavigation[iconKey])[0]]} action={Object.keys(iconsNavigation[iconKey])[0]} title={iconKey} />
                <div className="dropdown-content">
                    <Link to="/post-announcement">Post Announcement</Link>
                    <Link to="/view-announcements">View Announcements</Link>
                </div>
            </div>
        );
    }
    return <Icon name='name' icon={iconsNavigation[iconKey][Object.keys(iconsNavigation[iconKey])[0]]} action={Object.keys(iconsNavigation[iconKey])[0]} title={iconKey} />;
})

    return (
        <>
                    <div className='navigationBar bg-lime-800 flex flex-row'>

                        <div className="iconbar">
                        <div className="logo">
                        <Link to="/" className="linking">The College Market</Link>
                        </div>
                        <div className="searchContainer">
                        <div className="searchWrap">
                            <input type="text" className="searchBar" placeholder="Search..." />
                            <button className="searchButton"><i className="fa fa-search"></i></button>
                        </div>
                        </div>
                        <div className="iconContainer">
                        <div className="icons">
                            {IconsToRender}
                        </div>
                        </div>
                        <SignInHandler />
                        </div>
                        <Subnavigation />
                        <Effect  />

                    </div>
        </>
       
    )

}

export default Navigation;
