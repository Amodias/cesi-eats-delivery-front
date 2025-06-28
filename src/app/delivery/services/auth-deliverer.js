// authService.js
const API_BASE_URL = "http://localhost:4001/api";

class AuthService {
  /**
   * Register a new deliverer
   * @param {Object} delivererData - The deliverer registration data
   * @returns {Promise<Object>} The created deliverer data
   */
  async registerDeliverer(delivererData) {
    try {
      // Prepare the data for the API call
      const registrationData = {
        firstName: delivererData.firstName.trim(),
        lastName: delivererData.lastName.trim(),
        address: delivererData.address.trim(),
        phoneNumber: delivererData.phoneNumber,
        password: delivererData.password,
        nationalID: delivererData.nationalID,
        vehiculeID: delivererData.vehiculeID,
        ...(delivererData.birthDate && { birthDate: delivererData.birthDate }),
        ...(delivererData.profilePicture && {
          profilePicture: delivererData.profilePicture,
        }),
        ...(delivererData.referralCode && {
          referralCode: delivererData.referralCode,
        }),
      };

      const response = await fetch(`${API_BASE_URL}/deliverers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          throw new Error("A deliverer already exists with this national ID");
        }
        throw new Error(data.error || "Registration failed");
      }

      return {
        success: true,
        data: data,
        message: "Registration successful",
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error:
          error.message || "An unexpected error occurred during registration",
      };
    }
  }

  /**
   * Login a deliverer
   * @param {string} nationalID - The deliverer's national ID
   * @param {string} password - The deliverer's password
   * @returns {Promise<Object>} The login response
   */
  async loginDeliverer(nationalID, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/deliverers/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nationalID: nationalID,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store authentication token if provided
      if (data.token) {
        this.setAuthToken(data.token);
      }

      return {
        success: true,
        data: data,
        message: "Login successful",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || "An unexpected error occurred during login",
      };
    }
  }

  /**
   * Store authentication token
   * @param {string} token - JWT token
   */
  setAuthToken(token) {
    // Store in memory (session-based storage)
    this.authToken = token;

    // You could also store in a secure cookie or implement other storage mechanisms
    // Note: localStorage is not available in this environment
  }

  /**
   * Get stored authentication token
   * @returns {string|null} The authentication token
   */
  getAuthToken() {
    return this.authToken || null;
  }

  /**
   * Remove authentication token (logout)
   */
  removeAuthToken() {
    this.authToken = null;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    return !!this.getAuthToken();
  }

  /**
   * Get authenticated request headers
   * @returns {Object} Headers with authorization
   */
  getAuthHeaders() {
    const token = this.getAuthToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * Validate registration data before sending to API
   * @param {Object} data - Registration form data
   * @returns {Object} Validation result
   */
  validateRegistrationData(data) {
    const errors = {};

    // Required field validations
    if (!data.firstName?.trim()) errors.firstName = "First name is required";
    if (!data.lastName?.trim()) errors.lastName = "Last name is required";
    if (!data.address?.trim()) errors.address = "Address is required";
    if (!data.phoneNumber?.trim())
      errors.phoneNumber = "Phone number is required";
    if (!data.password?.trim()) errors.password = "Password is required";
    if (!data.nationalID?.trim()) errors.nationalID = "National ID is required";
    if (!data.vehiculeID?.trim()) errors.vehiculeID = "Vehicle ID is required";

    // Format validations
    if (data.phoneNumber && !/^\+?[\d\s-()]+$/.test(data.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number";
    }

    if (data.password && data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (data.profilePicture && !this.isValidUrl(data.profilePicture)) {
      errors.profilePicture = "Please enter a valid URL for profile picture";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean} Whether URL is valid
   */
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Logout user
   * @returns {Promise<Object>} Logout result
   */
  async logout() {
    try {
      // If you have a logout endpoint on your API, call it here
      // const response = await fetch(`${API_BASE_URL}/deliverers/logout`, {
      //   method: 'POST',
      //   headers: this.getAuthHeaders()
      // });

      this.removeAuthToken();

      return {
        success: true,
        message: "Logged out successfully",
      };
    } catch (error) {
      console.error("Logout error:", error);
      return {
        success: false,
        error: "An error occurred during logout",
      };
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;

// Named exports for individual methods if needed
export const {
  registerDeliverer,
  loginDeliverer,
  logout,
  isAuthenticated,
  getAuthToken,
  validateRegistrationData,
} = authService;
