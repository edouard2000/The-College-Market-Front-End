import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { cartNumber } from "../../actions/productActions";
import cart from '../../images/cart.jpeg'
const Cart = (props)=>{

    const noContentYet =()=>{
        return(
            <div>
                <img src={cart} alt="cart-image" />
                <h2>Your Cart is Empty</h2>
                <p>Items you add will appear here</p>
            </div>
        )
    }

    const cartElements  = useSelector((store)=> {store.cartElements});

    const CartElementContainer = (props)=>{
        return(
            <div>
                <hr />
                <div className="image">
                    <img src={props.content.Image} alt="cart-image-cantainer" />
                </div>
                <div className="description">
                    <h1>{props.content.Title}</h1>
                    <h3>{props.content.Description}</h3>
                </div>
                <div className="Price">
                    <h2>{props.content.Price}</h2>
                </div>
            </div>
        )
    }
    

    const withItems = ()=>{
        return(
            <div>
                <h3>Your Shopping Cart</h3>
                {(cartElements)? cartElements.map(cartElement=>{return <CartElementContainer content = {cartElement} />})  : 'an Error hapened' }
            </div>
        )
    }

    

    return(
        <div>
            {(cartNumber!=0)? withItems : noContentYet};
        </div>
    )
}

 export default Cart;