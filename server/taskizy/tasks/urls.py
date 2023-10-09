from django.urls import path
from .views import TasksListCreateView

urlpatterns = [
    path(
        "task/create/",
        TasksListCreateView.as_view(),
        name="task-create",
    ),
]
