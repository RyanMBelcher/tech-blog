const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    if (title && content) {
        const stream = await fetch('/api/blog/new-post', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
            session: { userId: 1 }
        });
        const blog = await stream.json();
        console.log(blog);
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

