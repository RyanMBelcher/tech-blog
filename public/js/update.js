const updateButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blog/${id}`, {
            method: 'UPDATE',
        });

        if (response.ok) {
            document.location.replace
        }
    }
};

const updateBtn = document
    .querySelector('#update-btn');
if (updateBtn) {
    updateBtn.addEventListener('click', updateButtonHandler);
}
