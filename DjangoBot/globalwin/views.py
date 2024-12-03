from django.shortcuts import render


def index(request):
    return render(request, "globalwin/globalwin.html ")


def settings(request):
    return render(request, "globalwin/settings.html")