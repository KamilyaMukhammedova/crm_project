const {DeleteObjectCommand} = require('@aws-sdk/client-s3');
const {client} = require('../constants');


class RemoveFileService {
  async deleteFile(key) {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });

    try {
      await client.send(command);
      console.log('Successfully deleted.');
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new RemoveFileService();