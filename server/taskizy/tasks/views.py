from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.contrib.auth import get_user_model
from .models import Task
from .serializers import TasksListSerializer, TaskSerializer


User = get_user_model()


class TasksListCreateView(ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TasksListSerializer
    permission_classes = (IsAuthenticated,)

    def list(self, request, room_id, room_slug):
        queryset = Task.objects.filter(room_id=room_id)
        serializer = self.serializer_class(
            queryset,
            many=True,
        )

        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        print(request.data)
        serializer = TaskSerializer(
            data=request.data,
            context={"request": request},
        )

        if serializer.is_valid():
            task = serializer.save()
            return Response(
                TasksListSerializer(task).data, status=status.HTTP_201_CREATED
            )

        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    def retrieve(self, request, room_id, room_slug):
        pass

    def update(self, request, room_id, room_slug):
        pass

    def destroy(self, request, room_id, room_slug):
        pass
