import React from 'react';
import styles from './FormsControls.module.css';


export const Textarea = ({input, meta, ...props}) => {

    const error = meta.touched && meta.error;

    return (
        <div>
            <div>
                <textarea {...input} {...props} className={`${styles.formControl} ${error && styles.error}`} />
            </div>
            {error && <span className={styles.errorMessage}>{meta.error}</span>}
        </div>
    );
};

export const Input = ({input, meta, ...props}) => {

    const error = meta.touched && meta.error;

    return (
        <div>
            <div>
                <input {...input} {...props} className={`${styles.formControl} ${error && styles.error}`} />
            </div>
            {error && <span className={styles.errorMessage}>{meta.error}</span>}
        </div>
    );
};