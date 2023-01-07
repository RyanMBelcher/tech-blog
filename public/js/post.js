const newPostHandler = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-user-id');
    console.log(id);
    console.log('made it to post handler');
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    console.log(title);
    console.log(content);
    if (title && content) {
        const stream = await fetch('/api/blog/new-post', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
            session: { userId: id }
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

