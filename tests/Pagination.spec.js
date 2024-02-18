// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Pagination from '../../components/Pagination.vue';
describe('Pagination', () => {
    it('renders buttons for different page sizes', async () => {
        
        const component = await mountSuspended(Pagination, {
            props: {
                pageSize: 10,
              },
        })
        // Assert buttons for different page sizes are available
       const buttons = component.findAll('button')
       expect(buttons).toHaveLength(3);
       expect(buttons[0].text()).toBe('10');
       expect(buttons[1].text()).toBe('25');
       expect(buttons[2].text()).toBe('50');
        
    })

    it('emits pageSizeChanged event with expected page size when button for 25 is clicked', async () => {
        
        const component = await mountSuspended(Pagination, {
            props: {
                pageSize: 10,
            },
        })

        await component.findAll('button')[1].trigger('click')

        expect(component.emitted('pageSizeChanged')).toBeTruthy()
        expect(component.emitted('pageSizeChanged')).toMatchObject([[25]]);
    })

    it('applies active class to the button based on pageSize prop', async () => {
        const component = await mountSuspended(Pagination, {
            props: {
                pageSize: 25,
            },
        })

        const buttons = component.findAll('button');

        expect(buttons[0].classes()).not.toContain('active');
        expect(buttons[1].classes()).toContain('active');
        expect(buttons[2].classes()).not.toContain('active');
    })
    

})