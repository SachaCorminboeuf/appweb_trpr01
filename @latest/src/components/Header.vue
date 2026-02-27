<script setup lang="ts">
</script>

<template>
  <header class="poe-header">
    <img 
      src="/src/assets/images/image.png" 
      alt="Logo Path of Exile" 
      class="poe-logo"
    />
    <p class="poe-title">Path Of Exile 2 Trading Hall</p>
  </header>
</template>

<style scoped>
.poe-header {
  display: flex;
  align-items: center; /* Vertically center logo + text */
  gap: 16px; /* Space between logo and text */
  padding: 16px 24px;
  background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
  border-bottom: 2px solid #444;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  height: 80px; /* Fixed height for consistency */
  overflow: hidden;
}

.poe-logo {
  height: 60px; /* Fixed height to match text container */
  width: auto; /* Maintain aspect ratio */
  flex-shrink: 0; /* Prevent logo from shrinking */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.poe-title {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
  line-height: 1.2; /* Tight line height for same visual height */
  flex: 1; /* Take remaining space */
  white-space: nowrap; /* Prevent text wrap */
}

@media (max-width: 768px) {
  .poe-header {
    padding: 12px 16px;
    height: 70px;
  }
  
  .poe-logo {
    height: 50px;
  }
  
  .poe-title {
    font-size: 24px;
  }
}
</style>
