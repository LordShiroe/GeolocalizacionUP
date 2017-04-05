from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
# Create your models here.

from django.contrib.auth.models import BaseUserManager


class AccountManager(BaseUserManager):
    def create_user(self, username, password=None, **kwargs):
        if not username:
            raise ValueError('Users must have a valid username.')

# Como no definimos un atributo model, toma por defecto el model de
# BaseUserManager, esto esta en settings.py --> Auth_User_Model
        account = self.model(
            username=username
        )

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, username, password, **kwargs):
        account = self.create_user(username, password, **kwargs)

        account.is_admin = True
        account.save()

        return account


class Account(AbstractBaseUser):
    username = models.CharField(max_length=40, unique=True)

    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    tagline = models.CharField(max_length=140, blank=True)

    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Permite instanciar el modelo AccountManager que crea las cuentas
    objects = AccountManager()

    USERNAME_FIELD = 'username'

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name
