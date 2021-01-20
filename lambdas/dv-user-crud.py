import pymysql
import json
import requests


# Configuration Values
endpoint = 'cloud2.c6effzn79zrk.us-east-1.rds.amazonaws.com'
username = 'postgres'
password = 'postgres'
database_name = 'cloud2'

# Connection
connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)


def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
        },
    }


def lambda_handler(event, context):
	print(event)
	cursor = connection.cursor()
	try:
		operation = event['httpMethod']
#	operation = "2"
	except:
		operation = None
	
	if operation == 'GET' or operation == None:
		try:
			cursor.execute('SELECT * from users')
			response = cursor.fetchall()
			transactionResponse = {}
			transactionResponse['message'] = 'Usuarios encontrados com sucesso'
			responseObject = {}
			responseObject['statusCode'] = 200
			responseObject['headers'] = {}
			responseObject['headers']['Content-Type'] = 'application/json; charset=utf-8'
			responseObject['data'] = response
			
			return responseObject
		except:
			transactionResponse = {}
			transactionResponse['message'] = 'Usuarios não encontrados'
			responseObject = {}
			responseObject['statusCode'] = 400
			responseObject['headers'] = {}
			responseObject['headers']['Content-Type'] = 'application/json; charset=utf-8'
			responseObject['data'] = transactionResponse
			return responseObject
	
	if operation == 'POST':
		try:
			insert_id = event['id']
			name = event['name']
			username = event['username']
			password = event['password']
			email = event['email']
			print(email)
			cursor.execute('INSERT INTO users (id, name, username, password, email) VALUES ("{}", "{}", "{}", "{}","{}")'.format(insert_id,name,username,password,email))
			connection.commit()
		
			transactionResponse = {}
			transactionResponse['message'] = 'Usuario inserido com sucesso'
			responseObject = {}
			responseObject['statusCode'] = 200
			responseObject['headers'] = {}
			responseObject['headers']['Content-Type'] = 'application/json; charset=utf-8'
			responseObject['data'] = transactionResponse
			return responseObject
			
		except:
			transactionResponse = {}
			transactionResponse['message'] = 'Nao foi possivel inserir o usuario'
			responseObject = {}
			responseObject['statusCode'] = 400
			responseObject['headers'] = {}
			responseObject['headers']['Content-Type'] = 'application/json; charset=utf-8'
			responseObject['data'] = transactionResponse
			return responseObject

	if operation == 'PUT':
		try:
			id_update = event['id']
			update_name = event['name']
			update_user_name = event['username']
			update_password = event['password']
			update_email = event['email']
		
			cursor.execute('UPDATE users SET name="{}", username="{}", password="{}", email="{}" WHERE id = {}'.format(update_name,update_user_name,update_password,update_email,id_update))
			connection.commit()
			transactionResponse = {}
			transactionResponse['message'] = 'Usuario atualizado com sucesso'
			responseObject = {}
			responseObject['statusCode'] = 200
			responseObject['headers'] = {}
			responseObject['headers']['Content-Type'] = 'application/json; charset=utf-8'
			responseObject['data'] = transactionResponse
			return responseObject
		except:
			connection.rollback()
			transactionResponse = {}
			transactionResponse['message'] = 'Nao foi possivel atualizar o usuario'
			responseObject = {}
			responseObject['statusCode'] = 400
			responseObject['headers'] = {}
			responseObject['headers']['Content-Type'] = 'application/json; charset=utf-8'
			responseObject['data'] = transactionResponse
			return responseObject
		
	if operation == 'DELETE':
		
		id_delete = event['id']
		body = {}
		files_dict = requests.get("https://ej2do4qkik.execute-api.us-east-1.amazonaws.com/dev/file/" + str(id_delete), data=body)
		payload = {'FileId': 
		 	payload = {'json_payload': data_json}
		 lambda_response = requests.delete('https://ej2do4qkik.execute-api.us-east-1.amazonaws.com/dev/file/', data=payload)
		
		
		 try:
			
		 	cursor.execute(f'DELETE FROM users where id = {id_delete}')
		 	connection.commit()
		 	transactionResponse = {}
		 	transactionResponse['message'] = 'Usuario deletado com sucesso'
		 	responseObject = {}
		 	responseObject['statusCode'] = 200
		 	responseObject['headers'] = {}
		 	responseObject['headers']['Content-Type'] = 'application/json; charset=utf-8'
		 	responseObject['data'] = transactionResponse
		 	return responseObject
		 except:
		 	transactionResponse = {}
		 	transactionResponse['message'] = 'Nao foi possivel deletar o usuario'
		 	responseObject = {}
		 	responseObject['statusCode'] = 400
		 	responseObject['headers'] = {}
		 	responseObject['headers']['Content-Type'] = 'application/json; charset=utf-8'
		 	responseObject['data'] = transactionResponse
		 	return responseObject
