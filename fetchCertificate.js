// fetchCertificate.js
const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const { certificateNumber } = event.queryStringParameters;

  try {
    const response = await fetch(`https://augustine-todolist.netlify.app/certificates.json`);
    const data = await response.json();
    
    if (data.certificates.includes(certificateNumber)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ valid: true, certificateNumber }),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ valid: false, certificateNumber }),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
