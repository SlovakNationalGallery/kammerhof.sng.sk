@extends('layouts.master')

@section('title')
    Import | @parent
@endsection

@section('content')
    <div class="mx-12 my-12">
        <h1 class="font-bold mb-8 pl-8 text-2xl">Import</h1>

        <div class="pl-8">
            <a class="underline hover:no-underline" target="_blank" href="{{ route('import_type', ['type' => 'places']) }}">places (w/ stories)</a><br />
            <a class="underline hover:no-underline" target="_blank" href="{{ route('import_type', ['type' => 'stories']) }}">stories</a><br />
        </div>
    </div>
@endsection