from zipapp import create_archive
from django.urls import path
from .views import dylan, room, getToken, createMember

urlpatterns = [
    path('', dylan, name='dylan'),
    path('room/', room, name="room"),
    path('get_token/', getToken, name="get_token"),
    path('create_member/', createMember, name="create_member"),
]
