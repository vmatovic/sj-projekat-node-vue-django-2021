from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.utils import timezone
from django.db.models import Avg, Min, Max, Sum
import datetime
from izvestaj.models import *
from izvestaj.forms import *

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
	mat_ukupno_metara = Materijali.objects.all().aggregate(Sum('preostala_duzina'))
	mat_prosecna_cena = Materijali.objects.all().aggregate(Avg('cena_po_metru'))
	najjeftin = Materijali.objects.all().aggregate(Min('cena_po_metru'))['cena_po_metru__min']
	najskup = Materijali.objects.all().aggregate(Max('cena_po_metru'))['cena_po_metru__max']
	najjeftiniji_mat = Materijali.objects.filter(cena_po_metru=najjeftin).first()
	najskuplji_mat = Materijali.objects.filter(cena_po_metru=najskup).first()
	return render(request, 'materijali.html', {'materijali': mat,
				'mat_ukupno_metara': mat_ukupno_metara,
				'mat_prosecna_cena': mat_prosecna_cena,
				'najjeftiniji_mat': najjeftiniji_mat,
				'najskuplji_mat': najskuplji_mat})

def dugmici(request):
	dug = Dugmici.objects.all()
	dug_prosecna_cena = Dugmici.objects.all().aggregate(Avg('cena_deset_dugmica'))
	najjeftin = Dugmici.objects.all().aggregate(Min('cena_deset_dugmica'))['cena_deset_dugmica__min']
	najskup = Dugmici.objects.all().aggregate(Max('cena_deset_dugmica'))['cena_deset_dugmica__max']
	najjeftinije_dug = Dugmici.objects.filter(cena_deset_dugmica=najjeftin).first()
	najskuplje_dug = Dugmici.objects.filter(cena_deset_dugmica=najskup).first()
	return render(request, 'dugmici.html', {'dugmici': dug,
				'dug_prosecna_cena': dug_prosecna_cena,
				'najjeftinije_dug': najjeftinije_dug,
				'najskuplje_dug': najskuplje_dug})

def meblovi(request):
	mebl = MaterijaliNamestaj.objects.all()
	mebl_prosecna_cena = MaterijaliNamestaj.objects.all().aggregate(Avg('cena_deset_metara'))
	najjeftin = MaterijaliNamestaj.objects.all().aggregate(Min('cena_deset_metara'))['cena_deset_metara__min']
	najskup = MaterijaliNamestaj.objects.all().aggregate(Max('cena_deset_metara'))['cena_deset_metara__max']
	najjeftiniji_mebl = MaterijaliNamestaj.objects.filter(cena_deset_metara=najjeftin).first()
	najskuplji_mebl = MaterijaliNamestaj.objects.filter(cena_deset_metara=najskup).first()
	return render(request, 'meblovi.html', {'meblovi': mebl,
				'mebl_prosecna_cena': mebl_prosecna_cena,
				'najjeftiniji_mebl': najjeftiniji_mebl,
				'najskuplji_mebl': najskuplji_mebl})
	
def korisnici_komentari(request):
	komentari = Komentari.objects.all()
	komentari_danas = Komentari.objects.filter(postavljeno_datuma=timezone.now().date())
	return render(request, 'komentari.html', {'komentari': komentari, 'komentari_danas': komentari_danas})

def korisnici_narudzbine(request):
	narudzbine = Narudzbina.objects.all()
	narudzbine_danas = Narudzbina.objects.filter(datum_narucivanja=timezone.now().date())
	isporuceno_danas = Narudzbina.objects.filter(datum_narucivanja=timezone.now().date()).filter(isporuceno=True).count()
	isporuceno_ukupno = Narudzbina.objects.filter(isporuceno=True).count()
	return render(request, 'narudzbine.html', {'narudzbine': narudzbine, 'narudzbine_danas': narudzbine_danas, 'isporuceno_danas': isporuceno_danas, 'isporuceno_ukupno': isporuceno_ukupno})
	
def izbrisi_korisnika(request, id):
	korisnik = Korisnici.objects.get(id=id)
	korisnik.delete()
	return redirect('korisnici')

def izbrisi_narudzbinu(request, id):
	nar = Narudzbina.objects.get(narudzbinaid=id)
	nar.delete()
	return redirect('korisnici_narudzbine')

def potvrdi_narudzbinu(request, id):
	nar = Narudzbina.objects.get(narudzbinaid=id)
	nar.isporuceno = True
	nar.save()
	return redirect('korisnici_narudzbine')

