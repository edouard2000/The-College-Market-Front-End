import React, { useState } from "react";
import { createProduct } from "../../actions/productActions";
import { useNavigate } from "react-router";
import { uploadToAmazon } from "../../services/amazon-front";
import './createProduct.css'
import productCategories from '../../categories/productCategories.json'
import AccountNavigation from "../personal/accountNavigation";

const CreateProduct = ()=>{
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState('')
    const [productPrice, setProductPrice] = useState();
    const [preview, setPreview] = useState();
    const [productCondition, setCondition] = useState('');
    const [Productpurpose, setPurpose] = useState('');
    const [productCategory, setCateogory] = useState('')


    function changeCondition(conditionText){
        setCondition(conditionText);
    }
    
    const conditions = {
        NEW : ['NEW', 'New with tags (NWT). Unopened packaging. Unused.'],
        LIKE_NEW : ['LIKE_NEW', 'New without tags (NWOT). No signs of wear. Unused.'],
        GOOD : ['GOOD', 'Gently used. One / few minor flaws. Functional.'],
        FAIR : ['FAIR', 'Used, functional, multiple flaws / defects.'],
        POOR : ['POOR', 'Major flaws, may be damaged, for parts.']
    }


    function handleSelection(){
        const labels = document.getElementsByClassName('conditionOption');
        const inputs = document.querySelectorAll('input[type="radio"]')
        for(let i = 0; i<inputs.length; i++){
            if(inputs[i].checked){
                labels[i].style.cssText = 'background-image : #EFF5EE; border  : 1px solid green; color : green; font-size : smaller;';
                changeCondition(labels[i].querySelector('h3').textContent);
            } else{
                labels[i].style.cssText = 'font-size : smaller'
            }
        }
    }

    const RenderConditions = (props) => {
        return(
            <div className="conditions">
                {Object.keys(props.conditions).map(condition=>{
                    return(
                        <label name = {condition}  className="conditionOption" style={{
                            fontSize : '10px',
                        }}>
                            <h3 className="h3_heading">{conditions[condition][0]}</h3>
                            <p className="heading_p">{conditions[condition][1]}</p>
                            <input type="radio"  name = 'conditionOption' onClick={handleSelection}/>
                        </label>
                    )
                })}
            </div>
        )
    }

    const purposes  = {
        SELL : "SELL",
        RENT : "RENT",
        DONATE : "DONATE"
    }

    const onuploadImage = (event)=>{
        const file = event.target.files[0];
        if(!file) alert('please select an image');
        setPreview({preview: window.URL.createObjectURL(file), file})
    }

    function setPrice(event){
        setProductPrice(event.target.value)
    }

    const createProductHolder = createProduct({Name: productName, Image: productImage, Description: productDescription, productCategory: productCategory, Price: productPrice, productCondition: productCondition, Productpurpose: Productpurpose});

    const navigate = useNavigate();



    return(
        <div className="sell">
            <AccountNavigation navContent={{
                "Messages": 'messages',
                "My trading dashboard": "account/trading_index"
            }}/>
            <h1 className="heading_content"></h1>
            <div className="labels">
            <label htmlFor="">Select the item photo</label>
                <div className="chooseImage">
                    <div className="chooseInput">
                        <input type="file" name="Image-upload" id="images" multiple onChange={onuploadImage} accept = 'image/*' className="chooseImageInput"/>
                    </div>
                    <img src={(preview) ? preview.preview : ''} alt="" height='2rem'/>
                </div>
                <label htmlFor="productName">
                    <p>Title</p>
                </label>
                <input type="text" name="productName" id="title" onChange={(event)=>{setName(event.target.value)}} placeholder = "What are you selling"/>

                <label htmlFor="">
                    Description
                </label>
                <textarea name="description" className="description" id="description" cols="94" rows="10" placeholder="Describe your item"/>
                <label style={{
                    marginTop : '1rem'
                }}>Product Category</label>
                <select name="categories" id="categories" onChange={(event)=>{setCateogory(event.target.value)}}>
                    <option value="" disabled>select product category</option>
                    {Object.keys(productCategories).map(category=>{
                        if(category != 'Men' && category != "Women" && category != "Quick Deals"){
                            return <option value={category}>{category}</option>
                        }
                    })}
                </select>
                <label htmlFor="">
                   <p className="condition_head">Condition</p>
                </label>
                <RenderConditions conditions = {conditions}  />
                <p style={{
                    marginTop : '1rem',
                    fontSize: "1rem",
                    fontWeight: "600"
                }}>Please proceed with selling, renting, or donating</p>
                <select name="purpose" id="purpose" placeholder="select the purpose" onChange={(event)=>{setPurpose(event.target.value)}}>
                    <option value="none">Select purpose</option>
                    {Object.keys(purposes).map(purposeOption=>{
                        return <option value={purposeOption}>{purposeOption}</option>
                    })}
                </select>
                <label htmlFor="">
                    <p className="condition_head" style={{
                        marginBottom : '1rem'
                    }}>Set the Price</p>
                    <input type="text" name="" id="price" onChange={(event)=>{setPrice(event.target.value)}} placeholder="Set your price"/>
                </label>
                <input type="button"  className="createProductButton"  name="" id="" value='Create' onClick={()=>{
                uploadToAmazon(preview.file).then(url=>{
                    setProductImage(url);
                    createProductHolder(navigate);
                })
            }}/>
        </div>
            
        </div>
    )
}

export default CreateProduct;