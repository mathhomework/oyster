# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0008_auto_20150728_1639'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subject',
            old_name='created',
            new_name='on',
        ),
    ]
