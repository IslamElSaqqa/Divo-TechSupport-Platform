import React, { useState, useEffect } from 'react';
import styles from './EditOverlay.module.css';

const EditOverlay = ({ fieldsJson, onCancel, onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const base = Object.keys(fieldsJson).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setFormData({ ...base, ...initialValues });
  }, [fieldsJson, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Edit Request</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {Object.entries(fieldsJson).map(([key, type]) => (
            <div key={key} className={styles.formGroup}>
              <div htmlFor={key} className={styles.label}>{key}</div>
              <input
                type={type}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          ))}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onCancel}
              className={`${styles.button} ${styles.cancelButton}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.submitButton}`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOverlay;
