import requests
import json


# Die URL Ihres Webhook-Endpoints
url = 'http://127.0.0.1:1337/api/logger/webhook2/'

# Die zu sendenden Daten


for i in range(2):
    data = {
        'id_app': 1,
        'message_id': 2,
        'message_text': 'Fehler!'
    }

    print("Start Webhooktest")
    # Senden eines POST-Requests
    response = requests.post(url, data=json.dumps(data), headers={'Content-Type': 'application/json'})
    # response2 = requests.post(url, data=json.dumps(data), headers={'Content-Type': 'application/json'})
    # response3 = requests.post(url, data=json.dumps(data), headers={'Content-Type': 'application/json'})
    

    # Ausgabe der Antwort
    print(response.status_code)
    print(response.text)
    # print(response2.status_code)
    # print(response2.text)
    # print(response3.status_code)
    # print(response3.text)