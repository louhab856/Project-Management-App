<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            "name"=> $this->name,
            "desciption"=> $this->description,
            "created_at"=> (new Carbon($this->created_at))->format("Y-m-d H:i:s"),
            "due_date"=> (new Carbon($this->due_date ))->format("Y-m-d H:i:s"),
            "status"=>$this->status,
            "image_path"=>$this->image_path,
            "createdBy"=>new UserRessource($this->createdBy),
            "updatedBy"=>new UserRessource($this->updatedBy),
        ];
    }
}
