from cmath import log
import json
import time
from django.http import JsonResponse
from django.shortcuts import render
from agora_token_builder import RtcTokenBuilder
from base.models import RoomMember
from meeco.dev import *
import random
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def getToken(request):
    channel_name = request.GET.get('channel')
    uid = random.randint(1, 230)
    role = 1
    expiration_time_in_seconds = 3600 * 24
    current_timestamp = time.time()
    privilegeExpiredTs = current_timestamp + expiration_time_in_seconds
    
    token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID, APP_CERTIFICATE, channel_name, uid, role, privilegeExpiredTs
    )
    
    return JsonResponse({'token': token, 'uid': uid}, safe=False)

def dylan(request):
    return render(request, 'base/dylan.html', locals())

def room(request):
    return render(request, 'base/room.html', locals())

@csrf_exempt
def createMember(request):
    data = json.loads(request.body)
    
    member, created = RoomMember.objects.get_or_create(
        user = data['name'],
        uid = data['UID'],
        room_name = data['room_name'],
    )
    
    return JsonResponse({'name': data['name']}, safe=False)

def getMember(request):
    uid = request.GET.get('UID')
    room_name = request.GET.get('room_name')
    
    member = RoomMember.objects.get(uid=uid, room_name=room_name)
    
    return JsonResponse({'name': member.user}, safe=False)

@csrf_exempt
def deleteMember(request):
    data = json.loads(request.body)
    
    member = RoomMember.objects.filter(
        user = data['name'],
        uid = data['UID'],
        room_name = data['room_name'],
    )
    member.delete()
    return JsonResponse('Member gone of meeting !', safe=False)