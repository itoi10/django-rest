from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)

# モデルを作成したらデータベースの再構築を行う
# $ python manage.py makemigrations
# $ rm -rf db.sqlite3 (カスタムユーザーを作成したので一旦DB削除)
# $ python manage.py migrate


class UserManager(BaseUserManager):
    # アカウント登録のときに呼び出される関数
    def create_user(self, email, name, password=None):
        # メール確認
        if not email:
            raise ValueError("メールアドレスは必須です")
        print("origin " + email)
        email = self.normalize_email(email)
        print("normal " + email)
        email = email.lower()
        print("lower  " + email)

        user = self.model(
            email=email,
            name=name,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    # 管理者アカウント登録のときに呼び出される関数
    def create_superuser(self, email, name, password=None):
        user = self.create_user(email, name, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField("メールアドレス", max_length=255, unique=True)
    name = models.CharField("名前", max_length=255)

    image = models.ImageField(
        upload_to="images", verbose_name="プロフィール画像", default="profile/default.png"
    )
    updated_at = models.DateTimeField("更新日", auto_now=True)
    created_at = models.DateTimeField("作成日", auto_now=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    # メールアドレスと名前を必須項目とする
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email
