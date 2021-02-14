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

def izbrisi_korisnika(request, id):
	print(id)
	korisnik = Korisnici.objects.get(id=id)
	korisnik.delete()
	return redirect('korisnici')