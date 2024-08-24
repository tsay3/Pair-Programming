import AWS from "aws-sdk";

AWS.config.update({
    region: "local",
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx',
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

export default function saveToDatabase(content, roomID) {
    console.log(`Save: ${content}`)
    var params = {
        TableName: "Programs",
        Item: {
            "id": roomID,
            "code": content,
        }
    };

    docClient.put(params, function(err, data) {
           if (err) {
               console.error(err);
           }
        });        
}