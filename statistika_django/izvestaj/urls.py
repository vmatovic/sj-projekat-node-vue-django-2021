from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name='home'),
	path('korisnici', views.korisnici, name='korisnici'),
	path('izbrisi/korisnik/<str:id>', views.izbrisi_korisnika, name='korisnici_brisanje'),
]