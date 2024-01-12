from gevent import monkey
monkey.patch_all()

bind = '0.0.0.0:7500'
workers = 4
worker_class = 'gevent'