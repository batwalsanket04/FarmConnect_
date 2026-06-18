from django.core.validators import RegexValidator
from django.db import models


 
class Farmer(models.Model):

    phone_regex = RegexValidator(
        regex=r'^[6-9]\d{9}$',
        message="Enter valid Indian phone number"
    )

    password_regex = RegexValidator(
        regex=r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$',
        message="Password must contain uppercase, lowercase, number and special character"
    )

    farmer_name = models.CharField(
        max_length=100
    )

    phone = models.CharField(
        max_length=10,
        unique=True,
        validators=[phone_regex]
    )

    location = models.CharField(
        max_length=100
    )

    email = models.EmailField(
        unique=True
    )

    password = models.CharField(
        max_length=255,
        validators=[password_regex]
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.farmer_name


 
class User(models.Model):

    BUYER_TYPE = [
        ('customer', 'Local Customer'),
        ('retailer', 'Retailer'),
        ('wholesaler', 'Wholesaler')
    ]

    role = models.CharField(
        max_length=20,
        choices=BUYER_TYPE
    )

    name = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    business = models.CharField(
        max_length=150,
        blank=True,
        null=True
    )

    owner = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    phone = models.CharField(
        max_length=10,
        unique=True
    )

    location = models.CharField(
        max_length=200
    )

    email = models.EmailField(
        unique=True
    )

    password = models.CharField(
        max_length=255
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.email


 
class FarmerProduct(models.Model):

    farmer = models.ForeignKey(
        Farmer,
        on_delete=models.CASCADE,
        related_name="products"
    )

    CATEGORY_CHOICES = (
        ("Vegetables", "Vegetables"),
        ("Fruits", "Fruits"),
        ("Grains", "Grains"),
        ("Dairy", "Dairy"),
    )

    product_image = models.ImageField(
        upload_to="products/"
    )

    product_name = models.CharField(
        max_length=100
    )

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    variety = models.CharField(
        max_length=100
    )

    quantity = models.IntegerField()

    UNIT_CHOICES = ( ("kg","Kg"),
                     ("quintal","Quintal"),
                     ("ton","Ton"),
                     ("liter","Liter"),
                     ("dozen","Dozen")
    )

    unit = models.CharField(
        max_length=20,
        choices=UNIT_CHOICES,
        
    )

    normal_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    bulk_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    description = models.TextField()

    call = models.BooleanField(
        default=False
    )

    whatsapp = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.product_name


 
class UserOrder(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="orders"
    )

    product = models.ForeignKey(
        FarmerProduct,
        on_delete=models.CASCADE,
        related_name="orders"
    )

    UNIT_TYPE = [
        ('kg', 'Kg'),
        ('quintal', 'Quintal')
    ]

    PAYMENT_TYPE = [
        ('COD', 'Cash On Delivery'),
        ('UPI', 'UPI')
    ]

    STATUS_TYPE = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('rejected', 'Rejected'),
    ]

    name = models.CharField(
        max_length=100
    )

    phone = models.CharField(
        max_length=10
    )

    address = models.TextField()

    quantity = models.IntegerField()

    unit = models.CharField(
        max_length=20,
        choices=UNIT_TYPE
    )

    payment = models.CharField(
        max_length=20,
        choices=PAYMENT_TYPE
    )

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_TYPE,
        default='pending'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.name} - {self.product.product_name}"