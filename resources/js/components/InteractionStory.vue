<template>
    <div class="scroll-my-20" :id="active ? 'active-story' : undefined">
        <div class="flex">
            <img
            class="h-8 w-8 mr-4"
            src="../../img/avatar-muzeumbs.png"
            alt="Avatar"
        />
        {{ $t('Sprievodca') }}

        </div>

        <div class="my-4 md:my-6 space-y-6 markdown" v-html="story.text"></div>

        <div class="my-4 md:my-6" v-for="image in story.images">
            <img :src="image.src" :alt="image.alt" class="w-full rounded-xl border-black/15 border-2" />
            <div class="flex justify-center">
                <p class="text-center text-gray-medium py-2">{{ story.media_annotation }}</p>
            </div>
        </div>

        <div class="relative my-4 md:my-6" v-if="story.video_embed">
            <StoryVideoLightbox :story="story"></StoryVideoLightbox>
        </div>

        <div class="bg-yellow/15 p-6 rounded-xl my-4 md:my-6 space-y-6 markdown font-black" v-if="story.highlighted_text">
            <div v-html="story.highlighted_text"></div>
            <button
            :disabled="!active"
            v-show="activeOrTransitioning || linkId === link.id"
            class="my-4 w-full md:my-6 ml-auto flex items-center gap-x-2 rounded-xl border-2 px-6 py-4 text-center font-bold leading-8 justify-center"
            :class="{
                'border-black bg-transparent text-black': activeOrTransitioning,
                'bg-opacity-20 text-black': activeOrTransitioning && interactionStore.hasVisitedAllLinks(link.story_id),
                'text-black': activeOrTransitioning && !interactionStore.hasVisitedAllLinks(link.story_id),
                'border-black/15 bg-transparent text-black/50': !activeOrTransitioning,
            }"
            @click="emit('navigate', link)"
            v-for="link in story.links"
        >
            <SvgChatCircle
                class="flex-none"
                v-if="!activeOrTransitioning"
            />
            {{ link.title }}
        </button>
        </div>

        <div v-else>
            <button
            :disabled="!active"
            v-show="activeOrTransitioning || linkId === link.id"
            class="my-4 w-full md:my-6 ml-auto flex items-center gap-x-2 rounded-xl border-1 px-6 py-4 text-center font-bold leading-8 justify-center"
            :class="{
                'border-black bg-black text-white': activeOrTransitioning,
                'border-black bg-black': activeOrTransitioning && interactionStore.hasVisitedAllLinks(link.story_id),
                'text-black': activeOrTransitioning && !interactionStore.hasVisitedAllLinks(link.story_id),
                'border-transparent bg-black/15 text-black/50': !activeOrTransitioning,
            }"
            @click="emit('navigate', link)"
            v-for="link in story.links"
        >
            <SvgChatCircle
                class="flex-none"
                v-if="!activeOrTransitioning"
            />
            {{ link.title }}
        </button>
        </div>

        <button
            :disabled="!active"
            v-show="activeOrTransitioning && !first"
            class="my-4 w-full mt-7 md:my-6 ml-auto flex items-center justify-center gap-x-2 rounded-xl text-lg leading-8 text-black"
            @click="emit('undo')"
        >
            <SvgArrowUp class="flex-none" />
            {{ $t('Back to the previous step') }}
        </button>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import StoryVideoLightbox from './StoryVideoLightbox.vue'
import SvgArrowUp from './svg/ArrowUp.vue'
import SvgChatCircle from './svg/ChatCircle.vue'
import { useInteractionStore } from '../stores/InteractionStore'

const interactionStore = useInteractionStore()

const props = defineProps(['story', 'active', 'linkId', 'first'])
const emit = defineEmits(['navigate', 'undo'])

const transitioning = ref(false)
const activeOrTransitioning = computed(() => {
    return transitioning.value || props.active
})

defineExpose({
    transitioning,
})
</script>
