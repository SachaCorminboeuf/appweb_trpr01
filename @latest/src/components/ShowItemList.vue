<script setup lang="ts">
import type { Item } from "../scripts/item";

const props = defineProps<{
  items: Item[];
}>();

const emit = defineEmits<{
  (e: "delete", id: number): void;
  (e: "details", id: number): void;
  (e: "edit", id: number): void;
  (e: "duplicate", id: number): void;
}>();

</script>

<template>
  <div class="poe-table-container">
    <div class="poe-table-wrapper">
      <table class="poe-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Stock</th>
            <th>Prix</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in props.items" :key="item.id">
            <td>
              <div class="poe-box">
                {{ item.id }}
              </div>
            </td>
            <td>
              <div class="poe-box">
                {{ item.name }}
              </div>
            </td>
            <td>

              <div v-if="item.stock < 4" class="poe-box bg-danger">
                {{ item.stock }}
              </div>

              <div v-else-if="item.stock <= 10" class="poe-box bg-warning">
                {{ item.stock }}
              </div>

              <div v-else class="poe-box bg-success">
                {{ item.stock }}
              </div>
            </td>

            <td>
              <div class="poe-box">
                {{ item.price }}
              </div>
            </td>
            <td>
              <div class="poe-box poe-desc">
                {{ item.description }}
              </div>
            </td>
            <td>
              <div class="poe-actions">
                <div class="col">
                  <button
                    class="poe-btn poe-details"
                    @click="emit('details', item.id)"
                  >
                    Voir les détails
                  </button>
                  <button
                    class="poe-btn poe-delete"
                    @click="emit('delete', item.id)"
                  >
                    Supprimer
                  </button>
                </div>
                <div class="col">
                  <button
                    class="poe-btn poe-edit"
                    @click="emit('edit', item.id)"
                  >
                    Modifier
                  </button>
                  <button
                    class="poe-btn poe-duplicate"
                    @click="emit('duplicate', item.id)"
                  >
                    Dupliquer
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.poe-table-container {
  max-height: 500px;
  overflow-y: auto;
  background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
  border-radius: 8px;
  border: 1px solid #444;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
}

.poe-table-wrapper {
  padding: 16px;
}

.poe-table {
  width: 100%;
  border-collapse: collapse;
  color: #f0f0f0;
  font-family: "Arial", sans-serif;
  font-size: 14px;
}

.poe-table th {
  padding: 12px 8px;
  text-align: center;
  color: #ffd700;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  border-bottom: 2px solid #666;
}

.poe-table td {
  padding: 8px;
  vertical-align: middle;
}

.poe-box {
  border: 1px solid #555;
  border-radius: 6px;
  padding: 12px;
  margin: 4px 0;
  min-height: 20px;
  text-align: center;
  box-shadow:
    inset 0 1px 3px rgba(0, 0, 0, 0.5),
    0 2px 4px rgba(0, 0, 0, 0.3);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
}

.poe-box.bg-danger {
  background: var(--bs-danger) !important;
  border-color: var(--bs-danger) !important;
  color: red !important;
}

.poe-box.bg-warning {
  background: var(--bs-warning) !important;
  border-color: var(--bs-warning) !important;
  color: yellow !important;
}

.poe-box.bg-success {
  background: var(--bs-success) !important;
  border-color: var(--bs-success) !important;
  color: green !important;
}

.poe-desc {
  text-align: left !important;
  font-size: 13px;
  line-height: 1.4;
  max-height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.poe-actions {
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-wrap: wrap;
}

.poe-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
}

.poe-delete {
  background: linear-gradient(145deg, #cc0000, #aa0000);
  color: white;
}

.poe-edit {
  background: linear-gradient(145deg, #ffaa00, #dd8800);
  color: white;
}

.poe-duplicate {
  background: linear-gradient(145deg, #0066cc, #004499);
  color: white;
}

.poe-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
}
.poe-details {
  background: linear-gradient(145deg, #00cc66, #00994d);
  color: white;
}

@media (max-width: 768px) {
  .poe-table th,
  .poe-table td {
    padding: 6px 4px;
    font-size: 12px;
  }
}
</style>
