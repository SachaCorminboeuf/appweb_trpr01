<script setup lang="ts">
import type { Item } from "../scripts/item";

const props = defineProps<{
  items: Item[];
}>();
//La fonctionnalité d'exportation CSV a été généré par l'ia.
function escapeCsv(value: string | number): string {
  const stringValue = String(value).replace(/"/g, '""');
  return `"${stringValue}"`;
}

function exportToCsv(): void {
  const headers = ["id", "name", "stock", "price", "description"];

  const rows = props.items.map((item) => [
    escapeCsv(item.id),
    escapeCsv(item.name),
    escapeCsv(item.stock),
    escapeCsv(item.price),
    escapeCsv(item.description),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "items.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="export-container">
    <button class="poe-btn poe-export" @click="exportToCsv">
      Exporter en CSV
    </button>
  </div>
</template>

<style scoped>
.export-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.poe-export {
  background: linear-gradient(145deg, #ff007b, #563d7c);
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  transition: all 0.2s;
}

.poe-export:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}
</style>
