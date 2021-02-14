from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name='home'),
	path('korisnici', views.korisnici, name='korisnici'),
	path('korisnici/komentari', views.korisnici_komentari, name='korisnici_komentari'),
	path('izbrisi/korisnik/<str:id>', views.izbrisi_korisnika, name='korisnici_brisanje'),
]