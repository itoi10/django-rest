from django.contrib.auth import get_user_model
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer

User = get_user_model()

# アカウント登録  api/auth/register/
class RegisterView(APIView):
    # 認証しなくてもAPIにアクセス可能
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        print(request.data)
        try:
            data = request.data
            name = data['name']
            email = data['email'].lower()
            password = data['password']
            print(name, email, password)

        except:
            return Response(
                {'error': 'アカウント登録時に問題が発生しました。'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# api/auth/user/
class UserView:
    pass
