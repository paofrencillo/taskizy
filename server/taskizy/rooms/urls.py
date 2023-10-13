from django.urls import path
from .views import (
    RoomsListCreateView,
    RoomView,
    RoomMembersListCreateView,
    RoomAdminUpdateView,
    RoomMembersRetrieveUpdateDestroyView,
)

urlpatterns = [
    path(
        "rooms/",
        RoomsListCreateView.as_view(),
        name="rooms",
    ),
    path(
        "room/room<int:room_id>/<slug:room_slug>/",
        RoomView.as_view(),
        name="room",
    ),
    path(
        "room/room<int:room_id>/<slug:room_slug>/members/",
        RoomMembersListCreateView.as_view(),
        name="room-members",
    ),
    path(
        "room/room<int:room_id>/<slug:room_slug>/assign_as_admin/",
        RoomAdminUpdateView.as_view(),
        name="room-assign-admin",
    ),
    path(
        "room/room<int:room_id>/member<int:member_id>/retrieve/",
        RoomMembersRetrieveUpdateDestroyView.as_view(),
        name="room-member-retrieve",
    ),
    path(
        "room/room<int:room_id>/member<int:member_id>/update/",
        RoomMembersRetrieveUpdateDestroyView.as_view(),
        name="room-member-update",
    ),
    path(
        "room/room<int:room_id>/member<int:member_id>/destroy/",
        RoomMembersRetrieveUpdateDestroyView.as_view(),
        name="room-member-destroy",
    ),
]