# Generated by Django 4.2.16 on 2024-11-08 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0002_booking'),
    ]

    operations = [
        migrations.RenameField(
            model_name='listing',
            old_name='price',
            new_name='price_per_night',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='image',
        ),
        migrations.AddField(
            model_name='listing',
            name='amenities',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='listing',
            name='bathrooms',
            field=models.IntegerField(default=2),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='listing',
            name='bedrooms',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='listing',
            name='images',
            field=models.TextField(default='https://picsum.photos/200/300,https://picsum.photos/200/300'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='listing',
            name='listingType',
            field=models.CharField(default='apartment', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='listing',
            name='number_of_guests',
            field=models.IntegerField(default=4),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='listing',
            name='time',
            field=models.CharField(max_length=13),
        ),
    ]
