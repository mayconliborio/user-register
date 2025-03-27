import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import BaseInput from '@/components/BaseInput.vue';

describe('BaseInput.vue', () => {
    it('renders the input and label correctly', () => {
        const wrapper = mount(BaseInput, {
            props: {
                id: 'input-id',
                label: 'Nome',
            },
        });

        // Verifica se o label é renderizado com o texto correto
        expect(wrapper.find('label').text()).toBe('Nome');
        // Verifica se o atributo `id` do input é aplicado corretamente
        expect(wrapper.find('input').attributes('id')).toBe('input-id');
    });

    it('updates the modelValue when the input changes', async () => {
        const wrapper = mount(BaseInput, {
            props: {
                modelValue: '',
                id: 'input-id',
                label: 'Nome',
            },
        });

        const input = wrapper.find('input');
        await input.setValue('João');

        // Verifica se o evento update:modelValue é emitido corretamente
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['João']);
    });

    it('displays an error message on validation failure', async () => {
        const mockValidate = vi.fn((value) => {
            return value.length < 3 ? 'O nome deve ter pelo menos 3 caracteres' : '';
        });

        const wrapper = mount(BaseInput, {
            props: {
                id: 'input-id',
                label: 'Nome',
                validate: mockValidate,
            },
        });

        const input = wrapper.find('input');
        await input.setValue('Jo'); // Insere um valor inválido

        // Verifica se a validação retornou a mensagem correta
        expect(wrapper.find('.error-message').text()).toBe(
            'O nome deve ter pelo menos 3 caracteres'
        );

        // Verifica se o evento input-error é emitido com a mensagem de erro
        expect(wrapper.emitted('input-error')[0]).toEqual([
            'O nome deve ter pelo menos 3 caracteres',
        ]);
    });

    it('applies the mask correctly when provided', async () => {
        const wrapper = mount(BaseInput, {
            props: {
                id: 'phone-id',
                label: 'Telefone',
                mask: ['(##) # ####-####', '(##) ####-####'],
            },
        });

        const input = wrapper.find('input');
        await input.setValue('11912345678');

        expect(input.element.value).toBe('(11) 9 1234-5678');
    });

    it('renders the placeholder when provided', () => {
        const wrapper = mount(BaseInput, {
            props: {
                placeholder: 'Digite seu nome...',
                id: 'input-id',
                label: 'Nome',
            },
        });

        // Verifica se o placeholder está renderizado corretamente
        expect(wrapper.find('input').attributes('placeholder')).toBe(
            'Digite seu nome...'
        );
    });

    it('updates the error when validation changes dynamically', async () => {
        const mockValidate = vi.fn((value) => {
            return value.includes('@') ? '' : 'Formato inválido';
        });

        const wrapper = mount(BaseInput, {
            props: {
                id: 'email-id',
                label: 'Email',
                validate: mockValidate,
            },
        });

        const input = wrapper.find('input');
        await input.setValue('invalido');

        // Verifica mensagem de erro inicial
        expect(wrapper.find('.error-message').text()).toBe('Formato inválido');

        // Corrige o input para um valor válido
        await input.setValue('test@example.com');

        // Verifica que o erro desapareceu
        expect(wrapper.find('.error-message').exists()).toBe(false);
    });
});