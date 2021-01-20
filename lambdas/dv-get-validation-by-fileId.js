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
        
    }
    dynamodb.scan(params, function(err, data){
        if(err) {
            console.log(err);
            callback(err);
        } else {
            console.log(data);
            const valdations = data.Items.map(validation => ({ 
                validationId: validation.ValidationId.S,
                fileId: validation.FileId.S,
                result: validation.Result.BOOL,
                motivation: validation.Motivation.S,
                date: validation.Date.S
                
            }));
            callback(null, valdations);
        }
    })
};
