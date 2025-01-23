<template>
  <div :style="imageStyle"></div>
</template>

<script setup lang="ts">
import animalBackground from '~/assets/food-fronts.jpg'

export type Props = {
  card: MemoryCard
}

const { card } = defineProps<Props>()

const imageStyle = computed(() => ({
  backgroundImage: `url(${ animalBackground })`,
  backgroundPosition: `-${ card.coords.x }px -${ card.coords.y }px`,
  backgroundSize: `960px 960px`
}))

</script>