from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.contrib.auth import get_user_model
from .models import Task


User = get_user_model()


class TaskListCreateView(ListCreateAPIView):
    queryset = Task.objects.all()
    permission_classes = (IsAuthenticated,)

    def list(self, request, room_id, room_slug):
        pass

    def create(self, request, room_id, room_slug):
        pass


class TaskRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    def retrieve(self, request, room_id, room_slug):
        pass

    def update(self, request, room_id, room_slug):
        pass

    def destroy(self, request, room_id, room_slug):
        pass
