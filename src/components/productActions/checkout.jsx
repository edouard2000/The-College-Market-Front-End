import React from 'react'
import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const Checkout = ()=>{
    const [checkoutProducts, setCheckoutProducts] = useState();
    const [PaymentInformation, SetPaymentInformation] = useState();
    const [numberOfItems, setNumberOfItems] = useState(0);
    
    // how do we get the info for her 
    function renderPaymentMethods(methods){
        methods.map(method=>{
            return(
                <div>
                    {method.address}
                </div>
            )
        })
    }

    const placeOrder = ()=>{
        // handle payment here
    }
    // style according to the container
    const orderButton =()=>{
        return <input type="button" value='Place your order' className='orderButton' onClick={placeOrder}/>
    }

    const getTotalCost= ()=>{
        return 0 + checkoutProducts.map(product=>{return product.prouctPrice})
    }

    const renderCheckoutProduct = (products)=>{
        products.map(product=>{
            return <div>
                <div>
                    <img src={product.image} alt="product-image" />
                    <div className="description">
                        {product.description}
                    </div>
                </div>
            </div>
        })
    }
// make it fixed position
    const checkoutCard = ()=>{
        return(
            <div className="bodyRight">
                {orderButton}
                By placing Order, you agree to our <Link className='termsOfUse' to='termsofUse'>Terms of Use</Link> and <Link to='privacyNotice'>Privacy Notice</Link>
                <hr />
                <h2>Order Summary</h2>
                <p>Items(${numberOfItems} : ${getTotalCost})</p>
                <ul className='descriptionList'>{checkoutProducts.map(product=>{return <li>`${product.name} : ${product.productPrice}`</li>})}</ul>
            </div>
        )
    }
// This is the sideCard
    const checkoutBody = (products)=>{
        return(
            <div className=''>
                <div className="body">
                    <div className="bodyLeft">
                        <div className="BillingInformations">
                            <h2>Payment Method</h2>
                            <div className="adress">
                                {renderPaymentMethods}
                            </div>
                        </div>
                        <div className="reviewItems">
                            {renderCheckoutProduct};
                        </div>
                    </div>
                    {checkoutCard}
                </div>
                {orderButton} 
            </div>
        )
    }

    

    return(
        <div>
            <div className='CheckoutNavigation'>
                <Link to='/'>Dartmouth market</Link>
                <h2>Checkout (${numberOfItems})</h2>
            </div>
            <div className='bodyContent'>
                {checkoutBody}
            </div>
        </div>
    )
}

export default Checkout;