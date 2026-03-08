<script setup lang="ts">
import { reactive } from "vue";
import type { Item } from "../scripts/item";

interface Props {
  id: number;
  name: string;
  stock: number;
  price: number;
  description: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", itemData: Omit<Item, "id">): void;
}>();

const formData = reactive<Omit<Item, "id">>({
  name: props.name,
  stock: props.stock,
  price: props.price,
  description: props.description,
});

function submitForm(): void {
  if (!formData.name.trim() || !formData.description.trim()) {
    alert("Please fill all fields");
    return;
  }

  emit("save", { ...formData });
  emit("close");
}
</script>

<template>
  <Teleport to="body">
    <div class="poe-modal-overlay" @click.self="emit('close')">
      <div class="poe-modal-content">
        <h2 class="poe-title">Modifier l'item</h2>

        <form @submit.prevent="submitForm" class="poe-form">
          <div class="poe-form-group">
            <label for="name" class="poe-label">Nom</label>
            <input
              id="name"
              type="text"
              v-model="formData.name"
              class="poe-input"
            />
          </div>

          <div class="poe-form-group">
            <label for="price" class="poe-label">Prix</label>
            <input
              id="price"
              type="number"
              step="0.01"
              v-model.number="formData.price"
              class="poe-input"
            />
          </div>

          <div class="poe-form-group">
            <label for="stock" class="poe-label">Stock</label>
            <input
              id="stock"
              type="number"
              v-model.number="formData.stock"
              class="poe-input"
            />
          </div>

          <div class="poe-form-group">
            <label for="description" class="poe-label">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="poe-textarea"
              rows="4"
            ></textarea>
          </div>

          <div class="poe-actions">
            <button
              type="button"
              class="poe-btn poe-cancel"
              @click="emit('close')"
            >
              Annuler
            </button>
            <button type="submit" class="poe-btn poe-confirm">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.poe-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: poe-fadeIn 0.3s ease-out;
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

.poe-modal-content {
  background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
  border: 1px solid #444;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.9);
  color: #f0f0f0;
}

.poe-title {
  text-align: center;
  color: #ffd700;
  margin-bottom: 20px;
}

.poe-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.poe-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.poe-label {
  color: #ffd700;
  font-weight: bold;
}

.poe-input,
.poe-textarea {
  background: #222;
  border: 1px solid #555;
  border-radius: 8px;
  padding: 12px;
  color: white;
}

.poe-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
}

.poe-btn {
  border: none;
  border-radius: 8px;
  padding: 12px 18px;
  cursor: pointer;
  font-weight: bold;
}

.poe-cancel {
  background: linear-gradient(145deg, #666, #555);
  color: white;
}

.poe-confirm {
  background: linear-gradient(145deg, #0066cc, #004499);
  color: white;
}

@keyframes poe-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
