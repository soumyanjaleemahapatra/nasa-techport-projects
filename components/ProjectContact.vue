<template>
    <div class="project-contact">
      <h5>{{ role }}</h5>
      <div v-for="contact in contactDetails" :key="contact.contactId" class="project-contact__detail">
        <p class="project-contact__detail__text">{{ contact.fullName }}</p>
        <a v-if="contact.primaryEmail" 
          class="project-contact__detail__link" 
          :href="'mailto:' + contact.primaryEmail"
          @click.stop
        >
          {{ contact.primaryEmail }}
        </a>
      </div>
    </div>
  </template>

<script setup>
const { contactDetails, role } = defineProps(['contactDetails', 'role']);
</script>

<style scoped>
  .project-contact {
    background-color: #FFF4D0;
    padding: 0.625rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  }

  .project-contact__detail {
    margin-bottom: 0.625rem;
  }

  .project-contact__detail__text {
    margin: 0.3125rem 0;
  }

  .project-contact__detail__link {
    color: #F4978E;
    
    &:hover {
      color: #E7847B;
    }
  }
</style>

