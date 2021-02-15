from django.forms import ModelForm
from .models import Materijali, Dugmici, MaterijaliNamestaj


class MaterijaliForm(ModelForm):
	class Meta:
		model = Materijali
		fields = ['naziv', 'boja', 'preostala_duzina', 'cena_po_metru']

class DugmiciForm(ModelForm):
	class Meta:
		model = Dugmici
		fields = ['boja', 'kolicina', 'cena_deset_dugmica']

class MeblForm(ModelForm):
	class Meta:
		model = MaterijaliNamestaj
		fields = ['boja', 'preostala_duzina', 'cena_deset_metara']