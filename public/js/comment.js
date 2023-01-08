const newCommentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    console.log(comment);
    if (comment) {
        const stream = await fetch('/api/blog/new-post', {
            method: 'POST',
            body: JSON.stringify({ comment }),
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
    .querySelector('#new-comment-form')
    .addEventListener('submit', newCommentHandler)