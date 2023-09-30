from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Room
from users.serializers import UserSerializer
from django.contrib.auth import get_user_model


User = get_user_model()


class RoomsListSerializer(serializers.ModelSerializer):
    room_admin = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Room
        fields = [
            "room_id",
            "room_name",
            "room_created_on",
            "room_admin",
            "room_slug",
        ]


class RoomSerializer(serializers.ModelSerializer):
    room_admin = UserSerializer(read_only=True)

    class Meta:
        model = Room
        fields = [
            "room_name",
            "room_admin",
        ]

    def create(self, validated_data):
        try:
            user_id = self.context["request"].user.id

            room_admin = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "User with the specified ID does not exist"
            )

        room = Room.objects.create(
            room_admin=room_admin,
            **validated_data,
        )
        return room
