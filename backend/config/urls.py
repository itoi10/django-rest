from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # simplejwtのview
    path("api/login/", TokenObtainPairView.as_view()),
    path("api/refresh/", TokenRefreshView.as_view()),
    path("api/verify/", TokenVerifyView.as_view()),
    # アカウント認証系はaccountsに任せる
    path("api/auth/", include("accounts.urls")),
    # app
    path("api/", include("app.urls")),
    path("admin/", admin.site.urls),
]


# 画像の場所
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
