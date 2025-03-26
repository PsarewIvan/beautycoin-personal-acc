(() => {
    const buttons = document.querySelectorAll('.js-cvv-button');

    buttons.forEach((button) => {
        const dataId = button.dataset.cvvId;
        const dot = document.querySelector(`.${dataId}-dot`);
        const number = document.querySelector(`.${dataId}-number`);

        button.addEventListener('click', () => {
            dot?.classList.toggle('hidden');
            number?.classList.toggle('hidden');
        });
    });
})();

(() => {
    const ACTIVE_CLASS = 'active';
    const nodes = document.querySelectorAll('.js-input-node');

    nodes.forEach((node) => {
        const input = node.querySelector('.js-input');
        const show = node.querySelector('.js-input-show');
        const openIcon = node.querySelector('.js-input-icon-open');
        const closedIcon = node.querySelector('.js-input-icon-closed');
        const alert = node.querySelector('.js-input-alert');
        const reset = node.querySelector('.js-input-reset');

        show?.addEventListener('click', () => {
            const type = input?.getAttribute('type');

            if (type === 'password') {
                input.setAttribute('type', 'text');
                openIcon?.classList.remove('hidden');
                closedIcon?.classList.add('hidden');
            } else {
                input.setAttribute('type', 'password');
                openIcon?.classList.add('hidden');
                closedIcon?.classList.remove('hidden');
            }
        });

        input?.addEventListener('blur', (event) => {
            if (event.target.value === '') {
                alert?.classList.add(ACTIVE_CLASS);
            } else {
                alert?.classList.remove(ACTIVE_CLASS);
            }
        });

        input?.addEventListener('input', (event) => {
            if (event.target.value === '') {
                reset?.classList.remove(ACTIVE_CLASS);

                if (reset && show) {
                    show.classList.remove('shift');
                }
            } else {
                reset?.classList.add(ACTIVE_CLASS);
                alert?.classList.remove(ACTIVE_CLASS);

                if (reset && show) {
                    show.classList.add('shift');
                }
            }
        });

        reset?.addEventListener('click', () => {
            if (input) {
                input.value = '';
                reset?.classList.remove(ACTIVE_CLASS);
            }

            if (reset && show) {
                show.classList.remove('shift');
            }
        });
    });
})();

(() => {
    const selectsWrapper = document.querySelectorAll(
        '.js-select-component-wrapper'
    );

    selectsWrapper.forEach((selectWrapper) => {
        const select = selectWrapper.querySelector('.js-select-component');
        const placeholder = select?.dataset.placeholder;
        const options = select?.querySelectorAll('option');
        const reset = selectWrapper?.querySelector('.js-select-reset');

        const dataOptions = Array.from(options).map((option) => ({
            text: option.innerHTML,
            value: option.value,
        }));

        const slimSelect = new SlimSelect({
            select,
            settings: {
                showSearch: false,
            },
            data: [
                ...(placeholder
                    ? [{ placeholder: true, text: placeholder }]
                    : []),
                ...dataOptions,
            ],
            events: {
                afterChange: (evt) => {
                    const value = evt?.[0]?.value;
                    const arrow = selectWrapper?.querySelector('.ss-arrow');

                    if (value) {
                        reset?.classList.remove('hidden');
                        arrow?.classList.add('hidden');
                    }
                },
            },
        });

        reset?.addEventListener('click', () => {
            if (slimSelect) {
                const arrow = selectWrapper?.querySelector('.ss-arrow');

                slimSelect.setSelected('', false);
                reset.classList.add('hidden');
                arrow.classList.remove('hidden');
            }
        });

        const selectDiv = selectWrapper.querySelector(
            `div[data-id="${slimSelect?.settings?.id}"]`
        );

        select?.addEventListener('change', (event) => {
            if (dataOptions.some(({ value }) => value === event.target.value)) {
                selectDiv.classList.add('select-component_selected');
            } else {
                selectDiv.classList.remove('select-component_selected');
            }
        });

        if (!placeholder) {
            const arrow = selectWrapper?.querySelector('.ss-arrow');
            selectDiv?.classList.add('select-component_selected');
            reset?.classList.remove('hidden');
            arrow?.classList.add('hidden');
        }
    });
})();

//# sourceMappingURL=index.js.map
