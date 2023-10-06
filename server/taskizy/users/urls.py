from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UsersListView, LogoutView


urlpatterns = [
    path(
        "get-users/<int:pk>/",
        UsersListView.as_view(),
        name="get-users",
    ),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("token/refresh/", LogoutView.as_view(), name="token-refresh"),
]
