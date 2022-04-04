from django.db import models

# Create your models here.

class RoomMember(models.Model):
    uid = models.CharField(max_length=200)
    user = models.CharField(max_length=200)
    room_name = models.CharField(max_length=200)
    
    def __str__(self):
        return f"Name: {self.user}, UID: {self.uid}, room_name: {self.room_name}"