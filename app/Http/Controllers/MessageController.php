<?php

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::id();
        $messages = Message::orderBY('created_at', 'desc')->with('user')
            ->get();
        foreach ($messages as $message) {
            $message->status = ($message->user_id == $user);
        }
        if($messages->count()){
            // phân loại dữ liệu đầu ra
            $messages =MessageResource::collection(($messages));
            return $messages;
        } else {
            return [
                'status' => 'No data'
            ];
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'message' => 'required'
        ];
        $request->validate($rules);
        $message = new Message();
        $message->message = $request->message;
        $message->user_id = Auth::user()->id;
        $message->save();
        $message->status = true;
        $message = new MessageResource($message->load('user'));
        return $message;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}