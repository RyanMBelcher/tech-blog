const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/new-post', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/blog/${response.body.id}`);
        } else {
            alert('Failed to post!')
        }
    }
};

document
    .querySelector('#new-post-form')
    .addEventListener('submit', newPostHandler);