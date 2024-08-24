from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import boto3
from boto3.dynamodb.conditions import Key

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r'*': {'origins': '*'}})
users = []
roomID = ''

dynamodb_client = boto3.client('dynamodb', region_name="local")

class Code(Resource):
    def get(self, roomID):
        response = dynamodb_client.query(
            TableName="Programs",
            KeyConditionExpression='id = :roomID',
            ExpressionAttributeValues={
                ':roomID': {'N': roomID}
            }
        )
        print(response['Items'])
        return response['Items']
        file1 = open("room123.txt", "r+")
        return file1.read()
    def post(self):
        parser = reqparse.RequestParser()
        
        parser.add_argument('code', required=True) 
        
        args = parser.parse_args()
        
        file1 = open("room123.txt", "w")
        file1.write(args["code"])
        file1.close()

class Users(Resource):
    def get(self):
        return users
    def post(self):
        parser = reqparse.RequestParser()
        
        parser.add_argument('name', required=True) 
        parser.add_argument('roomID', required=True)
        
        args = parser.parse_args()
        users.append({
            "name": args["name"],
            "roomID": args["roomID"]
        })

        return 1

api.add_resource(Users, '/users')
api.add_resource(Code, '/code/<string:roomID>')

if __name__ == "__main__": #this is the main function
    app.run(debug=True)