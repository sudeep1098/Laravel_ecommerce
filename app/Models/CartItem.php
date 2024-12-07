<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $casts = [
        'data' => 'string',
        'total_amount' => 'float',
    ];

    protected $fillable = ['cart_id', 'data' , 'quantity', 'total_amount'];

    protected $attributes = [
        'data' => '[]',
    ];

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
