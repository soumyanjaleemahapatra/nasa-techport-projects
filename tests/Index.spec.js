// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Index from '../../pages/Index.vue';
// import ProjectsListMockData from './ProjectsListMockData.json';

describe('Index', ()=>{
    it('renders with loading spinner initially', async () => {
        const component = await mountSuspended(Index)
        expect(component.find('.spinner').exists()).toBe(true);
    });
    /* it('fetches and displays projects after loading', async () => {
      registerEndpoint('/api/projects?updatedSince=2024-02-12', () => {
        return ProjectsListMockData
      })
      const component = await mountSuspended(Index);
      await component.vm.$nextTick();
      await new Promise(resolve => setTimeout(resolve, 0));
      await component.vm.$nextTick(); 
      expect(component.vm.projects).toEqual(ProjectsListMockData.projects)
    }); */
   /*  it('handles search date changes', async () => {
        const component = await mountSuspended(Index)
        const newDate = new Date('2023-01-01');
        await component.setData({ searchDate: newDate });
        await component.vm.$nextTick();
        expect(fetchProjects).toHaveBeenCalled();
    });
    it('fetches project details for each project', async () => {
        const component = await mountSuspended(Index)
        await component.vm.$nextTick();
        await new Promise(resolve => setTimeout(resolve, 1000));
        component.vm.projects.forEach(project => {
          expect(fetch).toHaveBeenCalledWith(`/api/projects/${project.projectId}`);
        });
    }); */
    /* it('handles error during fetch', async () => {
        global.fetch.mockImplementationOnce(() =>
          Promise.resolve({
            ok: false,
            statusText: 'Error',
          })
        );
    
        const component = await mountSuspended(Index)
        await component.vm.$nextTick();
        expect(component.find('.spinner').exists()).toBe(false);
        expect(component.find('.error-message').text()).toContain('Error fetching projects');
    }); */
})