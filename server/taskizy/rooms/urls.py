from django.urls import path
from .views import RoomsListCreateView, RoomView, RoomMembersListCreateView

urlpatterns = [
    path(
        "rooms/",
        RoomsListCreateView.as_view(),
        name="rooms",
    ),
    path(
        "room/<int:pk>/<slug:room_slug>/",
        RoomView.as_view(),
        name="room",
    ),
    path(
        "room/<int:pk>/<slug:room_slug>/members/",
        RoomMembersListCreateView.as_view(),
        name="room_members",
    ),
]
