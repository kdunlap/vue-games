<template>
  <div class="flex border border-slate-500 rounded-md">
    <button 
      class=" border rounded-tl-md rounded-bl-md border-r-slate-500 w-8 h-8"
      :class="{
        'bg-slate-200': model === min
      }"
      :disabled="model === min"
      @click="decrement"
      data-test="decrement-button"
    >
      -
    </button>
    <input 
      class="text-center w-8"
      readonly
      type="text" 
      :min="min" 
      :max="max" 
      v-model="model"
    />
    <button 
      class="border rounded-tr-md rounded-br-md border-l-slate-500 w-8 h-8"
      :class="{
        'bg-slate-200': model === max
      }"
      :disabled="model === max"
      @click="increment"
      data-test="increment-button"
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
const { min = 0, max = 10 } = defineProps<Props>()
const model = defineModel<number>({ default: 0 })

function increment() {
  if(model.value < max) {
    model.value += 1
  }
}

function decrement() {
  if(model.value > min) {
    model.value -= 1
  }
}
</script>

<style scoped>

</style>