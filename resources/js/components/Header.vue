<template>
    <div class="sticky px-6 pt-12 pb-2 top-0 z-20 flex w-full items-center whitespace-nowrap bg-yellow">
        <h1 class="grow text-2xl font-black" :class="{ 'text-center': route.name !== 'home' }" id="title">
            {{ $t(openedAbout ? 'About the App' : route.meta.title ?? '') }}
        </h1>
        <div class="flex-1 border-l-2 border-transparent px-3 text-right" v-if="route.name === 'my_collection'">
            <!-- <button class="rounded-xl bg-yellow px-3 py-1 text-sm font-bold" @click="scroll('share')">
                {{ $t('Share') }}
            </button> -->
        </div>
        <LanguageSwitcher v-else-if="route.name === 'home'" />
        <ViewedItemsCount v-else class="flex-1 border-l-2 border-l-transparent px-4 py-2" :show-tooltip="isActive" />
    </div>

    <About :opened="openedAbout" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInteractionStore } from '../stores/InteractionStore'
import About from './About.vue'
import HistoryBack from './HistoryBack.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ViewedItemsCount from './ViewedItemsCount.vue'
import SvgBack from './svg/Back.vue'
import SvgClose from './svg/Close.vue'
import SvgLogo from './svg/Logo.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const openedAbout = ref(false)
const interactionStore = useInteractionStore()
const isActive = ref(false)

const displayTooltip = () => {
    isActive.value = true
    setTimeout(() => {
        isActive.value = false
    }, 3000)
}

const title = computed(() => this?.$route?.meta?.title ? this.$route.meta.title : 'Kammerhof App')

const scroll = (id) => {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
    })
}

interactionStore.$onAction(({ name }) => {
    if (name === 'addItemViewed' && !interactionStore.viewedItemsCount) {
        displayTooltip()
    }
})
</script>
