<script setup lang="ts">

interface Props {
  id: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'confirm-delete'): void
  (e: 'cancel'): void
  (e: 'update:modelValue', value: boolean): void
}>()

</script>
<!-- L'IA a généré le modal pour moi, la logic du emit a été faite par moi -->
<template>
  <div class="poe-modal-overlay" @click.self="$emit('cancel')">
    <div class="poe-modal-content">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete item ID {{ props.id }}</p>
      <div class="poe-modal-actions">
        <button class="poe-btn poe-confirm" @click="$emit('confirm-delete')">
          Yes, Delete
        </button>
        <button class="poe-btn poe-cancel" @click="$emit('cancel')">
          No, Cancel
        </button>
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

.poe-modal-content {
  background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
  border: 1px solid #444;
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.9);
  text-align: center;
  color: #f0f0f0;
  font-family: Arial, sans-serif;
  animation: poe-slideUp 0.3s ease-out;
}

.poe-modal-content h2 {
  color: #ffd700;
  margin: 0 0 16px 0;
  font-size: 20px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

.poe-modal-content p {
  margin: 0 0 24px 0;
  font-size: 14px;
  line-height: 1.4;
}

.poe-modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.poe-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
  min-width: 100px;
}

.poe-confirm {
  background: linear-gradient(145deg, #cc0000, #aa0000);
  color: white;
}

.poe-cancel {
  background: linear-gradient(145deg, #666, #555);
  color: #f0f0f0;
}

.poe-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}

@keyframes poe-fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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
  .poe-modal-content {
    padding: 20px;
    margin: 20px;
  }
}
</style>
