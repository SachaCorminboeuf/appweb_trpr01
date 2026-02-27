<script setup lang="ts">
import AddItemForm from "./AddItem.vue"
import ShowItemList from "./ShowItemList.vue"
import { ref } from "vue"
import type { Item } from "../scripts/item"

import itemsData from "../scripts/item" 

const items = ref<Item[]>([...itemsData])
let nextId = items.value.length + 1

function handleAdd(newItemData: Omit<Item, 'id'>): void {
  const newItem: Item = {
    id: nextId++,
    ...newItemData
  }
  items.value.push(newItem)
}

function handleDelete(id: number): void {
  items.value = items.value.filter(item => item.id !== id)
}
</script>

<template>
  <div>
    <AddItemForm @add="handleAdd" />
    <ShowItemList
      :items="items"
      @delete="handleDelete"
    />
  </div>
</template>

<style scoped>
div {
  margin-bottom: 2rem;
}
</style>
