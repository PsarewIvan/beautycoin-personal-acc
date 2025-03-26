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
