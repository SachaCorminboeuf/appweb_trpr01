<script setup lang="ts">
import { reactive, ref } from "vue"
import type { Item } from "../scripts/item"

const formData = reactive<Omit<Item, 'id'>>({
  name: "",
  price: 0,
  stock: 0,
  description: ""
})

// J'ai utilisé l'ia pour trouver la fonction Omit qui permet de créer un objet sans la propriété id, 
// ce qui est parfait pour notre formulaire d'ajout d'item, car l'id est généré automatiquement dans MainScreen.vue.
const emit = defineEmits<{
  (e: 'add', itemData: Omit<Item, 'id'>): void
  (e: 'close'): void
}>()

const submitted = ref(false)

function isFormValid(): boolean {
  return (
    !!formData.name.trim() &&
    formData.price > 0 &&
    formData.stock >= 0 &&
    !!formData.description.trim()
  )
}

function submitForm(): void {
  submitted.value = true

  if (!isFormValid()) {
    return
  }

  emit('add', { ...formData })

  Object.assign(formData, {
    name: "",
    price: 0,
    stock: 0,
    description: ""
  })

  submitted.value = false
}
</script>

<template>
  <Teleport to="body">
    <div class="poe-modal-overlay" @click.self="emit('close')">
      <div class="poe-modal-content">
        <h1 class="poe-title">
          Ajouter un item
        </h1>
        
        <form @submit.prevent="submitForm" class="poe-form" novalidate>
          <div class="poe-form-group">
            <label for="name" class="poe-label">Nom</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              v-model="formData.name"
              class="poe-input form-control"
              :class="{ 'is-invalid': submitted && !formData.name.trim() }"
              placeholder="Entrer le nom de l'item"
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
              type="number" 
              step="0.01" 
              id="price" 
              name="price" 
              v-model.number="formData.price"
              class="poe-input form-control"
              :class="{ 'is-invalid': submitted && formData.price <= 0 }"
              placeholder="0.00"
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
              type="number" 
              id="stock" 
              name="stock" 
              v-model.number="formData.stock"
              class="poe-input form-control"
              :class="{ 'is-invalid': submitted && formData.stock < 0 }"
              placeholder="0"
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
              name="description"
              v-model="formData.description"
              class="poe-textarea form-control"
              :class="{ 'is-invalid': submitted && !formData.description.trim() }"
              placeholder="Entrer la description de l'item"
              rows="4"
            ></textarea>
            <div
              v-if="submitted && !formData.description.trim()"
              class="invalid-feedback"
            >
              La description est obligatoire.
            </div>
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
              Ajouter
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

.poe-textarea {
  resize: vertical;
  min-height: 100px;
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
  background: linear-gradient(145deg, #00cc66, #00994d);
  color: white;
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
</style>
