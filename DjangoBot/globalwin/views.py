from django.shortcuts import render


def index(request):
    return render(request, "globalwin/globalwin.html ")


def about(request):
    return render(request, "globalwin/settingsglobalwin.html")