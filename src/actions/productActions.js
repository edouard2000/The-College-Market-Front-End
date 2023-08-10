import axios from "axios"
import { ActionsType, ROOT_URL } from "./useractions"

export const productActions = {
    GET_PRODUCTS : 'FETCH_PRODUCTS',
    GET_PRODUCT : 'FETCH_PRODUCT',
    GET_CART : 'GET_CART'
}

export let cartNumber = 0;


export function getProducts(){
    
    return(dispatch)=>{
        try {
            axios.get(`${ROOT_URL}products`).then(response =>{
                console.log(response);
                if(response){
                    dispatch({
                        type: productActions.GET_PRODUCTS,
                        payload : response.data
                    })
                }
            })
        } catch (error) {
            console.log(error.messsage);
        }
    }
}


export function createProduct(productFields){
    console.log('reached here before time');
    return (navigate)=>{
        console.log('reached in the navigate function');
        try {
            axios.post(`${ROOT_URL}createProduct`, (productFields), {headers : {'authorization' : localStorage.getItem('userToken')}}).then(response=>{
                if(response){
                    navigate('/')
                }
            })
        } catch (error) {
            console.log(error.messsage);
        }
    }
}

export function getProduct(){
    return (productId, dispatch)=>{
        try {
            axios.get(`${ROOT_URL}getProduct/${productId}`).then(response=>{
                if(response){
                    dispatch({
                        type: productActions.GET_PRODUCT,
                        payload: response.data
                    })
                }
            })
        } catch (error) {
            console.log(error.messsage);
        }
    }
}

export function addtoCart(userId, productId){
    return(dispatch)=>{
        try {
            axios.post(`${ROOT_URL}addtocart/${userId}?product-id: ${productId}`).then(response=>{
                if(response){
                    cartNumber++;
                    dispatch({
                        type: productActions.GET_CART, // get the products for the card
                        payload: response.data
                    })
                }
            })
        } catch (error) {
            console.log(error.messsage);
        }
    }
}


export function getRelated(category){
    return (dispatch)=>{
        axios.get(`${ROOT_URL}related/${category}`).then(response=>{
            if(response){
                dispatch({
                    type: productActions.GET_PRODUCTS,
                    payload: response.data
                })
            }
        })
    }
}


export function getCart(){
    
}