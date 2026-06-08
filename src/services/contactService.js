import apiClient from './http.js'

/**
 * ContactService
 * Handles all communication with the contact/enquiry endpoints.
 * The component stays clean — all API logic lives here.
 */
const ContactService = {
  /**
   * Submit a contact enquiry to the backend.
   * @param {{ name: string, email: string, subject: string, message: string }} payload
   * @returns {Promise<{ success: boolean, message: string }>}
   */
  async sendMessage(payload) {
    const response = await apiClient.post('/contact', payload)
    return response.data
  }
}

export default ContactService
