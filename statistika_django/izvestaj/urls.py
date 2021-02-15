from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name='home'),
	path('korisnici', views.korisnici, name='korisnici'),
	path('korisnici/komentari', views.korisnici_komentari, name='korisnici_komentari'),
	path('korisnici/narudzbine', views.korisnici_narudzbine, name='korisnici_narudzbine'),
	path('izbrisi/korisnik/<str:id>', views.izbrisi_korisnika, name='korisnici_brisanje'),
	path('izbrisi/narudzbina/<str:id>', views.izbrisi_narudzbinu, name='izbrisi_narudzbinu'),
	path('izbrisi/materijal/<int:id>', views.izbrisi_materijal, name='izbrisi_materijal'),
	path('izbrisi/dugme/<int:id>', views.izbrisi_dugme, name='izbrisi_dugme'),
	path('izbrisi/mebl/<int:id>', views.izbrisi_mebl, name='izbrisi_mebl'),
	path('potvrdi/narudzbina/<str:id>', views.potvrdi_narudzbinu, name='potvrdi_narudzbinu'),
	path('materijali', views.materijali, name='materijali'),
	path('materijali/novo', views.novi_materijal, name='novi_materijal'),
	path('materijali/izmeni/<int:id>', views.izmeni_materijal, name='izmeni_materijal'),
	path('dugmici', views.dugmici, name='dugmici'),
	path('dugmici/novo', views.novo_dugme, name='novo_dugme'),
	path('dugmici/izmeni/<int:id>', views.izmeni_dugme, name='izmeni_dugme'),
	path('meblovi', views.meblovi, name='meblovi'),
	path('meblovi/novo', views.novi_mebl, name='novi_mebl'),
	path('meblovi/izmeni/<int:id>', views.izmeni_mebl, name='izmeni_mebl')
]