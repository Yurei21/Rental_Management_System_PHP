<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Http\Resources\RoomResource;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $query = Room::query()->with('group.users')->where(function ($q) use ($user) {
            $q->where('created_by', $user->id)->orWhereHas('group.users', function ($q2) use ($user) {
                $q2->where('user_id', $user->id);
            });
        });

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if(request("search")){
            $query->where("room_name", "like", "%" . request("search") . "%");
        }

        $rooms = $query->orderBy($sortField, $sortDirection)->paginate(9)->onEachSide(1 );

        return inertia("Rooms/Index", [
            'rooms' => RoomResource::collection($rooms),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoomRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        $this->authorizeRoomOwner($room);

        $query = $room->tenants();
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("tenant_name")) {
            $query->where("tenant_name", "like", "%". request("tenant_name"). "%");
        }

        if(request("is_active")) {
            $query->where("is_active", request("is_active"));
        }

        $tenants = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Rooms/Show', [
            ''
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomRequest $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }

    /**
     * For Authorization
     */
    private function authorizeRoomOwner(Room $room, $asOwner = false){
        $user = Auth::user();
        
        if (!$room->group_id) {
            if($asOwner && $room->created_by !== $user->id) {
                abort(403, 'Only the owner can perform this action.');
            }
            
            if (!$asOwner && $room->created_by !== $user->id) {
                abort(403, 'You do not have access to this solo room.');
            }
        }

        if($room->group_id) {
            $isMember = $room->group->users()->where('user_id', $user->id)->exists();

            if (!$isMember) {
                abort(403, 'you are not a member of this room');
            }

            if ($asOwner && $room->group->owner_id !== $user->id && $room->created_by !== $user->id) {
                abort(403, 'Only the room creatorr can perform this action.');
            }
        }
    }
}
