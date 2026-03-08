<script setup lang="ts">
import AddItemForm from "./AddItem.vue";
import ShowItemList from "./ShowItemList.vue";
import DeleteConfirmation from "./DeleteConfirmation.vue";
import { ref } from "vue";
import type { Item } from "../scripts/item";


import itemsData from "../scripts/item";
import ShowDetails from "./ShowDetails.vue";
import EditItem from "./EditItem.vue";
import ConfirmDuplicate from "./ConfirmDuplicate.vue";
import CSVDownload from "./CSVDownload.vue";
import LowStockAlert from "./LowStockAlert.vue";

const isLowStockAlertOpen = ref(false);
const lowStockItemName = ref("");
const lowStockValue = ref(0);


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
    const oldStock = existingItem.stock;

    const updatedItem: Item = {
      ...existingItem,
      ...editedItemData,
    };

    items.value = items.value.map((item) =>
      item.id === existingItem.id ? updatedItem : item,
    );

    if (oldStock >= 4 && updatedItem.stock < 4) {
      openLowStockAlert(updatedItem.name, updatedItem.stock);
    }
  }
}


function saveEditedItem(editedItemData: Omit<Item, "id">): void {
  handleEdit(editedItemData);
  closeEditItem();
}

function duplicateWithChanges(newItemData: Omit<Item, "id">): void {
  const newItem: Item = {
    id: nextId++,
    ...newItemData,
  };

  items.value.push(newItem);
  closeDuplicateItem();
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

function openLowStockAlert(name: string, stock: number): void {
  lowStockItemName.value = name;
  lowStockValue.value = stock;
  isLowStockAlertOpen.value = true;
}

function closeLowStockAlert(): void {
  isLowStockAlertOpen.value = false;
  lowStockItemName.value = "";
  lowStockValue.value = 0;
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
    <CSVDownload :items="items" />
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
      @save="saveEditedItem"
      @close="closeEditItem"
    />
    <ConfirmDuplicate
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
      @save="duplicateWithChanges"
      @close="closeDuplicateItem"
    />
    

    <LowStockAlert
  :show="isLowStockAlertOpen"
  :item-name="lowStockItemName"
  :stock="lowStockValue"
  @close="closeLowStockAlert"
/>

  </div>
</template>

<style scoped>
div {
  margin-bottom: 2rem;
}
</style>
