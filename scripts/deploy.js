#!/usr/bin/env node

const child_process = require("child_process");
const axios = require("axios");

function deploy() {
  const moduleName = process.argv[2];

  if (!moduleName) {
    console.error("Provide module name");
    process.exit(1);
  }

  const deployedUrl = child_process
    .execSync("now | grep https")
    .toString()
    .trim();

  console.log("deployed URL:", deployedUrl);

  const jsUrl = deployedUrl + "/bundle.js";

  axios
    .get(`http://localhost:5657/modules/${moduleName}`)
    .then(response => {
      const doc = response.data;

      return axios.patch(`http://localhost:5657/modules/${doc.id}`, {
        ...doc,
        jsUrl,
        version: doc.version + 1
      });
    })
    .then(() => {
      console.log("updated module registry successfully");
    })
    .catch(e => {
      console.error("error: ", e);
    });
}

deploy();
