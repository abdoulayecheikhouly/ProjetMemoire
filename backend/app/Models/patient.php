<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class patients extends Model
{
    protected $fillable=[
    'user_id',
    'numero_secu',
    'date_naissance',
    'adresse',
    'groupe_sanguin'
];
//
public function user()
 { 
    return $this->belongsTo(User::class);
 }
//
 public function appointment()
    { return $this->hasMany(appointment::class); 

    }
//
 public function dossier()
    { return $this->hasOne(DossierMedical::class); 

    }
}
