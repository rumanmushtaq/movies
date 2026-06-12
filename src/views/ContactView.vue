<script setup>
import { useContactForm } from '../composables/useContactForm.js'

const {
  form,
  errors,
  touched,
  focusedField,
  isSubmitting,
  isFormValid,
  submitStatus,
  serverError,
  onFocus,
  onBlur,
  submitForm
} = useContactForm()
</script>

<template>
  <div class="contact-page">
    <div class="split-layout">
      
      <!-- Visual Side -->
      <div class="visual-side">
        <div class="visual-content">
          <div class="badge">GET IN TOUCH</div>
          <h1 class="visual-title">Let's Create<br/><span class="text-accent">Something Epic.</span></h1>
          <p class="visual-subtitle">Whether you have a script to pitch, a film to distribute, or just want to talk cinema, our studio doors are always open.</p>
          
          <div class="contact-methods">
            <div class="method-card glass-panel">
              <span class="method-icon">📍</span>
              <div>
                <h5>Studio HQ</h5>
                <p>123 Cinematic Way<br/>Hollywood, CA 90028</p>
              </div>
            </div>
            <div class="method-card glass-panel">
              <span class="method-icon">✉️</span>
              <div>
                <h5>Direct Line</h5>
                <p>studios@cinemax.com<br/>+1 (555) 867-5309</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Gradient Overlay for visual side -->
        <div class="visual-overlay"></div>
      </div>

      <!-- Form Side -->
      <div class="form-side">
        <div class="form-wrapper">
          <h2 class="form-title">Send a Message</h2>
          <p class="form-desc">Fill out the form below and our production team will get back to you within 24 hours.</p>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="input-row">
              <div class="form-group" :class="{ 'is-focused': focusedField === 'name' || form.name, 'has-error': errors.name }">
                <label for="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  @focus="onFocus('name')" 
                  @blur="onBlur('name')"
                  autocomplete="name"
                />
                <span class="focus-border"></span>
                <transition name="err-fade">
                  <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
                </transition>
              </div>

              <div class="form-group" :class="{ 'is-focused': focusedField === 'email' || form.email, 'has-error': errors.email }">
                <label for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  @focus="onFocus('email')" 
                  @blur="onBlur('email')"
                  autocomplete="email"
                />
                <span class="focus-border"></span>
                <transition name="err-fade">
                  <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
                </transition>
              </div>
            </div>

            <div class="form-group" :class="{ 'is-focused': focusedField === 'subject' || form.subject, 'has-error': errors.subject }">
              <label for="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                v-model="form.subject" 
                @focus="onFocus('subject')" 
                @blur="onBlur('subject')"
              />
              <span class="focus-border"></span>
              <transition name="err-fade">
                <p v-if="errors.subject" class="field-error">{{ errors.subject }}</p>
              </transition>
            </div>

            <div class="form-group" :class="{ 'is-focused': focusedField === 'message' || form.message, 'has-error': errors.message }">
              <label for="message">Your Message</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="4" 
                @focus="onFocus('message')" 
                @blur="onBlur('message')"
              ></textarea>
              <span class="focus-border"></span>
              <transition name="err-fade">
                <p v-if="errors.message" class="field-error">{{ errors.message }}</p>
              </transition>
            </div>

            <button type="submit" class="submit-btn" :class="{ 'loading': isSubmitting }" :disabled="isSubmitting">
              <span class="btn-text">{{ isSubmitting ? 'Transmitting...' : 'Send Message' }}</span>
              <span class="btn-icon">{{ isSubmitting ? '⟳' : '↗' }}</span>
            </button>

            <transition name="fade">
              <div v-if="submitStatus === 'success'" class="success-message glass-panel">
                <div class="success-icon">✓</div>
                <div class="success-text">
                  <h4>Message Sent</h4>
                  <p>We've received your transmission and will respond shortly.</p>
                </div>
              </div>
            </transition>

            <transition name="fade">
              <div v-if="submitStatus === 'error'" class="error-message glass-panel">
                <div class="error-icon">✕</div>
                <div class="success-text">
                  <h4>Transmission Failed</h4>
                  <p>{{ serverError }}</p>
                </div>
              </div>
            </transition>
          </form>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  padding-top: 80px; /* offset navbar */
  background-color: var(--bg-color);
  display: flex;
}

