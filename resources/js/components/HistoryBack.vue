<template>
    <slot :back="back"></slot>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useHistoryStore } from '../stores/HistoryStore'

const router = useRouter()
const historyStore = useHistoryStore()

const back = () => {
    router.push({ name: 'settings' })
}
</script>
