<script setup lang="ts">
import AddItemForm from "./AddItem.vue";
import ShowItemList from "./ShowItemList.vue";
import DeleteConfirmation from "./DeleteConfirmation.vue";
import { ref } from "vue";
import type { Item } from "../scripts/item";

import itemsData from "../scripts/item";
import ShowDetails from "./ShowDetails.vue";
import EditItem from "./EditItem.vue";
import DuplicateItem from "./DuplicateItem.vue";

const items = ref<Item[]>([...itemsData]);
let nextId = items.value.length + 1;

const isItemDeleted = ref(false);
const pendingDeleteId = ref<number | null>(null);

const isDetailsModalOpen = ref(false);
const selectedItemId = ref<number | null>(null);

const isEditModalOpen = ref(false);
const selectedEditItemId = ref<number | null>(null);

const isDuplicateModalOpen = ref(false);
const selectedDuplicateItemId = ref<number | null>(null);

//J'ai utilisé l'ia pour trouver la fonction Omit qui permet de créer un objet sans la propriété id,
// ce qui est parfait pour notre formulaire d'ajout d'item, car l'id est généré automatiquement dans MainScreen.vue.
function handleAdd(newItemData: Omit<Item, "id">): void {
  const newItem: Item = {
    id: nextId++,
    ...newItemData,
  };
  items.value.push(newItem);
}

function handleDelete(id: number): void {
  items.value = items.value.filter((item) => item.id !== id);
}

function handleEdit(editedItemData: Omit<Item, "id">): void {
  const existingItem = items.value.find(
    (item) => item.id === selectedEditItemId.value,
  );
  if (existingItem) {
    const updatedItem: Item = {
      ...existingItem,
      ...editedItemData,
    };
    items.value = items.value.map((item) =>
      item.id === existingItem.id ? updatedItem : item,
    );
  }
}

function handleDuplication(duplicatedItemData: Omit<Item, "id">): void {
  const existingItem = items.value.find(
    (item) => item.id === selectedDuplicateItemId.value,
  );
  if (existingItem) {
    const newItem: Item = {
      id: nextId++,
      ...duplicatedItemData,
    };
    items.value.push(newItem);
  }
}

function openDeleteConfirm(id: number): void {
  pendingDeleteId.value = id;
  isItemDeleted.value = true;
}

function confirmDelete(): void {
  if (pendingDeleteId.value !== null) {
    handleDelete(pendingDeleteId.value);
    pendingDeleteId.value = null;
  }
  isItemDeleted.value = false;
}

function cancelDelete(): void {
  pendingDeleteId.value = null;
  isItemDeleted.value = false;
}

function showDetails(id: number): void {
  selectedItemId.value = id;
  isDetailsModalOpen.value = true;
}

function closeDetails(): void {
  isDetailsModalOpen.value = false;
  selectedItemId.value = null;
}

function showEditItem(id: number): void {
  selectedEditItemId.value = id;
  isEditModalOpen.value = true;
}

function closeEditItem(): void {
  isEditModalOpen.value = false;
  selectedEditItemId.value = null;
}

function showDuplicateItem(id: number): void {
  selectedDuplicateItemId.value = id;
  isDuplicateModalOpen.value = true;
}

function closeDuplicateItem(): void {
  isDuplicateModalOpen.value = false;
  selectedDuplicateItemId.value = null;
}
</script>

<template>
  <div>
    <ShowDetails
      v-if="isDetailsModalOpen && selectedItemId"
      :id="selectedItemId"
      :name="items.find((item) => item.id === selectedItemId)?.name ?? ''"
      :stock="items.find((item) => item.id === selectedItemId)?.stock ?? 0"
      :price="items.find((item) => item.id === selectedItemId)?.price ?? 0"
      :description="
        items.find((item) => item.id === selectedItemId)?.description ?? ''
      "
      @close="closeDetails"
    />
    <AddItemForm @add="handleAdd" />
    <ShowItemList
      :items="items"
      @delete="openDeleteConfirm"
      @details="showDetails"
      @edit="showEditItem"
      @duplicate="showDuplicateItem"
    />
    <DeleteConfirmation
      v-if="isItemDeleted"
      :id="pendingDeleteId!"
      :name="items.find((item) => item.id === pendingDeleteId)?.name ?? ''"
      @confirm-delete="confirmDelete"
      @cancel="cancelDelete"
    />
    <EditItem
      v-if="isEditModalOpen && selectedEditItemId"
      :id="selectedEditItemId"
      :name="items.find((item) => item.id === selectedEditItemId)?.name ?? ''"
      :stock="items.find((item) => item.id === selectedEditItemId)?.stock ?? 0"
      :price="items.find((item) => item.id === selectedEditItemId)?.price ?? 0"
      :description="
        items.find((item) => item.id === selectedEditItemId)?.description ?? ''
      "
      @close="closeEditItem"
    />
    <DuplicateItem
      v-if="isDuplicateModalOpen && selectedDuplicateItemId"
      :id="selectedDuplicateItemId"
      :name="
        items.find((item) => item.id === selectedDuplicateItemId)?.name ?? ''
      "
      :stock="
        items.find((item) => item.id === selectedDuplicateItemId)?.stock ?? 0
      "
      :price="
        items.find((item) => item.id === selectedDuplicateItemId)?.price ?? 0
      "
      :description="
        items.find((item) => item.id === selectedDuplicateItemId)
          ?.description ?? ''
      "
      @close="closeDuplicateItem"
    />
  </div>
</template>

<style scoped>
div {
  margin-bottom: 2rem;
}
</style>
