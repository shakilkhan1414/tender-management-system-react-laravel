<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tender extends Model
{
    use HasFactory;

    public function submittedBy(){
        return $this->belongsTo('App\Models\User','submitted_by');
    }

    public function refferedTo(){
        return $this->belongsTo('App\Models\User','reffered_to');
    }

}
