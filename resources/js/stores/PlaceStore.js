import { ref, computed, watch } from 'vue'
import axios from 'axios'

export const usePlaceStore = () => {
    const places = ref([])
    const activePlaceId = ref(null)

    const loadPlaces = async () => {
        try {
            const response = await axios.get('/api/places')
            places.value = response.data.data
            console.log('Places loaded:', places.value)
            if (!activePlaceId.value) {
                activePlaceId.value = import.meta.env.VITE_DEFAULT_PLACE
            }
        } catch (error) {
            console.error('Error loading places:', error)
        }
    }

    const setActivePlace = (placeId) => {
        activePlaceId.value = placeId
    }

    const reset = () => {
        places.value = []
        activePlaceId.value = null
    }

    const activePlace = computed(() => {
        return places.value.find((place) => place.id === activePlaceId.value) ?? null
    })

    watch(activePlaceId, (newValue) => {
        if (!newValue && places.value.length > 0) {
            activePlaceId.value = places.value[0].id
        }
    })

    if (places.value.length === 0) {
        loadPlaces()
    }

    return {
        places,
        activePlaceId,
        loadPlaces,
        setActivePlace,
        reset,
        activePlace,
    }
}
