const logout = async (e) => {
    e.preventDefault()
    fetch("/api/auth/logout", {method: "post"})
}
document.getElementById("logout").addEventListener("click", logout);
