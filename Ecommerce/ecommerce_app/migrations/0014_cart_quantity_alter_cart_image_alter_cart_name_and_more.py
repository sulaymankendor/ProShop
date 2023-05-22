# Generated by Django 4.0.2 on 2023-04-22 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_app', '0013_remove_cart_quantity_alter_cart_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='quantity',
            field=models.IntegerField(default='11'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='cart',
            name='image',
            field=models.ImageField(max_length=1000, upload_to='images'),
        ),
        migrations.AlterField(
            model_name='cart',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='cart',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=7),
        ),
    ]