def novi_materijal(request):
	if request.method == 'POST':
		form = MaterijaliForm(request.POST)
		if form.is_valid():
			last_obj = Materijali.objects.last()
			mat = Materijali(materijalid=last_obj.materijalid+1, naziv=form.cleaned_data['naziv'], boja=form.cleaned_data['boja'], preostala_duzina=form.cleaned_data['preostala_duzina'], cena_po_metru=form.cleaned_data['cena_po_metru'])
			mat.save()
			return redirect('materijali')
		else:
			form = MaterijaliForm()
			return render(request, 'materijal_forma.html', {'form': form})
	else:
		form = MaterijaliForm()
		return render(request, 'materijal_forma.html', {'form': form})

def izmeni_materijal(request, id):
	mat = Materijali.objects.get(materijalid=id)
	if request.method == 'POST':
		form = MaterijaliForm(request.POST)
		if form.is_valid():
			mat.naziv = form.cleaned_data['naziv']
			mat.boja = form.cleaned_data['boja']
			mat.preostala_duzina = form.cleaned_data['preostala_duzina']
			mat.cena_po_metru = form.cleaned_data['cena_po_metru']
			mat.save()
			return redirect('materijali')
		else:
			form = MaterijaliForm(instance=mat)
			return render(request, 'materijal_forma_izmeni.html', {'form': form, 'id': id})
	else:
		form = MaterijaliForm(instance=mat)
		return render(request, 'materijal_forma_izmeni.html', {'form': form, 'id': id})

def izbrisi_materijal(request, id):
	mat = Materijali.objects.get(materijalid=id)
	mat.delete()
	return redirect('materijali')

def novo_dugme(request):
	if request.method == 'POST':
		form = DugmiciForm(request.POST)
		if form.is_valid():
			last_obj = Dugmici.objects.last()
			dug = Dugmici(dugmiciid=last_obj.dugmiciid+1, boja=form.cleaned_data['boja'], kolicina=form.cleaned_data['kolicina'], cena_deset_dugmica=form.cleaned_data['cena_deset_dugmica'])
			dug.save()
			return redirect('dugmici')
		else:
			form = DugmiciForm()
			return render(request, 'dugme_forma.html', {'form': form})
	else:
		form = DugmiciForm()
		return render(request, 'dugme_forma.html', {'form': form})

def izmeni_dugme(request, id):
	dug = Dugmici.objects.get(dugmiciid=id)
	if request.method == 'POST':
		form = DugmiciForm(request.POST)
		if form.is_valid():
			dug.boja = form.cleaned_data['boja']
			dug.kolicina = form.cleaned_data['kolicina']
			dug.cena_deset_dugmica = form.cleaned_data['cena_deset_dugmica']
			dug.save()
			return redirect('dugmici')
		else:
			form = DugmiciForm(instance=dug)
			return render(request, 'dugme_forma_izmeni.html', {'form': form, 'id': id})
	else:
		form = DugmiciForm(instance=dug)
		return render(request, 'dugme_forma_izmeni.html', {'form': form, 'id': id})

def izbrisi_dugme(request, id):
	dug = Dugmici.objects.get(dugmiciid=id)
	dug.delete()
	return redirect('dugmici')

def novi_mebl(request):
	if request.method == 'POST':
		form = MeblForm(request.POST)
		if form.is_valid():
			last_obj = MaterijaliNamestaj.objects.last()
			mebl = MaterijaliNamestaj(m_namestajid=last_obj.m_namestajid+1, boja=form.cleaned_data['boja'], preostala_duzina=form.cleaned_data['preostala_duzina'], cena_deset_metara=form.cleaned_data['cena_deset_metara'])
			mebl.save()
			return redirect('meblovi')
		else:
			form = MeblForm()
			return render(request, 'mebl_forma.html', {'form': form})
	else:
		form = MeblForm()
		return render(request, 'mebl_forma.html', {'form': form})

def izmeni_mebl(request, id):
	mebl = MaterijaliNamestaj.objects.get(m_namestajid=id)
	if request.method == 'POST':
		form = MeblForm(request.POST)
		if form.is_valid():
			mebl.boja = form.cleaned_data['boja']
			mebl.preostala_duzina = form.cleaned_data['preostala_duzina']
			mebl.cena_deset_metara = form.cleaned_data['cena_deset_metara']
			mebl.save()
			return redirect('meblovi')
		else:
			form = MeblForm(instance=mebl)
			return render(request, 'mebl_forma_izmeni.html', {'form': form, 'id': id})
	else:
		form = MeblForm(instance=mebl)
		return render(request, 'mebl_forma_izmeni.html', {'form': form, 'id': id})

def izbrisi_mebl(request, id):
	mebl = MaterijaliNamestaj.objects.get(m_namestajid=id)
	mebl.delete()
	return redirect('meblovi')