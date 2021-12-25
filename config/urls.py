from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    # simplejwtのview
    path('api/login/', TokenObtainPairView.as_view()),
    path('api/refresh/', TokenRefreshView.as_view()),
    path('api/verity/', TokenVerifyView.as_view()),

    # アカウント認証系はaccountsに任せる
    path('api/auth/', include('accounts.urls')),

    path('admin/', admin.site.urls),
]
