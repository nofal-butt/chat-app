import axios from "axios";

const addSelectedAccount = async (session, metavalue) => {
  let output;
  console.log(session);
  const token = session.accessToken;
  const shop = session.shop;

  const requestHeader = () => ({
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip,deflate,compress",
    "X-Shopify-Access-Token": token,
  });
  const newData = JSON.stringify({
    metafield: metavalue,
  });

  await axios
    .post(`https://${shop}/admin/api/2023-04/metafields.json`, newData, {
      headers: requestHeader(),
    })
    .then((result) => {
      output = true;
    })
    .catch((err) => {
      console.log(err.message);
      output = false;
    });
  return output;
};

export { addSelectedAccount };
