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
  <div class="poe-form-container">
    <h1 class="poe-title">
      <p>Ajouter un item</p>
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
      
      <button type="submit" class="poe-submit-btn">
        <span>Ajouter l'item</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.poe-form-container {
  background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
  border-radius: 12px;
  border: 1px solid #444;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  padding: 24px;
  max-width: 500px;
  margin: 0 auto;
}

.poe-title {
  text-align: center;
  color: #ffd700;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #666;
}

.poe-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.poe-input,
.poe-textarea {
  background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
  border: 1px solid #555;
  border-radius: 8px;
  padding: 14px 16px;
  color: #f0f0f0;
  font-size: 15px;
  font-family: "Arial", sans-serif;
  min-height: 20px;
  box-shadow:
    inset 0 2px 6px rgba(0, 0, 0, 0.6),
    0 2px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
}

.poe-input:focus,
.poe-textarea:focus {
  outline: none;
  border-color: #ffd700;
  box-shadow:
    inset 0 2px 6px rgba(0, 0, 0, 0.6),
    0 0 0 2px rgba(255, 215, 0, 0.3),
    0 4px 12px rgba(255, 215, 0, 0.2);
  transform: translateY(-1px);
}

.poe-textarea {
  resize: vertical;
  min-height: 100px;
}

.poe-submit-btn {
  align-self: center;
  background: linear-gradient(145deg, #00cc66, #00994d);
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  box-shadow:
    0 4px 12px rgba(0, 204, 102, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.poe-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    0 6px 20px rgba(0, 204, 102, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.poe-submit-btn:active {
  transform: translateY(0);
}

.is-invalid {
  border-color: #dc3545 !important;
}

.invalid-feedback {
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .poe-form-container {
    margin: 0 16px;
    padding: 20px;
  }
  
  .poe-title {
    font-size: 20px;
  }
}
</style>
