import { useState } from 'react'
import styles from '../pages/Contact.module.css'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    message: '',
    source: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required.'
    if (!form.email.trim()) errs.email = 'Email address is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Please enter a valid email.'
    if (!form.message.trim()) errs.message = 'Please include a message.'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>Book a Mock Health and Safety Inspection</h2>
      <p className={styles.formSub}>Fill out the form below and we'll be in touch within 1 business day.</p>

      {submitted ? (
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✅</div>
          <h3 className={styles.successTitle}>Message Sent!</h3>
          <p className={styles.successText}>
            Thanks! We'll be in touch within 1 business day.
          </p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.formRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              />
              {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="business">Business Name</label>
              <input
                id="business"
                name="business"
                type="text"
                placeholder="The Vegas Bar"
                value={form.business}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@thevegasbar.com"
                value={form.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              />
              {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(702) 555-0100"
                value={form.phone}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your bar and what you're looking for..."
              value={form.message}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
            />
            {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="source">How did you hear about us?</label>
            <select
              id="source"
              name="source"
              value={form.source}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Select an option</option>
              <option value="google">Google</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="referral">Referral</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>
        </form>
      )}
    </div>
  )
}
