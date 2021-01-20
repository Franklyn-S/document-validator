const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10' });
    

exports.handler = (event, context, callback) => {
    const params = {
        ExpressionAttributeValues: {
           ":fileId": {
               S: event.fileId
           }
        },
        TableName: "validations",
        FilterExpression: "FileId = :fileId",
    };
    

    let validationsKeysToDelete = [];
    dynamodb.scan(params, function(err, data){
       if (err) {
           console.log(err);
           callback(err);
       } else {
           console.log(data);
           validationsKeysToDelete = [... data.Items.map(validation => validation.ValidationId.S)];
           console.log(validationsKeysToDelete)
           const params = {
               RequestItems: {
                   'validations': validationsKeysToDelete.map( validationId => ({
                       DeleteRequest: {
                            Key: {
                                "ValidationId": {
                                    S: validationId
                                }
                            }
                        }
                    }))
               }
            };
            dynamodb.batchWriteItem(params, function(err, data) {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log(data);
                    callback(null, data);
                }
                
            })   
       }
       
    });
};
