from rest_framework import serializers
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer
from .models import Task
from rooms.models import Room

User = get_user_model()


class TasksListSerializer(serializers.ModelSerializer):
    creator = UserSerializer(many=False, read_only=True)
    tasker = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Task
        fields = [
            "task_id",
            "description",
            "is_urgent",
            "is_completed",
            "creator",
            "tasker",
        ]


class TaskSerializer(serializers.Serializer):
    description = serializers.CharField()
    tasker = serializers.IntegerField()
    room = serializers.IntegerField()
    is_urgent = serializers.CharField()

    def create(self, validated_data):
        try:
            user_id = int(self.context["request"].user.id)
            room_id = int(validated_data["room"])
            tasker_id = int(validated_data["tasker"])

            description = validated_data["description"]
            is_urgent = validated_data["is_urgent"]
            creator = User.objects.get(pk=user_id)
            tasker = User.objects.get(pk=tasker_id)
            room = Room.objects.get(pk=room_id)

        except User.DoesNotExist:
            raise serializers.ValidationError(
                "User with the specified ID does not exist"
            )

        task = Task.objects.create(
            description=validated_data["description"],
            is_urgent=True if is_urgent == "on" else False,
            creator=creator,
            tasker=tasker,
            room=room,
        )

        return task
