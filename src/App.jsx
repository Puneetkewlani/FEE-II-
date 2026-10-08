import React, { useState } from 'react';
import './App.css';

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  track: '',
  experience: '',
  skills: [],
  message: '',
  updates: false,
};

const skillOptions = ['HTML & CSS', 'JavaScript', 'React', 'UI design'];

function validateField(name, value) {
  if (name === 'fullName' && !value.trim()) return 'Please enter your name.';
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Enter a valid email address.';
  }
  if (name === 'phone' && value && !/^[\d+()\-\s]{7,}$/.test(value)) {
    return 'Enter a valid phone number.';
  }
  if (name === 'track' && !value) return 'Choose a learning track.';
  if (name === 'experience' && !value) return 'Choose your experience level.';
  return '';
}

export default function App() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value, checked, type } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === 'checkbox' && name === 'updates' ? checked : value,
    }));
    setSubmitted(false);
  }

  function handleSkillChange(event) {
    const { checked, value } = event.target;
    setValues((current) => ({
      ...current,
      skills: checked
        ? [...current.skills, value]
        : current.skills.filter((skill) => skill !== value),
    }));
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = Object.fromEntries(
      ['fullName', 'email', 'phone', 'track', 'experience'].map((name) => [
        name,
        validateField(name, values[name]),
      ]),
    );
    setErrors(nextErrors);
    setTouched({ fullName: true, email: true, phone: true, track: true, experience: true });

    if (Object.values(nextErrors).some(Boolean)) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  }

  function handleReset() {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  }

  function fieldError(name) {
    return touched[name] ? errors[name] : '';
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#form" aria-label="Fieldnote home">fieldnote<span>.</span></a>
        <span className="topbar-note">LEARNING COMMUNITY / 2025</span>
      </header>

      <section className="form-layout" id="form">
        <aside className="intro-panel">
          <p className="eyebrow"><span className="eyebrow-dot" /> APPLICATIONS OPEN</p>
          <h1>Make room<br />for what&apos;s <em>next.</em></h1>
          <p className="intro-copy">A good place to begin is with a few details. Tell us what you want to learn and we&apos;ll help you find your way in.</p>
          <div className="issue-mark" aria-hidden="true">F<span>/</span>01</div>
          <div className="side-caption">SMALL STEPS.<br />REAL MOMENTUM.</div>
        </aside>

        <section className="form-panel" aria-labelledby="form-title">
          <div className="form-heading">
            <div>
              <p className="eyebrow">YOUR NEXT CHAPTER</p>
              <h2 id="form-title">Start an application</h2>
            </div>
            <span className="step-count">01 <span>/ 01</span></span>
          </div>

          <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="fullName">Full name <span>*</span></label>
                <input id="fullName" name="fullName" value={values.fullName} onChange={handleChange} onBlur={handleBlur} placeholder="Your name" autoComplete="name" aria-invalid={Boolean(fieldError('fullName'))} />
                {fieldError('fullName') && <small className="error-text">{fieldError('fullName')}</small>}
              </div>
              <div className="field">
                <label htmlFor="email">Email address <span>*</span></label>
                <input id="email" name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="you@example.com" autoComplete="email" aria-invalid={Boolean(fieldError('email'))} />
                {fieldError('email') && <small className="error-text">{fieldError('email')}</small>}
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="phone">Phone <span className="optional">OPTIONAL</span></label>
                <input id="phone" name="phone" type="tel" value={values.phone} onChange={handleChange} onBlur={handleBlur} placeholder="+1 (555) 000-0000" autoComplete="tel" aria-invalid={Boolean(fieldError('phone'))} />
                {fieldError('phone') && <small className="error-text">{fieldError('phone')}</small>}
              </div>
              <div className="field">
                <label htmlFor="track">Learning track <span>*</span></label>
                <select id="track" name="track" value={values.track} onChange={handleChange} onBlur={handleBlur} aria-invalid={Boolean(fieldError('track'))}>
                  <option value="">Select a track</option>
                  <option value="frontend">Frontend development</option>
                  <option value="product">Product design</option>
                  <option value="fullstack">Full-stack foundations</option>
                </select>
                {fieldError('track') && <small className="error-text">{fieldError('track')}</small>}
              </div>
            </div>

            <fieldset className="choice-fieldset">
              <legend>Where are you starting from? <span>*</span></legend>
              <div className="radio-options">
                {['Just curious', 'Some experience', 'Ready to build'].map((level) => (
                  <label className="choice-option" key={level}>
                    <input type="radio" name="experience" value={level} checked={values.experience === level} onChange={handleChange} onBlur={handleBlur} />
                    <span className="custom-radio" />{level}
                  </label>
                ))}
              </div>
              {fieldError('experience') && <small className="error-text">{fieldError('experience')}</small>}
            </fieldset>

            <fieldset className="choice-fieldset skills-fieldset">
              <legend>What have you worked with? <span className="optional">CHOOSE ALL THAT APPLY</span></legend>
              <div className="check-options">
                {skillOptions.map((skill) => (
                  <label className="choice-option" key={skill}>
                    <input type="checkbox" name="skills" value={skill} checked={values.skills.includes(skill)} onChange={handleSkillChange} />
                    <span className="custom-checkbox" />{skill}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="field message-field">
              <label htmlFor="message">What would you love to make?</label>
              <textarea id="message" name="message" value={values.message} onChange={handleChange} placeholder="A project, an idea, or a skill you want to grow…" rows="3" maxLength="240" />
              <span className="character-count">{values.message.length} / 240</span>
            </div>

            <label className="updates-option">
              <input type="checkbox" name="updates" checked={values.updates} onChange={handleChange} />
              <span className="custom-checkbox" />Send me occasional learning notes and program updates.
            </label>

            {submitted && (
              <p className="success-message" role="status">
                <span aria-hidden="true">✓</span> Application received. Thanks, {values.fullName.trim()}! We&apos;ll be in touch at {values.email}.
              </p>
            )}

            <div className="form-actions">
              <button className="submit-button" type="submit">Send application <span aria-hidden="true">↗</span></button>
              <button className="reset-button" type="reset">Clear form</button>
            </div>
            <p className="required-note"><span>*</span> Required fields</p>
          </form>
        </section>
      </section>
      <footer className="page-footer"><span>FIELDNOTE LEARNING</span><span>GOOD THINGS TAKE PRACTICE.</span></footer>
    </main>
  );
}
