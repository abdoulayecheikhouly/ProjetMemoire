<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    protected $fillable = ['doctor_id', 'jour', 'heure_debut', 'heure_fin'];

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
