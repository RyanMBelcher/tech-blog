const signUpFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            const responseBody = await response.json()
            const hasEmailError = responseBody.errors.find(error =>
                error.message === 'email must be unique'
            )
            if (hasEmailError) {
                alert('A user with this email address already exists. Please enter a new email address.')
            }
            else {
                alert('Failed to sign up!')
            }
        }
    }
};

document
    .querySelector('#signup-form')
    .addEventListener('submit', signUpFormHandler);