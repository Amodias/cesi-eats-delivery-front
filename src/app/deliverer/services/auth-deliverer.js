import { getCookie } from "@/lib/cookies";

const USER_BASE_URL = "http://localhost:4001";

class AuthService {
  async verifyDeliverer() {
    return await fetch(`${USER_BASE_URL}/deliverers/current`, {
      headers: {
        authorization: `Bearer ${getCookie("token")}`,
      },
    });
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
