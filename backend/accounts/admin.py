from dataclasses import field
from django.contrib import admin
from django.contrib.auth import get_user_model
# 管理画面の設定

# ユーザーモデル取得
User = get_user_model()

# 管理画面表示


class UserAdmin(UserAdmin):
    fieldsets = (
        (None, {
            'fields': (
                'name',
                'email',
                'password',
                'image',
                'is_active',
                'is_staff',
                'is_superuser'
            )
        })
    )

    # 管理画面からユーザー登録
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'name',
                'email',
                'password1',
                'password2',
                'image',
                'is_active',
                'is_staff',
                'is_superuser',
            )
        })
    )

    list_display = (
        'id',
        'name',
        'email',
        'updated_at',
        'created_at',
    )

    list_display_links = ('id', 'name', 'email')
    ordering = ('id',)


# 登録
admin.site.register(User, UserAdmin)
