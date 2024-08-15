
const LogoutPage () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem();
        Navigate('/login')
    }
    return (
        <>
        </>
    )
}