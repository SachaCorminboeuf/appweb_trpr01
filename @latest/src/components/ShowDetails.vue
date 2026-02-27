<script setup lang="ts">
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
}>();
</script>

<template>
  <div class="poe-modal-overlay" @click.self="$emit('close')">
    <div class="poe-item-details">
      <h2>Item Details</h2>
      <div class="poe-details-grid">
        <div class="poe-detail-box">
          <label>ID</label>
          <div class="poe-box">{{ props.id }}</div>
        </div>
        <div class="poe-detail-box">
          <label>Name</label>
          <div class="poe-box">{{ props.name }}</div>
        </div>
        <div class="poe-detail-box">
          <label>Stock</label>
          <div class="poe-box">{{ props.stock }}</div>
        </div>
        <div class="poe-detail-box">
          <label>Price</label>
          <div class="poe-box">{{ props.price }}</div>
        </div>
        <div class="poe-detail-box poe-full">
          <label>Description</label>
          <div class="poe-box poe-desc">{{ props.description }}</div>
        </div>
      </div>
    </div>
  </div>
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

.poe-item-details {
  background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
  border: 1px solid #444;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.9);
  color: #f0f0f0;
  font-family: Arial, sans-serif;
  animation: poe-slideUp 0.3s ease-out;
}

.poe-item-details h2 {
  color: #ffd700;
  margin: 0 0 20px 0;
  font-size: 22px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  text-align: center;
}

.poe-item-details p {
  margin: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.poe-item-details p strong {
  color: #ffd700;
  font-weight: bold;
  min-width: 80px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
}
.poe-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.poe-detail-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.poe-detail-box label {
  color: #ffd700;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

.poe-box {
  background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
  border: 1px solid #555;
  border-radius: 6px;
  padding: 12px 16px;
  text-align: center;
  box-shadow:
    inset 0 1px 3px rgba(0, 0, 0, 0.5),
    0 2px 6px rgba(0, 0, 0, 0.4);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  font-size: 14px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.poe-desc {
  text-align: left !important;
  justify-content: flex-start;
  line-height: 1.4;
  max-height: 100px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}

.poe-full {
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .poe-details-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@keyframes poe-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes poe-slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 768px) {
  .poe-item-details {
    padding: 20px;
    margin: 20px;
  }

  .poe-item-details p {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>
