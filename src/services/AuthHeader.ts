export default function authHeader() : {} {
    const currentUser = localStorage.getItem('user');
    let user = JSON.parse(currentUser ? currentUser : "");
    let jwtToken = user.token

    if (jwtToken) {
        return { Authorization: 'Bearer ' + jwtToken };
    } else {
        return {};
    }
}
