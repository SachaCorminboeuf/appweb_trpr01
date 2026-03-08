<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  itemName: string;
  stock: number;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <Teleport to="body">
    <div v-if="props.show" class="poe-modal-overlay" @click.self="emit('close')">
      <div class="poe-modal-content">
        <h2 class="poe-alert-title">Alerte de stock bas</h2>
        <p class="poe-alert-message">
          L'item "{{ props.itemName }}" a maintenant un stock de {{ props.stock }}.
        </p>
        <button class="poe-btn poe-close" @click="emit('close')">
          Fermer
        </button>
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
  z-index: 2000;
}

.poe-modal-content {
  background: linear-gradient(145deg, #2b0000, #140000);
  border: 1px solid #cc0000;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 420px;
  text-align: center;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
}

.poe-alert-title {
  color: #ff4d4d;
  margin-bottom: 12px;
}

.poe-alert-message {
  margin-bottom: 20px;
  line-height: 1.4;
}

.poe-btn {
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-weight: bold;
  cursor: pointer;
}

.poe-close {
  background: linear-gradient(145deg, #cc0000, #990000);
  color: white;
}
</style>
