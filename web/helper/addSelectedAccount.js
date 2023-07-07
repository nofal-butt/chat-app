import axios from "axios"

const addSelectedAccount = async (session, metavalue) => {
    let output;
    const token = session.accessToken
    console.log(session)
    const shop = session.shop

    const
        requestHeader = () => ({
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip,deflate,compress",
            "X-Shopify-Access-Token": token,
        });
    const newData = JSON.stringify({
        metafield: metavalue
    })



    await axios.post(`https://${shop}/admin/api/2023-04/metafields.json`, newData, {
        headers: requestHeader()
    }).then((result) => {
        output = true
        // axios.get(`https://${shop}/admin/api/2023-04/shop.json`, {
        //     headers: {
        //         'X-Shopify-Access-Token': token
        //     }
        // })
        //     .then(response => {
        //         // Extract the merchant data from the response
        //         const merchantData = response.data.shop;

        //         // Handle the merchant data as needed
        //         console.log(merchantData, "merchant");
        //     })
        //     .catch(error => {
        //         // Handle any errors that occurred during the request
        //         console.error('Error fetching merchant data:', error);
        //     });


    }).catch(err => {
        console.log(err.message);
        output = false
    })
    return output
}

const addMerchantData = async (session) => {
    let output;
    const token = session.accessToken
    console.log(session)
    const shop = session.shop

    const
        requestHeader = () => ({
            // "Content-Type": "application/json",
            // "Accept-Encoding": "gzip,deflate,compress",
            "X-Shopify-Access-Token": token,
        });

    await axios.get(`https://${shop}/admin/api/2023-04/shop.json`, {

        headers: requestHeader()
    }).then(() => {

        // Handle the merchant data as needed
        console.log(merchantData, "merchant");

        output = merchantData
    }).catch(err => {
        console.log(err.message);
        output = false
    })
    return output

}



const Support = async (session) => {
    let output;
    const token = session.accessToken;
    const shop = session.shop;

    try {
        const response = await axios.get(`https://${shop}/admin/api/2023-04/shop.json`, {
            headers: {
                "Content-Type": "application/json",
                "Accept-Encoding": "gzip, deflate, compress",
                "X-Shopify-Access-Token": token,
            },
        });

        // console.log(response.data.shop);
        const merchantData = response.data.shop;
        output = merchantData;
    } catch (err) {
        console.log(err.message);
        output = false;
    }

    return output;
};

export { addSelectedAccount, addMerchantData, Support }
