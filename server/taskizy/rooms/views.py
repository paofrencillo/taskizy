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
from tasks.models import Task
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

    def get_object(self):
        room_id = int(self.kwargs.get("room_id"))
        room_slug = str(self.kwargs.get("room_slug"))

        try:
            queryset = self.get_queryset().filter(
                room_id=room_id,
                room_slug=room_slug,
            )

            instance = queryset.get()

            return instance

        except Room.DoesNotExist:
            raise Exception("Room does not exists.")

    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.get_object(), many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(
            instance=instance,
            data=request.data,
            context={"request": request},
        )

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


# views.py
class RoomMembersListCreateView(ListCreateAPIView):
    """
    View for getting room members and adding new ones.
    """

    queryset = RoomMember.objects.all()
    serializer_class = RoomMembersListSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request, room_id, room_slug):
        try:
            queryset = RoomMember.objects.filter(room_id=int(room_id))
        except RoomMember.DoesNotExist:
            return Response(
                data={message: "Room members does not exists."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.serializer_class(queryset, many=True)

        return Response({"room_members": serializer.data}, status=status.HTTP_200_OK)

    def create(self, request, room_id, room_slug):
        try:
            queryset = Room.objects.get(room_id=int(room_id))
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


class RoomMembersRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = RoomMember.objects.all()
    serializer_class = RoomMembersListSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        room_id = int(self.kwargs.get("room_id"))
        member_id = int(self.kwargs.get("member_id"))

        try:
            queryset = self.get_queryset().filter(room=room_id, room_member=member_id)
            instance = queryset.get()

            return instance
        except RoomMember.DoesNotExist:
            raise Exception("Room Member does not exists.")

    def retrieve(self):
        pass

    def update(self):
        pass

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object().room_member

            update_tasker = Task.objects.filter(tasker=instance).update(tasker=None)

            instance.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except RoomMember.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
