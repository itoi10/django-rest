from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer
from .models import Post

# 一覧
class PostListView(generics.ListAPIView):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    # 誰でもアクセス可能
    permission_classes = (AllowAny,)


# 詳細
class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # 誰でもアクセス可能
    permission_classes = (AllowAny,)


# 新規, 編集, 削除
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # 新規投稿時のみ保存
    def perform_create(self, serializer, **kwargs):
        serializer.save(user=self.request.user)
