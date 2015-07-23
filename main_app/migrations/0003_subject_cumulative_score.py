# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0002_auto_20150602_1701'),
    ]

    operations = [
        migrations.AddField(
            model_name='subject',
            name='cumulative_score',
            field=models.DecimalField(default=0.0, max_digits=3, decimal_places=2),
            preserve_default=False,
        ),
    ]
