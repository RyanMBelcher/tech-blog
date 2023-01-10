const newPostHandler = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-user-id');
    console.log(document.querySelector('#blog-title'));
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    if (title && content) {
        const stream = await fetch('/api/blog/new-post', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
            session: { userId: id }
        });
        const blog = await stream.json();
        if (stream.ok) {
            document.location.replace(`/blog/${blog.id}`);
        } else {
            alert('Failed to post!')
        }
    }
};

document
    .querySelector('#new-post-form')
    .addEventListener('submit', newPostHandler);

