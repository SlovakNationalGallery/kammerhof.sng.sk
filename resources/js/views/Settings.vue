<template>
    <div class="grow px-4 md:px-24 pb-bar text-2xl font-medium">
        <ul class="py-6">
            <li v-for="place in places" :key="place.id">
                <button
                    class="w-full flex justify-between text-lg rounded-xl border-2 border-black bg-yellow/30 p-2.5 cursor-pointer font-bold mb-4 text-left"
                    :class="{ 'bg-yellow/80 shadow-lg': isActive(place.id) }"
                    :to="{ name: 'story', params: { id: place.story_id } }"
                    @click="setActivePlace(place.id, place.story_id)"
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
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CaretRight from '../components/svg/CaretRight.vue'
import { usePlaceStore } from '../stores/PlaceStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const placeStore = usePlaceStore()
const router = useRouter()

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

</script>
