import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function ProductForm() {

    //const [email, setEmail] = React.useState('');

    /*const handleFacilityName = (event) => {
        setFacilityName(event.target.value);
    };

    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordAgain = (event) => {
        setPasswordAgain(event.target.value);
    };*/
    async function getProduct(productId){
        console.log("Try to get product");
        const response = await fetch(`/get-product/${productId}`);
        const json = await response.json();
        try{
          console.log("product json: " + json);
        }catch(err){
  
        }
        try{
          console.log("Product json(STRING): " + JSON.stringify(json));
        }catch(err){
      
        }
        return json;
    }

    async function getProducts(){
        console.log("Get Products");
        const response = await fetch(`/get-products`);
        const json = await response.json();
        try{
          console.log("products json: " + json);
        }catch(err){
      
        }
        try{
          console.log("Products json(STRING): " + JSON.stringify(json));
        }catch(err){
          
        }

        try{
            for (const val of json.data) {
                console.log("product x val: " + val);
                console.log("product x val(STRING): " + JSON.stringify(val));
                console.log("Val ID: " + val.id)
                getProduct(val.id);
            }
        }catch(err){

        }
        
    }
      
      console.log("Before getproducts");
    getProducts();
    console.log("After getproducts");

    async function getPrice(priceId){
        console.log("Try to get price");
        const response = await fetch(`/get-price/${priceId}`);
        const json = await response.json();
        try{
          console.log("price json: " + json);
        }catch(err){
  
        }
        try{
          console.log("price json(STRING): " + JSON.stringify(json));
        }catch(err){
      
        }
        return json;
    }

    async function getPrices(){
        console.log("Get Prices");
        const response = await fetch(`/get-prices`);
        const json = await response.json();
        try{
          console.log("prices json: " + json);
        }catch(err){
      
        }
        try{
          console.log("Prices json(STRING): " + JSON.stringify(json));
        }catch(err){
          
        }

        let lookupKeyNum = 1;
        let nextLookupKey = "";
        try{
            for (const val of json.data) {
                console.log("price x val: " + val);
                console.log("price x val(STRING): " + JSON.stringify(val));
                console.log("Val ID: " + val.id)
                console.log("Val lookup-key: " + val.lookup_key)
                if(val.lookup_key===null){
                    nextLookupKey = "lk_" + lookupKeyNum; 
                    const responseTwo = await fetch(`/set-lookup-key/${val.id}/${nextLookupKey}`);
                    lookupKeyNum++;
                    const jsonTwo = await responseTwo.json();
                    try{
                        console.log("setlookup json: " + jsonTwo);
                      }catch(err){
                    
                      }
                      try{
                        console.log("setlookup json(STRING): " + JSON.stringify(jsonTwo));
                      }catch(err){
                        
                      }
                }
            }
        }catch(err){

        }
    }
      
      console.log("Before getprices");
    getPrices();
    console.log("After getprices");

    let formWidth = "450px";
    let formHeight = "250px";

	return (
		<div id="products-form" style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
			<Grid
				container
				direction="column"
  				justifyContent="center"
				alignItems="center"
			>

                </Grid>
		</div>
	);
}

export default ProductForm;
