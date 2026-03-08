<script setup lang="ts">
import { ref, computed } from "vue";
import type { Item } from "../scripts/item";

import AddItemForm from "./AddItem.vue";
import ShowItemList from "./ShowItemList.vue";
import DeleteConfirmation from "./DeleteConfirmation.vue";
import ShowDetails from "./ShowDetails.vue";
import EditItem from "./EditItem.vue";
import ConfirmDuplicate from "./ConfirmDuplicate.vue";
import CSVDownload from "./CSVDownload.vue";
import LowStockAlert from "./LowStockAlert.vue";
import SearchBar from "./SearchBar.vue";

import itemsData from "../scripts/item";

const items = ref<Item[]>([...itemsData]);
let nextId = items.value.length + 1;

const searchTerm = ref("");

const filteredItems = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();

  if (!term) {
    return items.value;
  }

  return items.value.filter(
    (item) =>
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      String(item.id).includes(term),
  );
});

const isLowStockAlertOpen = ref(false);
const lowStockItemName = ref("");
const lowStockValue = ref(0);

const isItemDeleted = ref(false);
const pendingDeleteId = ref<number | null>(null);

const isDetailsModalOpen = ref(false);
const selectedItemId = ref<number | null>(null);

const isEditModalOpen = ref(false);
const selectedEditItemId = ref<number | null>(null);

const isDuplicateModalOpen = ref(false);
const selectedDuplicateItemId = ref<number | null>(null);

const isAddModalOpen = ref(false);

function openAddItem(): void {
  isAddModalOpen.value = true;
}

function closeAddItem(): void {
  isAddModalOpen.value = false;
}

function saveNewItem(newItemData: Omit<Item, "id">): void {
  handleAdd(newItemData);
  closeAddItem();
}

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
  <div class="main-screen">
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

    <div class="top-actions">
      <SearchBar v-model="searchTerm" />

      <div class="action-buttons">
        <button class="add-item-btn" @click="openAddItem">
          Ajouter un item
        </button>

        <CSVDownload :items="items" />
      </div>

      <AddItemForm
        v-if="isAddModalOpen"
        @add="saveNewItem"
        @close="closeAddItem"
      />
    </div>

    <ShowItemList
      :items="filteredItems"
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
.main-screen {
  margin-bottom: 2rem;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 1rem 0;
}

.action-buttons {
  display: flex;
  gap: 12px;
  flex: 1;
}

.add-item-btn {
  flex: 1;
  background: linear-gradient(145deg, #00cc66, #00994d);
  border: none;
  border-radius: 8px;
  padding: 12px 18px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 204, 102, 0.4);
  transition: all 0.3s ease;
}

.add-item-btn:hover {
  transform: translateY(-2px);
}

.top-actions :deep(.search-container) {
  flex: 2;
  margin: 0;
  justify-content: flex-start;
}

.top-actions :deep(.search-input) {
  width: 100%;
  max-width: none;
}

.action-buttons :deep(.export-container) {
  flex: 1;
  margin: 0;
  display: flex;
}

.action-buttons :deep(.poe-export) {
  flex: 1;
  width: 100%;
}

@media (max-width: 768px) {
  .top-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .action-buttons {
    width: 100%;
  }
}

.top-bar {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.add-item-btn {
  background: linear-gradient(145deg, #00cc66, #00994d);
  border: none;
  border-radius: 8px;
  padding: 14px 24px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 204, 102, 0.4);
  transition: all 0.3s ease;
}

.add-item-btn:hover {
  transform: translateY(-2px);
}

.main-screen {
  margin-bottom: 2rem;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 1rem 0;
}

.top-actions :deep(.search-container) {
  flex: 1;
  margin: 0;
  justify-content: flex-start;
}

.top-actions :deep(.search-input) {
  max-width: none;
  width: 100%;
}

.top-actions :deep(.export-container) {
  margin: 0;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .top-actions {
    flex-direction: column;
    align-items: stretch;
  }
}

.main-screen {
  margin-bottom: 2rem;
}
</style>
