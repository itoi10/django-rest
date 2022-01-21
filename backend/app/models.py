from django.db import models
from django.conf import settings

# 画像投稿のモデル
class Post(models.Model):
    # リレーション on_delete=によりuser削除でに紐づいたpostも削除される挙動になる
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    title = models.CharField("タイトル", max_length=200)
    image = models.ImageField(
        upload_to="images", verbose_name="画像", null=True, blank=True
    )
    content = models.TimeField("本文")
    updated_at = models.DateTimeField("更新日", auto_now=True)
    created_at = models.DateTimeField("作成日", auto_now_add=True)

    def __str__(self):
        return self.title
