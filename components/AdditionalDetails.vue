<template>
  <div
    class="additional-details--wrapper"
    @click="toggleVisibility"
    @keydown.escape="closeOnEscape"
  >
    <div class="additional-details">
      <h3>Project details:</h3>
      <div v-if="project.detail?.description">
        {{ sanitizeText(project.detail.description) }}
      </div>
      <div v-if="project.detail?.leadOrganization">
        <p class="text-bold">
          Lead Organization:
          <span>{{ project.detail.leadOrganization.organizationName }}</span>
        </p>
      </div>
      <div v-if="project.detail?.supportingOrganizations">
        <p class="text-bold">Supporting Organizations:</p>
        <ul>
          <template
            v-for="organization in project.detail.supportingOrganizations"
            :key="organization.organizationId"
          >
            <li>
              {{ organization?.organizationName }} ({{
                organization?.country?.name
              }})
            </li>
          </template>
        </ul>
      </div>
      <div
        v-if="
          project.detail?.principalInvestigators ||
          project.detail?.programDirectors ||
          project.detail?.projectManagers
        "
      >
        <h4>Project contact details:</h4>
        <div class="d-flex">
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
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue'
import ProjectContact from '@/components/ProjectContact.vue';
import { sanitizeText } from '@/utils/utils';

const { project} = defineProps(['project'])
const emit = defineEmits(['toggleVisibility'])

const toggleVisibility = () => {
	emit('toggleVisibility')
};
const closeOnEscape = () => {
    toggleVisibility()
};

onMounted(() => {
  document.addEventListener('keydown', closeOnEscape);
});
onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape);
});
</script>
<style scoped>
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

  .text-bold {
    font-weight: bold;
    span {
      font-weight: normal;
    }
  }
</style>