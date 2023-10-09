"""
Holds the views for rooms.

- RoomsListCreateView
- RoomView
- RoomMembersCreateView
- RoomMembersRetriveUpdateDestroyView
"""

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
    RoomMembersListSerializer,
    RoomMembersCreateSerializer,
)

import json


class RoomsListCreateView(ListCreateAPIView):
    """
    View for getting room members and adding new ones.
    """

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
        return Response(serializer.data, status=status.HTTP_200_OK)


class RoomView(RetrieveUpdateDestroyAPIView):
    """
    View for getting the room data, update, and deleting it.
    """

    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk, room_slug):
        try:
            queryset = Room.objects.get(pk=pk)
        except Room.DoesNotExist:
            return Response(
                data={message: "Room does not exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.serializer_class(queryset, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
class RoomMembersListCreateView(ListCreateAPIView):
    """
    View for getting room members and adding new ones.
    """

    queryset = RoomMember.objects.all()
    serializer_class = RoomMembersListSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request, pk, room_slug):
        try:
            queryset = RoomMember.objects.filter(room_id=pk)
        except RoomMember.DoesNotExist:
            return Response(
                data={message: "Room members does not exists."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.serializer_class(queryset, many=True)

        return Response({"room_members": serializer.data}, status=status.HTTP_200_OK)

    def create(self, request, pk, room_slug):
        try:
            queryset = Room.objects.get(room_id=pk)
        except Room.DoesNotExist:
            return Response(
                data={message: "Room Does Not Exist"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = RoomMembersCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                data=RoomSerializer(queryset).data,
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
