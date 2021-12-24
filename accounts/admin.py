from django.contrib import admin
from django.contrib.auth import get_user_model
# 管理画面の設定

# ユーザーモデル取得
User = get_user_model()
# 登録
admin.site.register(User)
