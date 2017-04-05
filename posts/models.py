from __future__ import unicode_literals

from django.db import models
from authentication.models import Account


class Post(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(Account)
    barcode = models.TextField()
    latitud = models.TextField()
    longitud = models.TextField()
    timestamp = models.TextField()

    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{0}'.format(self.barcode)
