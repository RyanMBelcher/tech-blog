
const updateButtonHandler = async (event) => {
    event.preventDefault();

    const title = document.getElementById('#blog-title');
    const content = document.getElementById('#blog-content');
    const id = event.target.getAttribute('blog-id');
    const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard')
    }

};

const updateBtn = document
    .querySelector('#update-btn');
if (updateBtn) {
    updateBtn.addEventListener('click', updateButtonHandler);
}
