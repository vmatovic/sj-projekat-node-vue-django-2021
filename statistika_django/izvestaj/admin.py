from django.contrib import admin
from .models import Dugmici, Korisnici, Materijali, MaterijaliNamestaj, Narudzbina, Komentari

# Register your models here.
admin.site.register(Dugmici)
admin.site.register(Korisnici)
admin.site.register(Materijali)
admin.site.register(MaterijaliNamestaj)
admin.site.register(Narudzbina)
admin.site.register(Komentari)