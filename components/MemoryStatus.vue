<template>
  <div class="flex items-center ml-8 text-xl font-bold">
    <p v-if="state === 'active'">Select a card</p>
    <p v-if="state === 'selecting'">Select another card</p>
    <p v-else-if="state === 'no-match'" class="text-red-600">Not a match</p>
    <p v-else-if="state === 'match-found'" class="text-green-600">Match Found!</p>
    <p v-else-if="state === 'win'" class="text-green-600">Congrats! You Win!</p>
  </div>
</template>

<script setup lang="ts">
type Props = {
  state: string
}
const { state } = defineProps<Props>()

</script>
