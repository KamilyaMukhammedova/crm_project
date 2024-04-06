const {S3Client} = require("@aws-sdk/client-s3");

module.exports = {
  GENERAL_ROUTE_PATH: '/api/v1/admin',
  GENERAL_AUTH_ROUTE_PATH: '/api/v1/users',
  CLASSIFICATORS_ROUTE_PATH: '/api/v1/classificators',
  client: new S3Client({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
    region: process.env.S3_REGION
  })
};