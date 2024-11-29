from django.shortcuts import render


def index(request):
    return render(request, "main/main_window.html ")


def about(request):
    return render(request, "main/about_window.html")