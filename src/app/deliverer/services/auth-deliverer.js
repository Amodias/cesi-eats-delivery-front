import { getCookie } from "@/lib/cookies";

const USER_BASE_URL = "http://localhost:4001";

class AuthService {
  async verifyDeliverer() {
    const response = await fetch(`${USER_BASE_URL}/deliverers/current`, {
      headers: {
        authorization: `Bearer ${getCookie("token")}`,
      },
    });
  }
}

const authService = new AuthService();
export default authService;
