const delButtonHandler = async (event) => {
    console.log(event.target);
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post!');
        }
    }
};

const delBtn = document
    .querySelector('#delete-btn');
if (delBtn) {
    delBtn.addEventListener('click', delButtonHandler);
}
