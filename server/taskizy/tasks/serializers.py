from rest_framework import serializers
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer
from .models import Task

User = get_user_model()


class TaskListSerializer(serializers.ModelSerializer):
    creator = UserSerializer(many=False, read_only=True)
    tasker = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Task
        fields = [
            "task_id",
            "description",
            "is_urgent",
            "is_completed",
            "creator" "tasker",
        ]
