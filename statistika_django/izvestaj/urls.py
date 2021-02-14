from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name='home'),
	path('korisnici', views.korisnici, name='korisnici'),
	path('korisnici/komentari', views.korisnici_komentari, name='korisnici_komentari'),
	path('korisnici/narudzbine', views.korisnici_narudzbine, name='korisnici_narudzbine'),
	path('izbrisi/korisnik/<str:id>', views.izbrisi_korisnika, name='korisnici_brisanje'),
	path('materijali', views.materijali, name='materijali'),
	path('dugmici', views.dugmici, name='dugmici'),
	path('meblovi', views.meblovi, name='meblovi'),
]