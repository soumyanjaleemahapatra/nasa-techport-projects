<template>
  <div
    v-if="project.detail"
    class="project-details"
    @click="toggleDetailsVisibility"
  >
    <div>
      <h2>{{ project.detail?.title }}</h2>
      <p class="project-details-text">
        Project Id: {{ project.projectId }}
      </p>
      <p class="project-details-text">
        Start date: {{ project.detail?.startDateString }}
      </p>
      <p class="project-details-text">
        End date: {{ project.detail?.endDateString }}
      </p>
      <p class="project-details-text">
        Last updated: {{ project.detail?.lastUpdated }}
      </p>
      <ClientOnly>
        <Teleport
          v-if="isAdditionalDetailsVisible"
          to="body"
        >
          <AdditionalDetails
            :project="project"
            @toggle-visibility="toggleDetailsVisibility"
          />
        </Teleport> 
      </ClientOnly>
    </div>
    <div
      v-if="project.detail?.statusDescription" 
      class="project-details-status" 
      :class="getStatusClass(project.detail.statusDescription)"
    >
      {{ project.detail?.statusDescription }}
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import AdditionalDetails from '@/components/AdditionalDetails.vue';

const {project} = defineProps(['project']);
const isAdditionalDetailsVisible = ref(false);

const toggleDetailsVisibility = () => {
	isAdditionalDetailsVisible.value = !isAdditionalDetailsVisible.value
};

const getStatusClass = (status) => {
  return {
    'active': status === 'Active',
    'completed': status === 'Completed',
    'canceled': status === 'Canceled'
  };
};
</script>
<style scoped>
  .project-details {
    background-color: #FAFAFA;
    transition: background-color 0.3s ease;
    color: #333;
    border: 0.0625rem solid #ccc;
    border-radius: 0.5rem;
    margin-bottom: 0.625rem;
    max-width: 50rem;
    cursor: pointer;
    padding: 1.25rem;
    font-family: 'Arial', sans-serif;
    font-size: 1.125rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    flex: 1;
  }

  .project-details:hover {
    background-color: #F5F5F5;
  }

  .project-details-text {
    margin: 0.625rem 0;
  }

  .project-details-text-bold {
    font-weight: bold;
    span {
      font-weight: normal;
    }
  }

  .project-details-status {
    padding: 8px;
    border-radius: 4px;
    color: #fff;
    width: 6.25rem;
    text-align: center;
    margin: 0 auto;
  }

  .active {
    background-color: #00b894;
  }

  .completed {
    background-color: #7F7FFF;
  }

  .canceled {
    background-color: #d63031;
  }
</style>