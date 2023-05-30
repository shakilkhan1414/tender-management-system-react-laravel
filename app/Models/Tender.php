<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tender extends Model
{
    use HasFactory;

    protected $fillable = [
        'tender_name',
        'tender_type',
        'tender_price',
        'tender_description',
        'tender_location',
        'submission_date',
        'submitted_by',
        'tender_document',
        'reffered_to',
    ];

    public function submittedBy(){
        return $this->belongsTo('App\Models\User','submitted_by');
    }

    public function refferedTo(){
        return $this->belongsTo('App\Models\User','reffered_to');
    }

}
