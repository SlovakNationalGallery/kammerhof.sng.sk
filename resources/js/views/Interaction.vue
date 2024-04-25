<template>
    <div class="grow px-4 md:px-24 pb-bar text-2xl font-medium">
        <TransitionGroup name="interactions">
            <template v-for="(interaction, i) in interactionStore.interactions" :key="i">
                <InteractionStory
                    :ref="(component) => setStoryRef(component, interaction)"
                    v-if="interaction.type === 'story'"
                    :story="storyStore.get(interaction.id)"
                    :linkId="interaction.linkId"
                    :active="interaction === interactionStore.active"
                    :first="i === 0"
                    @navigate="(link) => navigate(interaction, link)"
                    @undo="undo(interaction)"
                    class="my-8"
                />
            </template>
        </TransitionGroup>
    </div>
</template>

<style setup>
.interactions-enter-active,
.interactions-leave-active {
    transition: all 0.7s ease;
}
.interactions-enter-from,
.interactions-leave-to {
    opacity: 0;
}
</style>

<script setup>
import { nextTick, onMounted } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { useRoute } from 'vue-router'
import InteractionStory from '../components/InteractionStory.vue'
import { useInteractionStore } from '../stores/InteractionStore'
import { useItemStore } from '../stores/ItemStore'
import { useSectionStore } from '../stores/SectionStore'
import { useStoryStore } from '../stores/StoryStore'
import { usePlaceStore } from '../stores/PlaceStore'
import { useSurvey } from '../composables/Survey'

const interactionStore = useInteractionStore()
const itemStore = useItemStore()
const sectionStore = useSectionStore()
const storyStore = useStoryStore()
const placeStore = usePlaceStore()
const route = useRoute()
const storyMap = new Map()

const navigate = (interaction, link) => {
    interactionStore.selectLink(interaction, link)
    loadStory(link.story_id)
}

const undo = (interaction) => {
    storyMap.get(interaction).transitioning = true
    const previous = interactionStore.setPreviousActive(interaction)
    nextTick(() => {
        storyMap.get(previous).$el.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        })
        interactionStore.remove(interaction)
    })
}

const setStoryRef = (component, interaction) => {
    if (component) {
        storyMap.set(interaction, component)
    }
}

const scrollActiveIntoView = () => {
    const el = document.querySelector('#active-story')

    if (el) {
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }
}

const loadStory = async (id) => {
    const story = storyStore.get(id) || (await storyStore.load(id))
    interactionStore.addStory(story.id)
    nextTick(scrollActiveIntoView)
}

onMounted(async () => {
    if (route.params.id) {
        interactionStore.clear()
        loadStory(route.params.id)
    } else if (!interactionStore.activeStory) {
        loadStory(interactionStore.lastStory?.id || import.meta.env.VITE_DEFAULT_STORY)
    }

    nextTick(scrollActiveIntoView)
})

const { toggle: toggleSurvey, shouldLaunch: shouldSurveyLaunch } = useSurvey()

watchDebounced(
    shouldSurveyLaunch,
    () => {
        if (shouldSurveyLaunch.value) {
            toggleSurvey()
        }
    },
    { immediate: true, debounce: 1000 }
)
</script>
