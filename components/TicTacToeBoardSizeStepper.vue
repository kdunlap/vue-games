<template>
  <div class="flex border border-slate-500 rounded-md">
    <button 
      class=" border rounded-tl-md rounded-bl-md border-r-slate-500 w-8 h-8"
      :class="{
        'bg-slate-200': boardSize === min
      }"
      :disabled="boardSize === min"
      @click="decrement"
    >
      -
    </button>
    <input 
      class="text-center w-8"
      readonly
      type="text" 
      :min="min" 
      :max="max" 
      v-model="boardSize" 
    />
    <button 
      class="border rounded-tr-md rounded-br-md border-l-slate-500 w-8 h-8"
      :class="{
        'bg-slate-200': boardSize === max
      }"
      :disabled="boardSize === max"
      @click="increment"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
type Props = {
  min?: number,
  max?: number
}
const { min, max } = withDefaults(defineProps<Props>(), { min: 3, max: 6 })
const boardSize = defineModel<number>({ default: 3 })

function increment() {
  if(boardSize.value < max) {
    boardSize.value += 1
  }
}

function decrement() {
  if(boardSize.value > min) {
    boardSize.value -= 1
  }
}
</script>

<style scoped>

</style>