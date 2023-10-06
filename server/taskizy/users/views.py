from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rooms.models import RoomMember


User = get_user_model()


class UsersListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        try:
            member_queryset = RoomMember.objects.filter(room_id=pk)
            user_queryset = User.objects.exclude(is_superuser=True).exclude(
                pk__in=[member.room_member_id for member in member_queryset]
            )
        except User.DoesNotExist:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user_queryset, many=True)
        return Response(serializer.data)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except TokenError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
