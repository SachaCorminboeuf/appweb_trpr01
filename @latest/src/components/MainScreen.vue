<script setup lang="ts">
import ShowItemList from "./ShowItemList.vue"
import { ref } from "vue"
import type { Item } from "../scripts/item"

// Assume itemsData is imported or defined here
import itemsData from "../scripts/item" // or wherever your initial data is

const items = ref<Item[]>([...itemsData])
let nextId = items.value.length + 1

const newItemName = ref<string>("")
const newItemPrice = ref<number>(0)
const newItemStock = ref<number>(0)
const newItemDescription = ref<string>("")

function addItem(): void {
  if (!newItemName.value.trim() || !newItemPrice.value || !newItemStock.value || !newItemDescription.value.trim()) {
    return
  }
  const newItem: Item = {
    id: nextId++,
    name: newItemName.value,
    price: newItemPrice.value,
    stock: newItemStock.value,
    description: newItemDescription.value,
  }
  items.value.push(newItem)
  newItemName.value = ""
  newItemPrice.value = 0
  newItemStock.value = 0
  newItemDescription.value = ""
}

function handleDelete(id: number): void {
  items.value = items.value.filter(item => item.id !== id)
}
</script>

<template>
  <ShowItemList
    :items="items"
    @delete="handleDelete"
  />
  <form @submit.prevent="addItem">
    <input v-model="newItemName" placeholder="Name" required />
    <input v-model.number="newItemPrice" type="number" placeholder="Price" required />
    <input v-model.number="newItemStock" type="number" placeholder="Stock" required />
    <input v-model="newItemDescription" placeholder="Description" required />
    <button type="submit">Add Item</button>
  </form>
</template>

<style scoped>

</style>
