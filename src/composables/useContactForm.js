/**
 * useContactForm
 * Composable that owns all form state, validation rules, and submission logic.
 * ContactView.vue imports this and stays purely presentational.
 */

import { reactive, ref, computed } from 'vue'
import ContactService from '../services/contactService.js'

// ─── Validation Rules ────────────────────────────────────────────────────────
const RULES = {
  name: (v) => {
    if (!v || !v.trim()) return 'Full name is required.'
    if (v.trim().length < 2) return 'Name must be at least 2 characters.'
    if (v.trim().length > 80) return 'Name must be under 80 characters.'
    return null
  },
  email: (v) => {
    if (!v || !v.trim()) return 'Email address is required.'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(v.trim())) return 'Please enter a valid email address.'
    return null
  },
  subject: (v) => {
    if (!v || !v.trim()) return 'Subject is required.'
    if (v.trim().length < 3) return 'Subject must be at least 3 characters.'
    if (v.trim().length > 120) return 'Subject must be under 120 characters.'
    return null
  },
  message: (v) => {
    if (!v || !v.trim()) return 'Message is required.'
    if (v.trim().length < 10) return 'Message must be at least 10 characters.'
    if (v.trim().length > 2000) return 'Message must be under 2000 characters.'
    return null
  }
}

// ─── Composable ──────────────────────────────────────────────────────────────
export function useContactForm() {
  const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  // Tracks which fields have been touched (blurred at least once)
  const touched = reactive({
    name: false,
    email: false,
    subject: false,
    message: false
  })

  const focusedField = ref(null)
  const isSubmitting = ref(false)
  const submitStatus = ref(null) // null | 'success' | 'error'
  const serverError = ref(null)

  // ─── Per-field errors (only shown after field is touched) ─────────────────
  const errors = computed(() => ({
    name:    touched.name    ? RULES.name(form.name)       : null,
    email:   touched.email   ? RULES.email(form.email)     : null,
    subject: touched.subject ? RULES.subject(form.subject) : null,
    message: touched.message ? RULES.message(form.message) : null
  }))

  // True only when all fields pass validation rules (regardless of touch state)
  const isFormValid = computed(() =>
    !RULES.name(form.name) &&
    !RULES.email(form.email) &&
    !RULES.subject(form.subject) &&
    !RULES.message(form.message)
  )

  // ─── Handlers ────────────────────────────────────────────────────────────
  const onFocus = (field) => {
    focusedField.value = field
  }

  const onBlur = (field) => {
    touched[field] = true
    focusedField.value = null
  }

  const resetForm = () => {
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    touched.name = false
    touched.email = false
    touched.subject = false
    touched.message = false
  }

  const submitForm = async () => {
    // Touch all fields to reveal any hidden errors before submitting
    Object.keys(touched).forEach((key) => (touched[key] = true))

    if (!isFormValid.value) return

    isSubmitting.value = true
    submitStatus.value = null
    serverError.value = null

    try {
      await ContactService.sendMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim()
      })

      submitStatus.value = 'success'
      resetForm()

      // Auto-clear success banner after 6 seconds
      setTimeout(() => { submitStatus.value = null }, 6000)
    } catch (err) {
      submitStatus.value = 'error'
      // Surface the server's message if available, else a generic fallback
      serverError.value =
        err?.response?.data?.message ||
        'Something went wrong. Please try again or email us directly.'
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    touched,
    errors,
    isFormValid,
    focusedField,
    isSubmitting,
    submitStatus,
    serverError,
    onFocus,
    onBlur,
    submitForm
  }
}
