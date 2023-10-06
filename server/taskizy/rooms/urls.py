from django.urls import path
from .views import RoomsListCreateView, RoomView, RoomMembersCreateView

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
        "room/<int:pk>/<slug:room_slug>/add_members/",
        RoomMembersCreateView.as_view(),
        name="add_room_members",
    ),
]
