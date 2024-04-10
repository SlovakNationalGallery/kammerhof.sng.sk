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
        <!-- <LanguageSwitcher v-else-if="route.name === 'home'" /> -->
        <!-- <ViewedItemsCount v-else class="flex-1 border-l-2 border-l-transparent px-4 py-2" :show-tooltip="isActive" /> -->
        <div class="items-center flex">
            <button @click="shownResetModal = true" class="flex py-2 px-3 text-base font-bold items-center">
                <svg class="w-8 h-8 fill-none stroke-black stroke-2 mr-2" viewBox="0 0 32 32">
                    <g clip-path="url(#clip0_373_552)">
                        <path d="M8 8C8 8 11 5 16 5C23 5 27 12 27 12" />
                        <path d="M24 24C24 24 21 27 16 27C9 27 5 20 5 20" />
                        <path d="M21 12H27V6" />
                        <path d="M11 20H5V26" />
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
            <ConfirmButton class=" bg-black text-white" @click="resetInteraction">{{ $t('Reset') }}</ConfirmButton>
        </div>
    </CardModal>

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
import { useRoute, useRouter } from 'vue-router'

import CardModal from '../components/CardModal.vue'
import ConfirmButton from '../components/ConfirmButton.vue'

const route = useRoute()
const router = useRouter()

const openedAbout = ref(false)
const interactionStore = useInteractionStore()
const isActive = ref(false)

const shownResetModal = ref(false)

const displayTooltip = () => {
    isActive.value = true
    setTimeout(() => {
        isActive.value = false
    }, 3000)
}

const title = computed(() => (this?.$route?.meta?.title ? this.$route.meta.title : 'Kammerhof App'))

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

const resetInteraction = () => {
    interactionStore.clear()
    router.go()
}

</script>
