from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Room
from .serializers import RoomsListSerializer, RoomSerializer


class RoomsListCreate(ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomsListSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        serializer = RoomSerializer(data=request.data, context={"request": request})

        if serializer.is_valid():
            room = serializer.save()
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = self.get_queryset()
        serializer = RoomsListSerializer(queryset, many=True)
        return Response(serializer.data)
