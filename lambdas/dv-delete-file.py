import pymysql
import hashlib
import base64
import boto3
import json
import requests

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
	responseObject['data'] = transactionResponse
	return responseObject
	
def delete_file_s3(path):
	s3 = boto3.client('s3')
	s3.delete_object(Bucket='filles-cloud2', Key=path)
	return
	
def delete_file_data_rds(fileid):
	cursor = connection.cursor()
	cursor.execute("DELETE FROM files WHERE id=%(fileid)s", {'fileid': fileid})
	connection.commit()

def get_file_path_rds(fileid):
	cursor = connection.cursor()
	cursor.execute("SELECT path FROM files WHERE id=%(fileid)s", {'fileid': fileid})
	return (cursor.fetchall())[0][0] #TODO make this simpler
	
def lambda_handler(event, context):
	
	try:
		path = get_file_path_rds(event['FileId'])
		delete_file_s3(path)
	except:
		return response(400, 'Falha ao remover arquivo do S3')
	
	try:
		delete_file_data_rds(event['FileId'])
	except:
		return response(400, 'Falha ao remover arquivo no RDS')
	try:
		lambda_response = requests.delete('https://khce4i3yp3.execute-api.us-east-1.amazonaws.com/dev/validation/' + event['FileId'])
	except:
		return response(400, 'Falha ao remover validacoes do arquivo')
	return response(200, 'Arquivo removido com sucesso')
	
 
	
