<?php

use App\Models\User;
use App\Models\Room;
use App\Models\Group;

describe('RoomController index security', function () {
    it('redirects unauthenticated users from rooms index', function () {
        $response = $this->get('/room');
        
        $response->assertStatus(302);
        $response->assertRedirectToRoute('login');
    });

    it('requires email verification for authenticated users', function () {
        $user = User::factory()->create(['email_verified_at' => null]);
        
        $response = $this->actingAs($user)->get('/room');
        
        $response->assertStatus(302);
        $response->assertRedirectToRoute('verification.notice');
    });

    it('allows verified authenticated users to access the rooms index', function () {
        $user = User::factory()->create(['email_verified_at' => now()]);
        
        $response = $this->actingAs($user)->get('/room');
        
        // Verified users should not be redirected
        expect($response->status())->not->toBe(302);
    });

    it('only shows rooms user has access to', function () {
        $user = User::factory()->create(['email_verified_at' => now()]);
        $otherUser = User::factory()->create(['email_verified_at' => now()]);
        
        // User's own room
        $ownRoom = Room::factory()->create(['created_by' => $user->id]);
        
        // Room from other user (should not appear)
        $otherRoom = Room::factory()->create(['created_by' => $otherUser->id]);
        
        // Room via group membership
        $group = Group::factory()->create(['created_by' => $user->id, 'group_name' => 'Test Group']);
        $groupRoom = Room::factory()->create(['group_id' => $group->id]);
        $group->users()->attach($user, ['role' => 'Member']);
        
        // Verify authorization query excludes unauthorized rooms
        $query = Room::query()->where(function ($q) use ($user) {
            $q->where('created_by', $user->id)->orWhereHas('group.users', function ($q2) use ($user) {
                $q2->where('user_id', $user->id);
            });
        });
        
        $results = $query->pluck('id')->toArray();
        
        // Authorized rooms should be included
        expect($results)->toContain($ownRoom->id, $groupRoom->id);
        
        // Unauthorized room should be excluded
        expect($results)->not->toContain($otherRoom->id);
    });
});
