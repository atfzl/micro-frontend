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
    .execSync('now | grep https')
    .toString()
    .trim();

  console.log("deployed URL:", deployedUrl);

  const jsUrl = deployedUrl + '/bundle.js';

  axios
    .post("http://localhost:5984/micro-frontend/_find", {
      selector: {
        moduleName: {
          $eq: moduleName
        },
        active: {
          $eq: true
        }
      }
    })
    .then(response => {
      const doc = response.data.docs[0];

      return axios.put(`http://localhost:5984/micro-frontend/${doc._id}`, {
        ...doc,
        jsUrl
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
