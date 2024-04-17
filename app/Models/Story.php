<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;
use App\Traits\HasVideo;

class Story extends Model implements HasMedia
{
    use HasTranslations, InteractsWithMedia, HasVideo;

    public $incrementing = false;

    protected $keyType = 'string';

    protected array $translatable = ['text', 'video', 'highlighted_text', 'media_annotation'];

    public function links()
    {
        return $this->belongsToMany(StoryLink::class)->orderByPivot('ord');
    }
}
