# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReviewVote',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('vote', models.NullBooleanField(default=None)),
                ('author', models.ForeignKey(related_name='reviewvotes', to=settings.AUTH_USER_MODEL)),
                ('review', models.ForeignKey(related_name='reviewvotes', to='main_app.Review')),
            ],
        ),
        migrations.CreateModel(
            name='SubjectVote',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('vote', models.NullBooleanField(default=None)),
                ('author', models.ForeignKey(related_name='subjectvotes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='subject',
            name='created',
            field=models.BooleanField(default=0),
        ),
        migrations.AddField(
            model_name='subjectvote',
            name='subject',
            field=models.ForeignKey(related_name='subjectvotes', to='main_app.Subject'),
        ),
    ]
