<script setup lang="ts">
interface Props {
  id: number;
  name: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>

<template>
  <Teleport to="body">
    <div class="poe-modal-overlay" @click.self="emit('cancel')">
      <div class="poe-modal-content">
        <h1 class="poe-confirm-title">Confirmer la duplication</h1>
        <p class="poe-confirm-message">Dupliquer l'item "{{ props.name }}" ?</p>

        <div class="poe-confirm-actions">
          <button class="poe-btn poe-cancel" @click="emit('cancel')">
            Annuler
          </button>
          <button class="poe-btn poe-confirm" @click="emit('confirm')">
            Dupliquer
          </button>
        </div>
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
  text-align: center;
  max-width: 400px;
  width: 90%;
  color: #f0f0f0;
}

.poe-confirm-title {
  color: #ffd700;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
}

.poe-confirm-message {
  color: #f0f0f0;
  font-size: 16px;
  margin-bottom: 32px;
  line-height: 1.4;
}

.poe-confirm-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
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
