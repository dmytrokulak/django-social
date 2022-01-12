# django-social
Simple social network to explore python and django. Developed in summer 2021.

Prerequisites:

  * pip install django
  * pip install djangorestframework
  * pip install factory_boy
  * pip install uuid
  * pip install celery[redis]
  * pip install channels
  * pip install django-bootstrap4
  * pip install uritemplate

How to run the server:
1) Navigate to the root folder where manage.py file is located
2) Run migrations with python manage.py migrate
3) Start redis if not running
4) Run server python manage.py runserver

System user:
  * username root
  * password root
