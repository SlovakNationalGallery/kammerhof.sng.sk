<template>
    <div role="link" class="relative" @click="visible = true">
        <img :src="src" :alt="alt" class="w-full rounded-xl border-black/15 border-2" />
    </div>
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        v-if="visible"
        @click="visible = false"
    >
        <div class="max-h-full relative rounded-xl bg-gray-soft w-full max-w-full" :style="{ aspectRatio: imageAspectRatio}" @click.stop>
            <img :src="src" class="rounded-xl object-contain" />
            <button
                class="absolute top-0 right-0 cursor-pointer rounded-tr-xl bg-white p-1.5"
                @click.stop="visible = false"
            >
                <SvgClose />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SvgArrowsOut from './svg/ArrowsOut.vue'
import SvgClose from './svg/Close.vue'
import ZoomViewer from './ZoomViewer.vue'

const props = defineProps(['alt', 'offsetTop', 'src', 'srcset', 'images', 'imageAspectRatio', 'imgClass'])

const visible = ref(false)
</script>
