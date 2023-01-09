
const updateButtonHandler = async (event) => {
    event.preventDefault();

    const title = document.getElementById('blog-title').value.trim();
    const content = document.getElementById('blog-content').value.trim();
    const id = event.target.getAttribute('data-blog-id');
    const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert('Failed to update post!')
    }

};

const updateBtn = document
    .querySelector('#update-post-form');
if (updateBtn) {
    updateBtn.addEventListener('submit', updateButtonHandler);
}
