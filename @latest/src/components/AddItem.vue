<script setup lang="ts"></script>
<template>
  <h1>
    <p>Add a new item</p>
    <!-- Le layout de ce formulaire a été généré par l'intelligence artificiel --> 
    <form>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>

      <div>
        <label for="price">Price</label>
        <input type="number" step="0.01" id="price" name="price" />
      </div>

      <div>
        <label for="description">Description</label>
        <textarea id="description" name="description"></textarea>
      </div>
      <div>
        <label for="stock">Stock</label>
        <input type="number" id="stock" name="stock" />
      </div>
      <button type="submit">Add Item</button>
    </form>
  </h1>
</template>
<style scoped></style>
