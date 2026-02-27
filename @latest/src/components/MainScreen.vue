<script setup lang="ts">
import AddItemForm from "./AddItem.vue"
import ShowItemList from "./ShowItemList.vue"
import DeleteConfirmation from "./DeleteConfirmation.vue"
import { ref } from "vue"
import type { Item } from "../scripts/item"

import itemsData from "../scripts/item" 
import ShowDetails from "./ShowDetails.vue"

const items = ref<Item[]>([...itemsData])
let nextId = items.value.length + 1

const isItemDeleted = ref(false)
const pendingDeleteId = ref<number | null>(null)

const isDetailsModalOpen = ref(false)
const selectedItemId = ref<number | null>(null)


//J'ai utilisé l'ia pour trouver la fonction Omit qui permet de créer un objet sans la propriété id, 
// ce qui est parfait pour notre formulaire d'ajout d'item, car l'id est généré automatiquement dans MainScreen.vue.
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

function openDeleteConfirm(id: number): void {
  pendingDeleteId.value = id
  isItemDeleted.value = true
}

function confirmDelete(): void {
  if (pendingDeleteId.value !== null) {
    handleDelete(pendingDeleteId.value)
    pendingDeleteId.value = null
  }
  isItemDeleted.value = false
}

function cancelDelete(): void {
  pendingDeleteId.value = null
  isItemDeleted.value = false
}

function showDetails(id: number): void {
  selectedItemId.value = id
  isDetailsModalOpen.value = true
}

function closeDetails(): void {
  isDetailsModalOpen.value = false
  selectedItemId.value = null
}
</script>

<template>
  <div>
    <ShowDetails
      v-if="isDetailsModalOpen && selectedItemId"
      :id="selectedItemId"
      :name="items.find(item => item.id === selectedItemId)?.name ?? ''"
      :stock="items.find(item => item.id === selectedItemId)?.stock ?? 0"
      :price="items.find(item => item.id === selectedItemId)?.price ?? 0"
      :description="items.find(item => item.id === selectedItemId)?.description ?? ''"
      @close="closeDetails"
    />
    <AddItemForm @add="handleAdd" />
    <ShowItemList
      :items="items"
      @delete="openDeleteConfirm"
      @details="showDetails"
    />
    <DeleteConfirmation
      v-if="isItemDeleted"
      :id="pendingDeleteId!"
      @confirm-delete="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
div {
  margin-bottom: 2rem;
}
</style>
