<template>
  <div class="pagination">
    <p class="pagination__text">
      Total projects to display:
    </p>
    <button
      :class="{ 'active': pageSize === 10 }"
      @click="changePageSize(10)"
    >
      10
    </button>
    <button
      :class="{ 'active': pageSize === 25 }"
      @click="changePageSize(25)"
    >
      25
    </button>
    <button
      :class="{ 'active': pageSize === 50 }"
      @click="changePageSize(50)"
    >
      50
    </button>
  </div>
</template>
  
<script setup>

const emit = defineEmits(['pageSizeChanged']);
const {pageSize} = defineProps(['pageSize']);

const changePageSize = (size) => {
    emit('pageSizeChanged', size);
};

</script>
<style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    background-color: #f2f2f2;
    padding: 1rem;
    border-radius: 0.25rem;
  }

  .pagination__text {
    font-family: 'Arial', sans-serif;
    font-size: 1rem;
  }

  .pagination button {
    border: none;
    background-color: #4caf50;
    color: white;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 0.25rem;
  }

  .pagination button:hover {
    background-color: #45a049;
  }

  .pagination button.active {
    background-color: #388e3c;
  }
</style>
