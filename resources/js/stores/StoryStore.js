import { defineStore } from 'pinia'
import axios from 'axios'
import { useStorage } from '@vueuse/core'

export const useStoryStore = defineStore('StoryStore', {
    state: () => ({
        stories: useStorage('stories', []),
    }),
    actions: {
        get(id) {
            return this.stories.filter((story) => story.id === id)[0] ?? null
        },
        async load() {
            const response = await axios.get(`/api/stories`)
            return (this.stories = response.data.data)
        },
        clearCache() {
            this.stories = []
        },
        isEmpty() {
            return this.stories.length === 0
        }
    },
})
