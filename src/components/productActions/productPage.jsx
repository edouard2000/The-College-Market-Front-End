import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getProduct } from "../../actions/productActions";
import './page.css'
import { getRelated } from "../../actions/productActions";
import Product from "./product";
import { addtoCart } from "../../actions/productActions";
import Navigation from "../navigation/navigation";

const ProductPage = (props)=>{

    const navigate = useNavigate();

    let relatedContent;

    const {id} = useParams();
    console.log(id);
    const dispatch = useDispatch();

    useEffect(()=>{
       const getProductHolder = getProduct();
       getProductHolder(id, dispatch);
    }, [])

    const product = useSelector((store)=>{return store.products.single})

    const category = product.Category;

    useEffect(()=>{
        const getRelatedHolder = getRelated(category);
        getRelatedHolder(dispatch);
    }, [product])

    const relatedProdudcts = useSelector(store=>{return store.all});

    if(relatedProdudcts){
        relatedContent = relatedProdudcts.map(product =>{
            return <Product /> // pass the information here
        })
    }
    const userTokenContainer = localStorage.getItem('userToken')

    const addingToCart = addtoCart(id, (userTokenContainer)? userTokenContainer : 'nothing');

    console.log(product);



    const KeepShoppingHandler = (products)=>{
        return(
            <div className="keepShoppingHeader">
                <div className="noHr">
                    <h1 className="shoppingheadtag">Keep shopping for <br /> <h1 className="productName">{product.Name}</h1></h1>
                    {/* {(products)? products.map(product=>{
                        return(
                            <div className="shoppingProduct">
                                <img src={product.image} alt="product" />
                            </div>
                        )
                    }): ''}; */}
                    <hr />
                </div>
            </div>
        )
    }

    return(
        <div>
            <Navigation />
            <KeepShoppingHandler/>
            <div className="element">
                <div className="with-actions">
                    <div>
                        <img src={product.Image} alt="" />
                    </div>
                    <div className="actions">
                        <p>{product.Description}</p>
                        <div className="some-buttons">
                            <button className="buynow" onClick={()=>{
                                if(localStorage.getItem('userToken')){
                                    addingToCart();
                                } else{
                                    navigate('/login')
                                }
                            }}>Add to Cart</button>
                            <button className="add-to-cart" onClick={()=>{
                                if(localStorage.getItem('userToken')){
                                    // make an offer here, navigate to the prduct
                                } else{
                                    navigate('/login');
                                }
                            }}>Make an Offer</button>
                        </div>
                        <button className="buy Now"onClick={()=>{
                            if(localStorage.getItem('userToken')){
                                navigate('/checkout'); 
                                // make sure he goes with one 
                            } else{
                                navigate('/login')
                            }
                        }}>Buy Now</button>
                    </div>
                </div>
                <div className="related-products">
                    {(relatedContent)? relatedContent : 'No API call yet'}
                </div>
            </div>
        </div>
    )
}

export default ProductPage;