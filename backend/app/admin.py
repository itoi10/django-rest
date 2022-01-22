from django.contrib import admin
from .models import Post
from django.contrib.admin import ModelAdmin


class PostCustom(ModelAdmin):
    list_display = ("id", "title", "update_at", "created_at")
    list_display_links = ("id", "title")


# 登録
admin.site.register(Post, PostCustom)
