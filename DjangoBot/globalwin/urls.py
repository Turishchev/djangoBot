from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('settings/', views.settings),
    path('statistics/', views.statistics),
    path('tasks/', views.tasks),
]