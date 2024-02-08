<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
//        return parent::toArray($request);
        return [
            'message' => $this->message,
            'user' => $this->user->name,
            'user_id' => $this->user_id,
            'created_at' => Carbon::parse($this->created_at)->format('j M H:i'),
        ];
    }
}
