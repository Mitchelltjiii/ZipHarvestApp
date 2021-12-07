import React from 'react';
import Grid from '@material-ui/core/Grid';

function ProductForm() {
    async function getProduct(productId){
        const response = await fetch(`/get-product/${productId}`);
        const json = await response.json();
        
        return json;
    }

    async function getProducts(){
        const response = await fetch(`/get-products`);
        const json = await response.json();

        try{
            for (const val of json.data) {
                getProduct(val.id);
            }
        }catch(err){

        }
        
    }
    getProducts();

    async function getPrices(){
        const response = await fetch(`/get-prices`);
        const json = await response.json();
        let lookupKeyNum = 1;
        let nextLookupKey = "";
        try{
            for (const val of json.data) {
                if(val.lookup_key===null){
                    nextLookupKey = "lk_" + lookupKeyNum; 
                    const responseTwo = await fetch(`/set-lookup-key/${val.id}/${nextLookupKey}`);
                    lookupKeyNum++;
                    const jsonTwo = await responseTwo.json();
                }
            }
        }catch(err){

        }
    }
    getPrices();

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
