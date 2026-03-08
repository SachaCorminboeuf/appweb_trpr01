<script setup lang="ts">
import { reactive, ref } from "vue";
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

const submitted = ref(false);

function isFormValid(): boolean {
  return (
    !!formData.name.trim() &&
    formData.price > 0 &&
    formData.stock >= 0 &&
    !!formData.description.trim()
  );
}

function submitForm(): void {
  submitted.value = true;

  if (!isFormValid()) {
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
        <h1 class="poe-confirm-title">Dupliquer l'item</h1>

        <form @submit.prevent="submitForm" class="poe-form" novalidate>
          <div class="poe-form-group">
            <label for="name" class="poe-label">Nom</label>
            <input
              id="name"
              type="text"
              v-model="formData.name"
              class="poe-input form-control"
              :class="{ 'is-invalid': submitted && !formData.name.trim() }"
            />
            <div
              v-if="submitted && !formData.name.trim()"
              class="invalid-feedback"
            >
              Le nom est obligatoire.
            </div>
          </div>

          <div class="poe-form-group">
            <label for="price" class="poe-label">Prix</label>
            <input
              id="price"
              type="number"
              step="0.01"
              v-model.number="formData.price"
              class="poe-input form-control"
              :class="{ 'is-invalid': submitted && formData.price <= 0 }"
            />
            <div
              v-if="submitted && formData.price <= 0"
              class="invalid-feedback"
            >
              Le prix doit être supérieur à 0.
            </div>
          </div>

          <div class="poe-form-group">
            <label for="stock" class="poe-label">Stock</label>
            <input
              id="stock"
              type="number"
              v-model.number="formData.stock"
              class="poe-input form-control"
              :class="{ 'is-invalid': submitted && formData.stock < 0 }"
            />
            <div
              v-if="submitted && formData.stock < 0"
              class="invalid-feedback"
            >
              Le stock ne peut pas être négatif.
            </div>
          </div>

          <div class="poe-form-group">
            <label for="description" class="poe-label">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="poe-textarea form-control"
              :class="{
                'is-invalid': submitted && !formData.description.trim(),
              }"
              rows="4"
            ></textarea>
            <div
              v-if="submitted && !formData.description.trim()"
              class="invalid-feedback"
            >
              La description est obligatoire.
            </div>
          </div>

          <div class="poe-confirm-actions">
            <button
              type="button"
              class="poe-btn poe-cancel"
              @click="emit('close')"
            >
              Annuler
            </button>
            <button type="submit" class="poe-btn poe-confirm">Dupliquer</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.poe-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: poe-fadeIn 0.3s ease-out;
}

.poe-modal-content {
  background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
  border-radius: 12px;
  border: 1px solid #444;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
  padding: 32px;
  max-width: 520px;
  width: 90%;
  color: #f0f0f0;
}

.poe-confirm-title {
  color: #ffd700;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
}

.poe-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.poe-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.poe-label {
  color: #ffd700;
  font-weight: bold;
  font-size: 14px;
}

.poe-input,
.poe-textarea {
  background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
  border: 1px solid #555;
  border-radius: 8px;
  padding: 12px 14px;
  color: #f0f0f0;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.poe-textarea {
  resize: vertical;
  min-height: 100px;
}

.poe-confirm-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 8px;
}

.poe-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.poe-cancel {
  background: linear-gradient(145deg, #666, #555);
  color: white;
}

.poe-confirm {
  background: linear-gradient(145deg, #0066cc, #004499);
  color: white;
}

.poe-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

.is-invalid {
  border-color: #dc3545 !important;
}

.invalid-feedback {
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 4px;
}

@keyframes poe-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .poe-modal-content {
    margin: 0 16px;
    padding: 24px;
  }
}
</style>
