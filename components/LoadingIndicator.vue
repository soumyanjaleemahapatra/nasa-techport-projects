<template>
  <div class="loading-indicator">
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
        stroke="#3498db"
        stroke-linecap="round"
        class="spinner" 
      >
      </circle>
    </svg>
  </div>
</template>

<style>
.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg); 
  }
}
</style>

