import pymysql
import boto3
import json
import hashlib
import random
import datetime

 
#Configuration Values
endpoint = 'cloud2.c6effzn79zrk.us-east-1.rds.amazonaws.com'
username = 'postgres'
password = 'postgres'
database_name = 'cloud2'
 
#Connection
connection = pymysql.connect(host= endpoint, user=username,password=password, database=database_name)

def response(code, message):
	transactionResponse = {}
	transactionResponse['message'] = message
	responseObject = {}
	responseObject['statusCode'] = code
	responseObject['headers'] = {}
	responseObject['headers']['Content-Type'] = 'application/json; charset=utf-8'
	responseObject['body'] = json.dumps(transactionResponse)
	return responseObject
	

def put_validation(result, fileid, motivation):
	dynamodb = boto3.resource('dynamodb')
	table = dynamodb.Table('validations')
	dynamo_response = table.put_item(
		Item={
			'ValidationId': 'validation_' + str(random.randint(0,666)), #TODO query the database for the last id and increment it
			'Date': str(datetime.datetime.now()),
			'FileId': fileid,
			'Motivation': motivation,
			'Result': result
		}
	)
	return dynamo_response

def fetch_file_hash(fileid):
	cursor = connection.cursor()
	cursor.execute("SELECT hash from files where id=%(fileid)s", { 'fileid' : fileid})
	
	return (cursor.fetchall())[0][0] #TODO make this simpler

def hash_file(data):
    	sha256 = hashlib.sha256()
    	sha256.update(data.encode('utf-8')) 
    	return sha256.hexdigest()
    	
def lambda_handler(event, context):

	try:
		or_hash =  fetch_file_hash(event['FileId'])
		file_hash = hash_file(event['File'])
	except:
		return response(400, "Falha ao adquirir hashes")
	
	
	try:
		if(or_hash == file_hash):
			put_validation('true', event['FileId'], event['Motivation'])
			return response(200, "Documento validado com sucesso")
		else:
			put_validation('false', event['FileId'], event['Motivation'])
			return response(200, "Documento nao e o mesmo")
	except:
		return response(400, "Nao foi possível validar o documento")
	
	
		
		
	
