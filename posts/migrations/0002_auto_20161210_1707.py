# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-10 22:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='created_at',
            field=models.DateField(auto_now_add=True),
        ),
    ]
