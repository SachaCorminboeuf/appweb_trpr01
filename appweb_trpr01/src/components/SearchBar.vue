<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
//La fonctionnalité utilise une approche de liaison bidirectionnelle (v-model) pour permettre à un composant parent de contrôler la valeur de recherche.
// Lorsque l'utilisateur saisit du texte dans le champ de recherche, la fonction updateValue est déclenchée, émettant un événement "update:modelValue" avec la nouvelle valeur. 
// Le composant parent peut alors écouter cet événement pour mettre à jour sa propre variable de recherche en conséquence.
function updateValue(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", value);
}
</script>

<template>
  <div class="search-container">
    <input
      :value="props.modelValue"
      @input="updateValue"
      type="text"
      class="search-input"
      placeholder="Rechercher un item par nom, description ou ID"
    />
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 12px 16px;
  border: 1px solid #555;
  border-radius: 8px;
  background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
  color: #f0f0f0;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #ffd700;
  box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
}
</style>
