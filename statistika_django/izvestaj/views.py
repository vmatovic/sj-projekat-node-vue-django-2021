from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.utils import timezone
import datetime
from izvestaj.models import *

# Create your views here.

def home(request):
	return render(request, 'home.html')

def korisnici(request):
	kor_total = Korisnici.objects.count()
	svi_korisnici = Korisnici.objects.all()
	danas = datetime.date.today()
	prij_danas = Korisnici.objects.filter(last_login=timezone.now().date()).count()
	return render(request, 'korisnici.html', {'kor_total': kor_total, 'prij_danas': prij_danas, 'svi_korisnici': svi_korisnici})

def materijali(request):
	mat = Materijali.objects.all()
	return render(request, 'materijali.html', {'materijali': mat})

def dugmici(request):
	dug = Dugmici.objects.all()
	return render(request, 'dugmici.html', {'dugmici': dug})

def meblovi(request):
	mebl = MaterijaliNamestaj.objects.all()
	return render(request, 'meblovi.html', {'meblovi': mebl})
	
def korisnici_komentari(request):
	komentari = Komentari.objects.all()
	komentari_danas = Komentari.objects.filter(postavljeno_datuma=timezone.now().date())
	return render(request, 'komentari.html', {'komentari': komentari, 'komentari_danas': komentari_danas})

def korisnici_narudzbine(request):
	narudzbine = Narudzbina.objects.all()
	return render(request, 'narudzbine.html', {'narudzbine': narudzbine})
	
def izbrisi_korisnika(request, id):
	print(id)
	korisnik = Korisnici.objects.get(id=id)
	korisnik.delete()
	return redirect('korisnici')