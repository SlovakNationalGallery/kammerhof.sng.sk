<template>
    <div class="grow px-4 md:px-24 pb-bar text-2xl font-medium">
        <ul class="py-6">
            <li v-for="place in places" :key="place.id">
                <router-link
                    class="flex justify-between text-lg rounded-xl border-2 border-black bg-yellow/30 p-2.5 cursor-pointer font-bold mb-4"
                    :to="{ name: 'story', params: { id: place.story_id } }"
                >
                    {{ place.title }}
                    <CaretRight />
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CaretRight from '../components/svg/CaretRight.vue'

const places = ref([])

onMounted(async () => {
    const response = await axios.get(`/api/places`)
    places.value = response.data.data
})
</script>
