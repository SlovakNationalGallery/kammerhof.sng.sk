<template>
    <div class="sticky px-6 pt-12 pb-2.5 top-0 z-20 flex w-full items-center whitespace-nowrap bg-yellow">
        <h1 class="grow text-2xl font-black" id="title">
            {{ route.meta.title ?? activePlace?.title ?? 'Kammerhof app' }}
        </h1>
        <div class="flex-1 border-l-2 border-transparent px-3 text-right" v-if="route.name === 'my_collection'">
            <!-- <button class="rounded-xl bg-yellow px-3 py-1 text-sm font-bold" @click="scroll('share')">
                {{ $t('Share') }}
            </button> -->
        </div>
        <!-- <LanguageSwitcher v-else-if="route.name === 'home'" /> -->
        <!-- <ViewedItemsCount v-else class="flex-1 border-l-2 border-l-transparent px-4 py-2" :show-tooltip="isActive" /> -->
        <div class="items-center flex">
            <button @click="shownResetModal = true" class="flex py-2 text-base font-bold items-center">
                <svg
                    class="w-6 h-6 fill-none stroke-black stroke-2 mr-2"
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
                Začni odznova
            </button>
        </div>
    </div>

    <CardModal @close="shownResetModal = false" :visible="shownResetModal">
        <h3 class="my-4 text-4xl font-bold">{{ $t('Reset the conversation') }}</h3>
        <div class="text-2xl leading-7 mb-8">
            <p>Chceš začať odznova? Konverzácia sa resetuje.</p>
        </div>
        <div class="flex space-x-6">
            <ConfirmButton class="" @click="shownResetModal = false">{{ $t('Close') }}</ConfirmButton>
            <ConfirmButton class="bg-black text-white" @click="resetInteraction">{{ $t('Reset') }}</ConfirmButton>
        </div>
    </CardModal>

    <About :opened="openedAbout" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useInteractionStore } from '../stores/InteractionStore'
import About from './About.vue'
import HistoryBack from './HistoryBack.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ViewedItemsCount from './ViewedItemsCount.vue'
import SvgBack from './svg/Back.vue'
import SvgClose from './svg/Close.vue'
import SvgLogo from './svg/Logo.vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlaceStore } from '../stores/PlaceStore'
import { storeToRefs } from 'pinia'

import CardModal from '../components/CardModal.vue'
import ConfirmButton from '../components/ConfirmButton.vue'

const placeStore = usePlaceStore()
const route = useRoute()
const router = useRouter()

const openedAbout = ref(false)
const interactionStore = useInteractionStore()
const isActive = ref(false)

const shownResetModal = ref(false)

const { activePlace } = storeToRefs(placeStore)

const displayTooltip = () => {
    isActive.value = true
    setTimeout(() => {
        isActive.value = false
    }, 3000)
}

// const title = computed(() => (this?.$route?.meta?.title ? this.$route.meta.title : placeStore.place?.title ?? ''))

const scroll = (id) => {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
    })
}

const resetInteraction = () => {
    interactionStore.clear()
    router.go()
}

onMounted(() => {
    if (!activePlace.value) {
        placeStore.loadPlaces()
    }
})
</script>
