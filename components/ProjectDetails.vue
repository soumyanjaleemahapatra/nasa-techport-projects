<template>
    <div v-if="project.detail" class="project-details" @click="toggleDetailsVisibility">
      <div>
        <h2>{{project.detail?.title}}</h2>
        <p class="project-details-text"> Project Id: {{project.projectId}} </p>
        <p class="project-details-text">Start date: {{ project.detail?.startDateString }}</p>
        <p class="project-details-text">End date: {{ project.detail?.endDateString }}</p>
        <p class="project-details-text">Last updated: {{ project.detail?.lastUpdated }}</p>
        <ClientOnly>
          <Teleport to="body" v-if="isAdditionalDetailsVisible">
          <div class="additional-details--wrapper" 
            @click="toggleDetailsVisibility" 
            @keydown.escape="closeOnEscape"
          >
            <div class="additional-details">
              <h3>Project details:</h3>
              <div v-if="project.detail?.description">
                {{sanitizeText(project.detail.description)}}
              </div>
              <div v-if="project.detail?.leadOrganization">
                <p class="project-details-text-bold">Lead Organization: <span>{{ project.detail.leadOrganization.organizationName }}</span></p>
              </div>
              <div v-if="project.detail?.supportingOrganizations">
                <p class="project-details-text-bold">Supporting Organizations:</p>
                <ul v-for="organization in project.detail.supportingOrganizations">
                  <li>{{organization?.organizationName}} ({{organization?.country?.name}})</li>
                </ul>
              </div>
              <div v-if="project.detail?.principalInvestigators || project.detail?.programDirectors ||project.detail?.projectManagers">
                <h4>Project contact details:</h4>
                <div  class="d-flex">
                  <div v-if="project.detail?.principalInvestigators">
                    <ProjectContact 
                      role="Principal Investigator(s)" 
                      :contactDetails="project.detail.principalInvestigators"
                    />
                  </div>
                  <div v-if="project.detail?.programDirectors">
                    <ProjectContact 
                      role="Program Director(s)" 
                      :contactDetails="project.detail.programDirectors"
                    />
                  </div>
                  <div v-if="project.detail?.projectManagers">
                    <ProjectContact 
                      role="Project Manager(s)" 
                      :contactDetails="project.detail.projectManagers"
                    />
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </Teleport> 
        </ClientOnly>
        
        
      </div>
      <div v-if="project.detail?.statusDescription" 
        class="project-details-status" 
        :class="getStatusClass(project.detail.statusDescription)"
      >
        {{  project.detail?.statusDescription }}
      </div>
    </div>
</template>
  
<script setup>
import { ref, defineProps } from 'vue';
import { sanitizeText } from '@/utils/utils';
import ProjectContact from '@/components/ProjectContact.vue';

const props = defineProps(['project']);
const isAdditionalDetailsVisible = ref(false);

const toggleDetailsVisibility = () => {
	isAdditionalDetailsVisible.value =!isAdditionalDetailsVisible.value
};

const getStatusClass = (status) => {
  return {
    'active': status === 'Active',
    'completed': status === 'Completed',
    'canceled': status === 'Canceled'
  };
};

const closeOnEscape = () => {
  if (isAdditionalDetailsVisible.value) {
    toggleDetailsVisibility();
  }
};

onMounted(() => {
  document.addEventListener('keydown', closeOnEscape);
});
onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape);
});
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

  .additional-details {
    color: #333;
    padding: 3rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    width: 80%;
    max-height: 80%;
    overflow-y: scroll;
  }

  .additional-details--wrapper {
    color: transparent;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #F4F4F4;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Arial', sans-serif;
    font-size: 1.125rem;
  }

  .d-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
  }
</style>