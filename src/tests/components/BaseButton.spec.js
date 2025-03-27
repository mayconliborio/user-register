import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import BaseButton from "@/components/BaseButton.vue";

describe("BaseButton.vue", () => {
    it("renders the slot content when not loading", () => {
        const wrapper = mount(BaseButton, {
            props: { loading: false }, // Define a prop 'loading' como false
            slots: { default: "Click Me" }, // Insere o conteúdo do slot como "Click Me"
        });

        // Verifica se o texto "Click Me" foi renderizado no botão
        expect(wrapper.text()).toContain("Click Me");
    });

    it("renders the BaseLoading component when loading", () => {
        const wrapper = mount(BaseButton, {
            props: { loading: true }, // Define a prop 'loading' como true
        });

        // Verifica se o componente BaseLoading está presente no DOM
        expect(wrapper.findComponent({ name: "BaseLoading" }).exists()).toBe(true);
    });

    it("disables the button when loading or disabled is true", async () => {
        const wrapper = mount(BaseButton, {
            props: { loading: false, disabled: false }, // Inicialmente ambos os campos estão falsos
        });

        // Verifica que o botão NÃO está desabilitado no início
        expect(wrapper.attributes("disabled")).toBeUndefined();

        // Atualiza a prop 'loading' para true
        await wrapper.setProps({ loading: true });
        // Verifica que o botão agora está desabilitado
        expect(wrapper.attributes("disabled")).toBe("");

        // Atualiza a prop 'disabled' para true
        await wrapper.setProps({ loading: false, disabled: true });
        // Verifica que o botão permanece desabilitado
        expect(wrapper.attributes("disabled")).toBe("");
    });

    it("emits a click event when clicked and not disabled/loading", async () => {
        const wrapper = mount(BaseButton, {
            props: { loading: false, disabled: false }, // Ambos 'loading' e 'disabled' são falsos
        });

        // Dispara o evento de clique no botão
        await wrapper.find("button").trigger("click");

        // Captura os eventos emitidos pelo componente, relacionados ao evento "click"
        const emittedEvents = wrapper.emitted("click");

        // Garante que o evento foi emitido exatamente 1 vez
        expect(emittedEvents).toHaveLength(1);
        // Verifica que o evento recebeu exatamente 1 argumento
        expect(emittedEvents[0]).toHaveLength(1);
        // Confirma que o argumento emitido é uma instância de Event
        expect(emittedEvents[0][0]).toBeInstanceOf(Event);
    });

    it("does not emit a click event when disabled or loading", async () => {
        const mockClick = vi.fn(); // Cria uma função mock para espiar chamada de eventos

        const wrapper = mount(BaseButton, {
            props: { loading: true, disabled: false }, // 'loading' está ativo e 'disabled' está falso
        });

        // Substitui a emissão do evento 'click' pela função simulada (mock)
        wrapper.vm.$emit = mockClick;

        // Dispara o evento de clique no botão
        await wrapper.find("button").trigger("click");

        // Garante que nenhum evento foi emitido, pois o botão estava desabilitado
        expect(mockClick).not.toHaveBeenCalled();
    });
});