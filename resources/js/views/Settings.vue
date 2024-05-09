<template>
    <div class="grow px-4 md:px-24 pb-bar text-2xl font-medium">
        <ul class="py-6">
            <li v-for="place in places" :key="place.id">
                <button
                    class="w-full flex justify-between text-lg rounded-xl border-2 border-black p-2.5 cursor-pointer font-bold mb-4 text-left"
                    :class="{
                        'bg-yellow/80 shadow-lg': isActive(place.id),
                        'bg-yellow/30': !isActive(place.id) && place.story_id,
                        'bg-gray-softest': !place.story_id,
                    }"
                    :to="{ name: 'story', params: { id: place.story_id } }"
                    @click="setActivePlace(place.id, place.story_id)"
                    :disabled="!place.story_id"
                >
                    <div>
                        {{ place.title }}
                        <div
                            v-if="isActive(place.id)"
                            class="text-sm bg-black inline-block text-white py-1 px-3 rounded-full font-normal"
                        >
                            zvolená miestnosť
                        </div>
                    </div>

                    <CaretRight />
                </button>
            </li>
        </ul>
        <hr class="my-2" />
        <div class="py-6">
            <div class="text-lg mb-4">
                Aplikácia je v súčasnosti: 
                <span
                    class="inline-block w-3 h-3 rounded-full ml-2 mr-0.5 flex-shrink-0"
                    :class="online ? 'bg-green' : 'bg-red-pastel'"
                ></span>
                <span class="font-bold" v-if="online"> online</span>
                <span class="font-bold" v-else> offline</span>
            </div>
            <button
                class="w-full flex justify-start text-lg rounded-xl border-2 border-black p-2.5 cursor-pointer font-bold mb-4 text-left"
                :class="online ? 'bg-white' : 'bg-gray-softest'"
                @click="reload"
                :disabled="!online"
            >
                Stiahnuť a uložiť nové dáta
            </button>
            <button
                class="w-full flex justify-start text-lg rounded-xl border-2 border-black p-2.5 cursor-pointer font-bold mb-4 text-left"
                @click="prefetchImages"
                :class="online ? 'bg-white' : 'bg-gray-softest'"
                :disabled="loading || !online"
            >
                <span v-if="loading" class="mr-2">
                    <svg
                        class="animate-spin w-6 h-6 fill-none stroke-black stroke-2 mr-2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clip-path="url(#clip0_455_314)">
                            <path
                                d="M6 6C6 6 8.25 3.75 12 3.75C17.25 3.75 20.25 9 20.25 9"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M18 18C18 18 15.75 20.25 12 20.25C6.75 20.25 3.75 15 3.75 15"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path d="M15.75 9H20.25V4.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.25 15H3.75V19.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                    </svg>
                </span>
                Prednačítať obrázky
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import CaretRight from '../components/svg/CaretRight.vue'
import { usePlaceStore } from '../stores/PlaceStore'
import { useStoryStore } from '../stores/StoryStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { useOnline } from '@vueuse/core'

const online = useOnline()

const placeStore = usePlaceStore()
const storyStore = useStoryStore()
const router = useRouter()
const loading = ref(false)

const { places, activePlaceId } = storeToRefs(placeStore)

const setActivePlace = (id, story_id) => {
    placeStore.setActivePlace(id)
    router.push({
        name: 'story',
        params: { id: story_id },
    })
}

const isActive = (placeId) => {
    return placeId === activePlaceId.value
}

const reload = () => {
    placeStore.reset()
    placeStore.loadPlaces()

    storyStore.clearCache()
    storyStore.load()
}

const prefetchImages = () => {
    loading.value = true
    axios
        .get('/api/images')
        .then((response) => {
            const imagePaths = response.data.data
            imagePaths.forEach((media) => {
                const img = new Image()
                img.src = media.src
            })
        })
        .finally(() => {
            loading.value = false
        })
}

</script>
