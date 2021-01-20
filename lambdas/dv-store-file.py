import pymysql
import hashlib
import base64
import boto3
import json

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
	
def put_file_s3(fileb64, userid, filename):
	s3 = boto3.client('s3')
	
	base64_bytes = fileb64.encode('utf-8')
	file = base64.decodebytes(base64_bytes)
	
	s3.put_object(Body=file, Bucket='filles-cloud2', Key=userid + '/' + filename)
	return
	
def hash_file(data):
    	sha256 = hashlib.sha256()
    	sha256.update(data.encode('utf-8')) 
    	return sha256.hexdigest()
	
def store_file_data_rds(userid, path, hash):
	cursor = connection.cursor()
	cursor.execute("INSERT INTO files (userid, path, hash) VALUES (%(userid)s, %(path)s, %(hash)s)", {'userid': userid, 'path': path, 'hash': hash})
	connection.commit()
	
def lambda_handler(event, context):
	try:
		put_file_s3(event['File'], event['UserId'], event['Filename'])
	except:
		return response(400, 'Falha ao inserir arquivo no S3')
	try:
		store_file_data_rds(event['UserId'],event['UserId'] + '/' + event['Filename'], hash_file(event['File']))
	except:
		return response(400, 'Falha ao inserir hash do arquivo no RDS')
	return response(200, 'Arquivo inserido com sucesso')
	
 
	
