from django.shortcuts import render

# Create your views here.

def dylan(request):
    return render(request, 'base/dylan.html', locals())

def room(request):
    return render(request, 'base/room.html', locals())