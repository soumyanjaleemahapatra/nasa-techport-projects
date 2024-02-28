<template>
  <div class="projects--wrapper">
    <h1>NASA TechPort Projects</h1>

    <div
      v-if="errorMessage"
      class="error-message"
    >
      {{ errorMessage }}
    </div>

    <div
      v-if="isLoading"
      class="spinner"
    >
      <LoadingIndicator v-if="isLoading" />
    </div>

    <div v-else>
      <div class="projects">
        <p class="projects__text">
          Search projects from date:
        </p>
        <ClientOnly>
          <VueDatePicker
            v-model="searchDate"
            :enable-time-picker="false"
            :clearable="false"
            format="yyyy-MM-dd"
            :max-date="new Date()"
            class="projects__date-picker"
          />
        </ClientOnly>
      </div>

      <ul
        v-if="!isLoading"
        class="projects__list"
      >
        <li
          v-for="project in displayedProjects" 
          :key="project.id"
          class="projects__list__item"
        >
          <ProjectDetails :project="project" />
        </li>
      </ul>
      <div v-if="!isLoading && projects.length === 0 && !errorMessage">
        <p class="projects__text">
          No projects were updated since {{ formatDateToString(searchDate) }}
        </p>
      </div>
      <PaginationComponent
        v-if="!isLoading && displayedProjects.length > 0 && projects.length >= 10"
        :page-size="pageSize" 
        @page-size-changed="pageSize=$event"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { formatDateToString } from '@/utils/utils';
import ProjectDetails from '@/components/ProjectDetails.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';

export default {
  components: { VueDatePicker, ProjectDetails, PaginationComponent, LoadingIndicator },
  setup() {
    const searchDate = ref(new Date(new Date().setDate(new Date().getDate() - 7)));
    const isLoading = ref(true);
    const projects = ref([]);
    const displayedProjects = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const errorMessage = ref('');

    const resetPage = () => {
      projects.value = [];
      displayedProjects.value = [];
      currentPage.value = 1;
    };

    const fetchProjects = async () => {
      isLoading.value = true;
      errorMessage.value = ''; 
      resetPage();
      try {
        const queryParams = new URLSearchParams({
          updatedSince: formatDateToString(searchDate.value),
        });
        const response = await fetch(`/api/projects?${queryParams.toString()}`);

        if (!response.ok) {
          throw new Error(`Error fetching projects: ${response.statusText}`);
        }
        const data = await response.json();
        projects.value = data.projects;
        paginateProjects();
        
      } catch (error) {
        console.error('Error fetching projects:', error);
        errorMessage.value = error.message || 'An unexpected error occurred.';
      } finally {
        isLoading.value = false;
      }
    };
    const fetchProjectDetails = (projectsToFetch) => {
      const fetchPromises = projectsToFetch.map(async (project) => {
        try {
          const response = await fetch(`/api/projects/${project.projectId}`);
          if (!response.ok) {
            throw new Error(`Error fetching project details: ${response.statusText}`);
          }
          const detail = await response.json();
          project.detail = detail.project;
        } catch (error) {
          console.error('Error fetching project details:', error);
          errorMessage.value = error.message || 'An unexpected error occurred.';
        }
      });

      return Promise.all(fetchPromises).finally(() => {
        isLoading.value = false; 
      });
    };


    const paginateProjects = () => {
      isLoading.value = true;
      if(projects.value.length > 0) {
        const startIndex = (currentPage.value - 1) * pageSize.value;
        const endIndex = startIndex + pageSize.value;
        const projectsToFetch = projects.value.slice(startIndex, endIndex);
        fetchProjectDetails(projectsToFetch).then(()=>{
          displayedProjects.value = projectsToFetch
          isLoading.value = false;
        });
      }
      else {
        displayedProjects.value =[];
        isLoading.value = false;
      }
    };

    watch(pageSize, (newPageSize, oldPageSize) => {
      localStorage.setItem('pageSize', newPageSize)
      if (newPageSize !== oldPageSize) {
        paginateProjects();
      }
    });
    watch(searchDate, (newSearchDate) => {
      localStorage.setItem('searchDate', newSearchDate);
      isLoading.value = true;
      fetchProjects();
    });
    watch(displayedProjects, (newDisplayedProjects) => {
      localStorage.setItem('displayedProjects', JSON.stringify(newDisplayedProjects));
    } )

    onMounted(() => {
      isLoading.value= true
      const savedSearchDate = localStorage.getItem('searchDate');
      const savedDisplayedProjects = localStorage.getItem('displayedProjects')
      const savedPageSize = localStorage.getItem('pageSize')
      if(savedSearchDate) {
        searchDate.value = new Date(savedSearchDate)
      }
      if(savedPageSize) {
        pageSize.value = parseInt(savedPageSize)
      }
      if(savedDisplayedProjects) {
        displayedProjects.value = JSON.parse(savedDisplayedProjects)
        isLoading.value = false;
      } else {
        fetchProjects();
      }
      
    });

    return {
      isLoading,
      projects,
      currentPage,
      pageSize,
      searchDate,
      displayedProjects,
      errorMessage,
    };
  },
};
</script>

<style scoped>
  .projects {
    display: flex;
    gap: 1.25rem;
    align-items: center;
  }

  .projects--wrapper {
    padding: 1.25rem;
    font-family: 'Arial', sans-serif;
    font-size: 1.25rem;
  }

  .projects__text {
    margin: 0;
  }

  .projects__list {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  }

  .projects__list__item {
    display: flex;
  }

  .projects__date-picker {
    max-width: 12.5rem;
    background-color: #f2f2f2;
    border: 1px solid #ccc; 
    border-radius: 0.25rem;
  }
  .spinner {
    display: flex;
    justify-content: center;
    height: 100vh;
  }
  .error-message {
    color: #ff0000; 
    margin-top: 2rem;
  }
</style>
