import decode from "jwt-decode";

class AuthService {
  getUser() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  login(idToken) {
    localStorage.setItem("token", idToken);
    // Update to redirect to profile page after login
    window.location.assign("/profile");
  }

  logout() {
    localStorage.removeItem("token");
    // Redirect to home page after logout
    window.location.assign("/");
  }
}

export default new AuthService();
