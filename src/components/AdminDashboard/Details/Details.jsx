import React, { useState, useEffect } from 'react';
import styles from './Details.module.css';

const EditDetails = ({ fieldsJson, onCancel, onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const base = Object.keys(fieldsJson).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setFormData({ ...base, ...initialValues });
  }, [fieldsJson, initialValues]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Details</h2>
          {Object.entries(fieldsJson).map(([key, type]) => (
            <div key={key} className={styles.formGroup}>
              <div htmlFor={key} className={styles.label}>{key}</div>
              <div
                type={type}
                id={key}
                name={key}
                className={styles.input}
              >
              {formData[key]}
              </div>
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
          </div>
      </div>
    </div>
  );
};

export default EditDetails;
