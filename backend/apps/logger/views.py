from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotFound, HttpResponseServerError
from classes.Dbconnection_log import MYSQL
from django.views.decorators.csrf import csrf_exempt
import json

dbconnection = MYSQL()

# Create your views here.
@csrf_exempt
def load_logs(request):
    sql = '''SELECT a.id as app_id, app,m_type, message_text,mt.id as type_id, logger.timestamp FROM dashlog.logger 
                        INNER JOIN apps a ON a.id = id_app
                        INNER JOIN message_type mt ON mt.id = message_id'''
    data = dbconnection.getData(True,sql,params=[])
    # print(data)
    sql = '''SELECT
    (SELECT COUNT(*) FROM logger WHERE message_id = 2 AND timestamp >= NOW() - INTERVAL 1 DAY) AS Anzahl_1_Tag,
    (SELECT COUNT(*) FROM logger WHERE message_id = 2 AND timestamp >= NOW() - INTERVAL 1 WEEK) AS Anzahl_1_Woche,
    (SELECT COUNT(*) FROM logger WHERE message_id = 2 AND timestamp >= NOW() - INTERVAL 1 MONTH) AS Anzahl_1_Monat,
    (SELECT COUNT(*) FROM logger WHERE message_id = 2 AND timestamp >= NOW() - INTERVAL 1 YEAR) AS Anzahl_1_Jahr'''

    kennzahlen = dbconnection.getData(True,sql,[])

    sql = '''SELECT
                id_app,
                a.app,
                SUM(CASE WHEN logger.timestamp >= NOW() - INTERVAL 1 DAY THEN 1 ELSE 0 END) AS fehler_1_tag,
                SUM(CASE WHEN logger.timestamp >= NOW() - INTERVAL 1 WEEK THEN 1 ELSE 0 END) AS fehler_1_woche,
                SUM(CASE WHEN logger.timestamp >= NOW() - INTERVAL 1 MONTH THEN 1 ELSE 0 END) AS fehler_1_monat,
                SUM(CASE WHEN logger.timestamp >= NOW() - INTERVAL 1 YEAR THEN 1 ELSE 0 END) AS fehler_1_jahr
            FROM dashlog.logger
            INNER JOIN apps a on a.id = id_app
            WHERE message_id = 2
            GROUP BY id_app, app'''
    
    chart_failproApp = dbconnection.getData(True,sql,[])

    sql = '''SELECT 
                DATE_FORMAT(timestamp, '%Y-%m') AS monat, 
                COUNT(*) AS anzahl_fehler
            FROM dashlog.logger
            WHERE 
                message_id = 2 AND 
                timestamp >= NOW() - INTERVAL 1 YEAR
            GROUP BY 
                DATE_FORMAT(timestamp, '%Y-%m')
            ORDER BY 
                monat;
            '''
    
    fehlerproMonat = dbconnection.getData(True,sql,[])

    # print(fehlerproMonat)

    # sql = '''SELECT id, app FROM dashlog.apps'''
    # apps = dbconnection.getData(True,sql,[])
    # print(apps)

    sql = '''SELECT 
                DATE_FORMAT(MIN(timestamp), '%H:00') AS hour,
                COUNT(*) AS Anzahl
            FROM 
                dashlog.logger
            WHERE 
                timestamp >= NOW() - INTERVAL 24 HOUR
                AND message_id = 1
            GROUP BY 
                DATE_FORMAT(timestamp, '%Y-%m-%d %H')
            ORDER BY 
                hour'''
    
    activityperh = dbconnection.getData(True,sql,[])


    combined_data = {
        "data": data,
        "kennzahlen": kennzahlen,
        "chart_failproApp": chart_failproApp,
        # "apps": apps,
        "fehlerproMonat": fehlerproMonat,
        "activityperh": activityperh
    }

    return JsonResponse({"data":combined_data})

@csrf_exempt
def load_apps(request):
    sql = '''SELECT id, app FROM dashlog.apps'''
    data = dbconnection.getData(True,sql,[])

    return JsonResponse({"data":data})

@csrf_exempt
def insert_app(request):
    data = json.loads(request.body)
    new_app_name = None
    if data and isinstance(data, list) and isinstance(data[0], dict):
        new_app_name = data[0].get('appName')
    if(new_app_name):

        sql = '''INSERT INTO dashlog.apps (app)VALUES(%s)'''
        result = dbconnection.modifyData(sql,True,[new_app_name])

        print(result)
        if(result):
            return JsonResponse({},status=200)
        else:
            return JsonResponse({},status=400)
    else:
        return JsonResponse({},status=400)

    
@csrf_exempt
def change_app(request):

    data = json.loads(request.body)
    print(data)
    id = None
    app = None
    if data and isinstance(data, list) and isinstance(data[0], dict):
        id = data[0].get('id')
        app = data[0].get('app')

        sql = '''UPDATE dashlog.apps SET app = %s WHERE id = %s'''
        result = dbconnection.modifyData(sql,True,[app,id])
        if(result == 0):
            return JsonResponse({},status=200)
        else:
            return JsonResponse({},status=400)
    else:
        return JsonResponse({},status=400)

    
@csrf_exempt
def delete_app(request):
    data = json.loads(request.body)
    id = None
    if data and isinstance(data, list) and isinstance(data[0], dict):
        id = data[0].get('id')

        sql = '''DELETE FROM dashlog.apps WHERE id = %s'''
        result = dbconnection.modifyData(sql,True,[id])
        print(result)

        if result == 0:
            print("drin")
            sql = '''DELETE FROM dashlog.logger WHERE id_app = %s'''
            endresult = dbconnection.modifyData(sql,True,[id])
            if endresult == 0:
                return JsonResponse({},status=200)
            else:
                return JsonResponse({},status=400)
        else:
            return JsonResponse({},status=400)
    else:
        return JsonResponse({},status=400)

