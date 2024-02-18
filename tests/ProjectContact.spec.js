// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ProjectContact from '../../components/ProjectContact.vue';
import ProjectContactMockData from './ProjectContactMockData.json';
describe('ProjectContact', ()=>{
    it('should render role and contact details with correct information', async () => {
        const contactDetails = ProjectContactMockData.contactDetails
        const role="Project Manager(s)" 
        const component = await mountSuspended(ProjectContact, {
            props: {
                contactDetails, 
                role
            }
        })

         // Assert role is rendered correctly
        expect(component.find('h5').text()).toBe(role)

         // Assert name and email are rendered correctly
        const contactElements = component.findAll('.project-contact__detail')
        expect(contactElements).toHaveLength(contactDetails.length)
        
        contactDetails.forEach((contact, index) => {
            const contactElement = contactElements[index]
            expect(contactElement.find('.project-contact__detail__text').text()).toBe(contact.fullName)
      
            if (contact.primaryEmail) {
              const emailLink = contactElement.find('.project-contact__detail__link')
              expect(emailLink.attributes('href')).toBe('mailto:' + contact.primaryEmail)
              expect(emailLink.text()).toBe(contact.primaryEmail)
            }
          })
    })
    

})