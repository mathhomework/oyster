# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0003_subject_cumulative_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subject',
            name='cumulative_score',
            field=models.DecimalField(null=True, max_digits=3, decimal_places=2),
        ),
    ]
