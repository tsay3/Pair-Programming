import AWS from "aws-sdk";

AWS.config.update({
    region: "local",
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx',
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();
export default async function getFromDatabase() {
    try {
        const params = {
            TableName: "Programs",
        };
        const scanResults = [];
        let items;
    do{
        items =  await docClient.scan(params).promise();
        items.Items.forEach((item) => {
            if (item.id == 123) {
                scanResults.push(item);
            }
        });
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");
    
    return scanResults;
     } catch(err) {
        console.log(err);
     }
}
