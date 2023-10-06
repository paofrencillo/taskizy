from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Room, RoomMember
from users.serializers import UserSerializer
import json


User = get_user_model()


class RoomsListSerializer(serializers.ModelSerializer):
    room_admin = UserSerializer(many=False, read_only=True)
    room_members = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = [
            "room_id",
            "room_name",
            "room_created_on",
            "room_admin",
            "room_members",
            "room_slug",
        ]

    def get_room_members(self, obj):
        members = RoomMember.objects.filter(room=obj)
        member_serialized = [
            UserSerializer(User.objects.get(pk=member.room_member_id)).data
            for member in members
        ]

        return member_serialized


class RoomSerializer(serializers.ModelSerializer):
    room_admin = UserSerializer(read_only=True)
    room_members = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = ["room_name", "room_admin", "room_members"]

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

        RoomMember.objects.create(
            room=room,
            room_member=room_admin,
        )

        return room

    def get_room_members(self, obj):
        members = RoomMember.objects.filter(room=obj)
        member_serialized = [
            UserSerializer(User.objects.get(pk=member.room_member_id)).data
            for member in members
        ]

        return member_serialized

    def update(self, validated_data):
        pass


class RoomMembersCreateSerializer(serializers.Serializer):
    room_id = serializers.IntegerField()
    new_members = serializers.CharField()

    def create(self, validated_data):
        room_id = validated_data["room_id"]
        new_members = validated_data["new_members"]
        room = Room.objects.get(pk=room_id)

        # Parse the JSON string into a list of dictionaries
        try:
            new_members = json.loads(new_members)
        except json.JSONDecodeError:
            raise serializers.ValidationError("Invalid JSON format.'")

        # Assuming that 'new_members' is a list of dictionaries with 'value' and 'label' keys
        for member_data in new_members:
            user = User.objects.get(pk=member_data["value"])
            RoomMember.objects.create(room=room, room_member=user)

        return room
