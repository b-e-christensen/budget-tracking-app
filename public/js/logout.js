const logout = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/auth/logout", {method: "post"})
    if (response.ok) {
        document.location.replace('/login');
      } else {
        alert('Failed to log out.');
      }
}
document.getElementById("logout").addEventListener("click", logout);
