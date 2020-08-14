require("dotenv").config();
const axios = require("axios");

const artifact = require("@actions/artifact");
const core = require('@actions/core');

const fs = require("fs");

const { URL: linkToScan } = process.env;
const fileName = "output.json";

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
    throw new Error("The URL was not defined");  core.setFailed(`Action failed with error: The URL was not defined`);
  }
  console.log(`👀 scanning ${linkToScan}`);

  const carbonData = await axios(
    `https://api.websitecarbon.com/site?url=${linkToScan}`
  );
  console.log(carbonData.data);

  fs.writeFile(fileName, JSON.stringify(carbonData.data), (err) => {
    if (err) return console.error(err); 
  });
  const results = await artifactUp();
  
  console.log(`Using file path of ${fileName}`);
  console.log(results);
};

(async () => {
  await main();
})();
