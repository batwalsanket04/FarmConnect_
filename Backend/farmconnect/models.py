from django.db import models

# Create your models here.


class Farmer(models.Model):

    name=models.charfield(max_length=100)
    
