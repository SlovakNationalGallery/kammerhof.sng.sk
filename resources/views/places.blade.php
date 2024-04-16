@extends('layouts.master')

@section('title')
    Miesta | @parent
@endsection

@section('content')
    <div class="mx-12 my-12">
        <h1 class="font-bold mb-8 pl-8 text-2xl">Miesta</h1>

        <table class="table-auto border-collapse w-full">
            <thead>
                <tr>
                    <th class="border-b font-bold p-4 pl-8 pt-0 pb-3 text-left">Názov</th>
                    <th class="border-b font-bold p-4 pl-8 pt-0 pb-3 text-left"></th>
                </tr>
            </thead>
            <tbody class="bg-white">
                @foreach ($places as $place)
                <tr>
                    <td class="border-b border-gray-soft p-4 pl-8">{{ $place->title }}</td>
                    <td class="border-b border-gray-soft p-4 pl-8">
                        @if ($place->story_id)
                            <x-button href="/story/{{ $place->story_id }}">zobraziť príbeh</x-button>
                        @endif
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
