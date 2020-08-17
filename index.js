require("dotenv").config();
const axios = require("axios");

const artifact = require("@actions/artifact");
const core = require('@actions/core');

const fs = require("fs");

const { URL: linkToScan } = process.env;
const fileName = "output.json";

const getReadme = (percentage) => {
    const fileToEdit = 'README.md';
    fs.readFile(fileToEdit, 'utf8', function (err,data) {
        if(err)
            return console.log(err);
        let toWrite;
        if (data.includes("<!-- CARBON-STATS -->")) {
          toWrite = data.replace("<!-- CARBON-STATS -->", `![carbon consumption of this project](https://green-action.vercel.app/api/card?p=${percentage})`);
        } else if(data.includes("![carbon consumption of this project](https://green-action.vercel.app/api/card?p=")) {
          const r = new RegExp("\/api\/card\\?p=[0-9]{1,3}", "g");
          toWrite = data.replace(r, `/api/card?p=${percentage}`);
        }
        fs.writeFile(fileToEdit, toWrite ,(errW) => {
          if(errW) return console.error(errW); 
        });

    });
}

const artifactUp = async () => {
  const artifactClient = artifact.create();
  const artifactName = "carbon";
  const files = [fileName];

  const rootDirectory = "."; // Also possible to use __dirname
  const options = {
    continueOnError: false,
  };

  const results = await artifactClient.uploadArtifact(
    artifactName,
    files,
    rootDirectory,
    options
  );
  return results;
};



const main = async () => {
  if(!linkToScan){
    core.setFailed(`Action failed with error: The URL was not defined`);
    throw new Error("The URL was not defined");  
  }
  console.log(`👀 scanning ${linkToScan}`);

  const carbonData = await axios(
    `https://api.websitecarbon.com/site?url=${linkToScan}`
  );
  console.log(carbonData.data);

  fs.writeFile(fileName, JSON.stringify(carbonData.data), (err) => {
    if (err) return console.error(err); 
  });
  getReadme(carbonData.data.cleanerThan * 100);
  const results = await artifactUp();
  
  console.log(`Using file path of ${fileName}`);
  console.log(results);
};

(async () => {
  await main();
})();
