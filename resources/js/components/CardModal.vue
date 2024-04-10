<template>
    <div class="fixed inset-0 z-50 flex justify-center items-center" v-if="visible">
        <div class="bg-black opacity-70 absolute inset-0 cursor-zoom-out" @click="emit('close')" />
        <div class="relative mx-4 bg-white w-full max-w-[610px] rounded-xl p-10">
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    visible: Boolean,
})
const emit = defineEmits(['close'])
</script>
