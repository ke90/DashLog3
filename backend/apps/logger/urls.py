from django.contrib import admin
from django.urls import path
from apps.logger import views, viewStream

app_name = 'logger'
urlpatterns = [
    path('load_logs/',views.load_logs, name='load_logs'),
    path('load_apps/',views.load_apps, name='load_apps'),
    path('webhook/', viewStream.webhook_receiver, name='webhook_receiver'),
    path('webhook2/', viewStream.webhook_receiver2, name='webhook_receiver2'),
    path('stream_events/', viewStream.stream_events, name='stream_events'),
    path('insert_app/', views.insert_app, name='insert_app'),
    path('change_app/', views.change_app, name='change_app'),
    path('delete_app/', views.delete_app, name='delete_app'),
    ]