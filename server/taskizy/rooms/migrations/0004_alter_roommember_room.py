# Generated by Django 4.2.5 on 2023-10-13 11:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0003_alter_room_room_admin_alter_roommember_room_member'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roommember',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='rooms.room', verbose_name='room_id'),
        ),
    ]
