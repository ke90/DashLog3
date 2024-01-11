import mysql.connector
import os

class Dbconnection():

	def __init__(self):
		print("connection")
	
class MYSQL(Dbconnection):
	def __init__(self):

		self.ip = os.environ.get("SQL_HOST","127.0.0.1")
		self.pw = os.environ.get("SQL_PASSWORD","Logger123")
		self.db = os.environ.get("MYSQL_DATABASE","dashlog")
		self.user = os.environ.get("SQL_USER","Logger")
		self.port = os.environ.get("SQL_PORT","3306")	

	def getData(self,dict, sql, params = []):
		res = None
		# print(sql)
		try:
			if dict:
				conn = mysql.connector.connect(host=self.ip,user=self.user,password=self.pw,database=self.db,port=self.port)
				cursor = conn.cursor(dictionary=True,buffered=True)
			else:
				conn = mysql.connector.connect(host=self.ip,user=self.user,password=self.pw,database=self.db,port=self.port)
				cursor = conn.cursor(buffered=True)
			if params:
				# print("dawdwaddddddhh")
				# print(sql % params)
				cursor.execute(sql,params)
			else:
				cursor.execute(sql)
    
			res = cursor.fetchall()
			# print(res)
			cursor.close()
			conn.close()
		except mysql.connector.Error as err:
			res = False
			print("Die Abfrage konnte nicht ausgeführt werden: {}".format(err))

		return res

	def modifyData(self,query,dict,params = []):
		
		try:
			if dict:
				conn = mysql.connector.connect(host=self.ip,user=self.user,password=self.pw,database=self.db,port=self.port)
			else:
				conn = mysql.connector.connect(host=self.ip,user=self.user,password=self.pw,database=self.db,port=self.port)
			cursor = conn.cursor(buffered=True)
   
			if params:
				cursor.execute(query,params)
			else:
				cursor.execute(query)
			
			res = cursor.lastrowid

			if res == None:
				res = True
    
			conn.commit()
			cursor.close()
			conn.close()
		except mysql.connector.Error as err:
			res = False
			print("Die Abfrage konnte nicht ausgeführt werden: {}".format(err))
		
		return res
		

			

		
