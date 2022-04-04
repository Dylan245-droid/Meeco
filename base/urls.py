from django.urls import path
from .views import dylan, room, getToken, createMember, getMember, deleteMember

urlpatterns = [
    path('', dylan, name='dylan'),
    path('room/', room, name="room"),
    path('get_token/', getToken, name="get_token"),
    path('create_member/', createMember, name="create_member"),
    path('get_member/', getMember, name="get_member"),
    path('delete_member/', deleteMember, name="delete_member"),
]
