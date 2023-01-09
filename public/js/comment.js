const newCommentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    const id = event.target.getAttribute('data-blog-id');

    if (comment) {
        const response = await fetch(`/api/blog/${id}/comment`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
            // session: { userId: id }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to post comment!')
        }
    }
};

document
    .querySelector('#new-comment-form')
    .addEventListener('submit', newCommentHandler)