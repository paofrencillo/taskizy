from django.urls import path
from .views import RoomsListCreate

urlpatterns = [
    path("rooms/", RoomsListCreate.as_view(), name="rooms"),
]
