# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Dugmici(models.Model):
    dugmiciid = models.IntegerField(db_column='dugmiciID', primary_key=True)  # Field name made lowercase.
    boja = models.CharField(max_length=50)
    kolicina = models.PositiveIntegerField()
    cena_deset_dugmica = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'dugmici'


class Korisnici(models.Model):
    id = models.CharField(db_column='id', primary_key=True, max_length=255)
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    is_admin = models.BooleanField()
    registered = models.DateTimeField()
    last_login = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'korisnici'


class Materijali(models.Model):
    materijalid = models.IntegerField(db_column='materijalID', primary_key=True)  # Field name made lowercase.
    naziv = models.CharField(max_length=50)
    boja = models.CharField(max_length=50)
    preostala_duzina = models.PositiveIntegerField()
    cena_po_metru = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'materijali'


class MaterijaliNamestaj(models.Model):
    m_namestajid = models.IntegerField(db_column='m_namestajID', primary_key=True)  # Field name made lowercase.
    boja = models.CharField(max_length=50)
    preostala_duzina = models.PositiveIntegerField()
    cena_deset_metara = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'materijali_namestaj'


class Narudzbina(models.Model):
    narudzbinaid = models.CharField(db_column='narudzbinaID', primary_key=True, max_length=255)  # Field name made lowercase.
    korisnik = models.ForeignKey(Korisnici, db_column='korisnikID', max_length=255, on_delete=models.DO_NOTHING)  # Field name made lowercase.
    materijal = models.ForeignKey(Materijali, db_column='materijaliID', blank=True, null=True, on_delete=models.DO_NOTHING)  # Field name made lowercase.
    dugmici = models.ForeignKey(Dugmici, db_column='dugmiciID', blank=True, null=True, on_delete=models.DO_NOTHING)  # Field name made lowercase.
    m_namestaj = models.ForeignKey(MaterijaliNamestaj, db_column='m_namestajID', blank=True, null=True, on_delete=models.DO_NOTHING)  # Field name made lowercase.
    kolicina = models.PositiveIntegerField()
    datum_narucivanja = models.DateField()
    isporuceno = models.BooleanField(default=False)

    class Meta:
        managed = False
        db_table = 'narudzbina'


class Komentari(models.Model):
    komentarid = models.CharField(db_column='komentarID', primary_key=True, max_length=255)  # Field name made lowercase.
    tekst = models.TextField()
    korisnik = models.ForeignKey(Korisnici, db_column='korisnikID', on_delete=models.CASCADE)  # Field name made lowercase.
    materijal = models.ForeignKey(Materijali, db_column='materijalID', on_delete=models.CASCADE)  # Field name made lowercase.
    postavljeno_datuma = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'komentari'