.split-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
}

@media (min-width: 1024px) {
  .split-layout {
    flex-direction: row;
    min-height: calc(100vh - 80px);
  }
}

/* Visual Side */
.visual-side {
  flex: 1;
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 4rem 2rem;
  overflow: hidden;
}

.visual-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(14,12,10,0.9) 0%, rgba(200,137,58,0.2) 100%);
  z-index: 1;
}

.visual-content {
  position: relative;
  z-index: 2;
  max-width: 500px;
  margin: 0 auto;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  backdrop-filter: blur(4px);
}

.visual-title {
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.text-accent {
  color: var(--primary-color);
  text-shadow: 0 0 30px rgba(232,180,74,0.4);
}

.visual-subtitle {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
  margin-bottom: 3rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.glass-panel {
  background: rgba(20,20,20,0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
}

.method-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  transition: transform 0.3s, background 0.3s;
}

.method-card:hover {
  transform: translateX(10px);
  background: rgba(30,30,30,0.8);
}

.method-icon {
  font-size: 2rem;
  background: rgba(255,255,255,0.1);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.method-card h5 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.method-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.4;
}

/* Form Side */
.form-side {
  flex: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: var(--bg-color-light);
}

.form-wrapper {
  width: 100%;
  max-width: 600px;
}

.form-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.form-desc {
  color: var(--text-muted);
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .input-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  position: relative;
  padding-top: 1rem; /* space for floating label */
}

.form-group label {
  position: absolute;
  top: 1.2rem;
  left: 0;
  font-size: 1.1rem;
  color: var(--text-muted);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.form-group input,
.form-group textarea {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  color: white;
  font-size: 1.1rem;
  padding: 0.5rem 0;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
}

.focus-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-group input:focus ~ .focus-border,
.form-group textarea:focus ~ .focus-border {
  width: 100%;
}

/* Floating Label Logic */
.form-group.is-focused label {
  top: -0.5rem;
  font-size: 0.85rem;
  color: var(--primary-color);
  font-weight: 600;
}

.submit-btn {
  margin-top: 1rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
  color: white;
  padding: 1.2rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  position: relative;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(232,180,74,0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-btn.loading .btn-icon {
  animation: spin 1s linear infinite;
}

.btn-icon {
  font-size: 1.2rem;
  transition: transform 0.3s;
}

.submit-btn:hover:not(:disabled) .btn-icon {
  transform: translate(4px, -4px);
}

.success-message {
  margin-top: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.2);
}

.success-icon {
  background: #10b981;
  color: white;
  width: 40px; height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.success-text h4 {
  color: #10b981;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.success-text p {
  color: rgba(255,255,255,0.8);
  font-size: 0.9rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* ── Validation Error States ─────────────────────────────────────────────── */

/* Red underline when field has an error */
.form-group.has-error .focus-border,
.form-group.has-error input:focus ~ .focus-border,
.form-group.has-error textarea:focus ~ .focus-border {
  width: 100%;
  background-color: #ef4444;
}

.form-group.has-error label {
  color: #ef4444 !important;
}

.form-group.has-error input,
.form-group.has-error textarea {
  border-bottom-color: rgba(239, 68, 68, 0.4);
}

/* Inline error message */
.field-error {
  position: absolute;
  bottom: -1.4rem;
  left: 0;
  font-size: 0.78rem;
  font-weight: 600;
  color: #ef4444;
  letter-spacing: 0.3px;
}

/* Extra bottom padding so errors don't overlap next field */
.form-group {
  padding-bottom: 1.4rem;
}

/* Error message slide-in animation */
.err-fade-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.err-fade-leave-active {
  transition: opacity 0.15s ease;
}
.err-fade-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
.err-fade-leave-to {
  opacity: 0;
}

/* Error submission banner */
.error-message {
  margin-top: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
}

.error-icon {
  background: #ef4444;
  color: white;
  width: 40px; height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: bold;
  flex-shrink: 0;
}

.error-message .success-text h4 {
  color: #ef4444;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}
</style>
