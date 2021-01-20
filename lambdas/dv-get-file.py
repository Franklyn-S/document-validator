import pymysql
 

#Configuration Values
endpoint = 'cloud2.c6effzn79zrk.us-east-1.rds.amazonaws.com'
username = 'postgres'
password = 'postgres'
database_name = 'cloud2'
 
#Connection
connection = pymysql.connect(host= endpoint, user=username,password=password, database=database_name)

	
def lambda_handler(event, context):
	print(event)
	userid = event['userId']
	cursor = connection.cursor()
	cursor.execute("SELECT id, path from files where userid=%(userid)s", {'userid':userid})
 
	result_dicts = list()
	rows = cursor.fetchall()
	keys = ['FileId', 'Path']
 
	for row in rows:
		result_dicts.append(dict(zip(keys, row)))
	return result_dicts
