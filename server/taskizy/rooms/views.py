from rest_framework.generics import (
    ListCreateAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Room, RoomMember
from .serializers import (
    RoomsListSerializer,
    RoomSerializer,
    RoomMembersCreateSerializer,
)

import json


class RoomsListCreateView(ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomsListSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        serializer = RoomSerializer(
            data=request.data,
            context={"request": request},
        )

        if serializer.is_valid():
            room = serializer.save()
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = self.get_queryset()
        serializer = RoomsListSerializer(queryset, many=True)
        return Response(serializer.data)


class RoomView(RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk, room_slug):
        try:
            queryset = Room.objects.get(pk=pk)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(queryset, many=False)
        return Response(serializer.data)

    def update(self, request, pk, room_slug):
        try:
            queryset = Room.objects.get(pk=pk)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(
            instance=queryset,
            data=request.data,
            context={"request": request},
        )

    def destroy(self, request, pk, room_slug):
        pass


# views.py
class RoomMembersCreateView(CreateAPIView):
    queryset = RoomMember.objects.all()
    serializer_class = RoomMembersCreateSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, pk, room_slug):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            room = serializer.save()
            return Response(
                data=RoomSerializer(Room.objects.get(room_id=pk)).data,
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
