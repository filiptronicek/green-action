require("dotenv").config();
const axios = require("axios");

const { URL: linkToScan } = process.env;


const main = async () => {
    console.log(`👀 scanning ${linkToScan}`);
    
    const carbonData = await axios(`https://api.websitecarbon.com/site?url=${linkToScan}`);
    console.log(carbonData.data);
};

(async () => {
  await main();
})();
