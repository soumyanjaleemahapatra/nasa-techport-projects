// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ProjectDetails from '../../components/ProjectDetails.vue';
import ProjectDetailsMockData from './ProjectDetailsMockData.json';

describe('ProjectDetails', () => {
    it('renders project details correctly', async () => {

        const project = ProjectDetailsMockData
        const component = await mountSuspended(ProjectDetails, {
            props: {
                project
            },
        })
        //Assert initial rendering of project details

        expect(component.find('h2').text()).toBe(project.detail.title);
        
        const mainDetails = component.findAll('.project-details-text')
        
        expect(mainDetails[0].text()).toBe(`Project Id: ${project.projectId}`);
        expect(mainDetails[1].text()).toBe(`Start date: Nov 2017`);
        expect(mainDetails[2].text()).toBe(`End date: Dec 2023`);
        
        //Assert if project status is displayed
        expect(component.find('.project-details-status').text()).toBe(project.detail.statusDescription);
    })
    

})