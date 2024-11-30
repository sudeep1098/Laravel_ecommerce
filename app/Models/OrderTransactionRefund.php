<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderTransactionRefund extends Model
{
    use HasFactory;

    protected $fillable = ['order_transaction_id', 'refund_amount', 'refund_status'];

    public function orderTransaction()
    {
        return $this->belongsTo(OrderTransaction::class);
    }
}

