<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $casts = [
        'data' => 'string',
        'total_amount' => 'float',
    ];

    protected $fillable = ['user_id', 'data', 'quantity', 'total_amount'];

    protected $attributes = [
        'data' => '[]',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    public function orders()
    {
        return $this->hasOne(Order::class);
    }
}

