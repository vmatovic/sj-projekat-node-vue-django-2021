from django.forms import ModelForm
from .models import *


class MaterijaliForm(ModelForm):
	class Meta:
		model = Materijali
		fields = ['naziv', 'boja', 'preostala_duzina', 'cena_po_metru']