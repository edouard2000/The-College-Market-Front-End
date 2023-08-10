import React from "react";
import './product.css'
import conversation from '../../images/conversation.png'
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { getProduct } from "../../actions/productActions";
import { useDispatch } from "react-redux";
const Product  = (props) =>{


    function wordtransform(description){
        let toReturn = '';
        description = description.split('').map(letter =>{if(toReturn.length != 12) {toReturn += letter}});
        description = description.map
    }
    
    const id = props.id;
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    
    // const getProductHolder = getProduct(id)
    useEffect(()=>{
        dispatch(getProduct(id));
    }, [])

    return(
        <div>
            
            {console.log(props.content)}
            <div className="product" onClick={()=>{navigate(`products/${id}`)}}  >
                <img src={props.content.Image} alt="product-image" />
               <div className="product-content">
                    <h3> $ {props.content.Price.$numberDecimal
}</h3>
                    <p>{props.content.Description}</p>
               </div>
            </div>
        </div>
    )
}

export default Product;