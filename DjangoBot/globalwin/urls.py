from django.urls import path
from . import views

urlpatterns = [
    path('', views.globalwin, name='globalwin'),
    path('settings/', views.settings, name='settings'),
    path('statistics/', views.statistics, name='statistics'),
    path('tasks/', views.tasks, name='tasks'),
]