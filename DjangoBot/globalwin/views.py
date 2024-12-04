from django.shortcuts import render


def index(request):
    return render(request, "globalwin/globalwin.html ")


def settings(request):
    return render(request, "globalwin/settings.html")

def statistics(request):
    return render(request, "globalwin/statistics.html")


def tasks(request):
    return render(request, "globalwin/tasks.html")