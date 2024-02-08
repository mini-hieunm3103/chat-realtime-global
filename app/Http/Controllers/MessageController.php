<?php

namespace App\Http\Controllers;

use App\Events\MessagePosted;
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
        $messages = Message::orderBY('created_at', 'asc')->with('user')
            ->get();
        if($messages->count()){
            // phân loại dữ liệu đầu ra
            $messages =MessageResource::collection(($messages));
            return [
                "status" =>200,
                "data" => $messages
            ];
        } else {
            return [
                "status" => 204,
                "data" => 'No data'
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
//        $message->user_id = $request->user_id;
        $message->user_id = Auth::user()->id;
        $message->save();
        $message = new MessageResource($message->load('user'));
        broadcast(new MessagePosted($message))->toOthers();
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
