from django.urls import path
from .views import dylan, room

urlpatterns = [
    path('', dylan, name='dylan'),
    path('room/', room, name="room"),
]
