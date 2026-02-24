import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Sign Up</h1>

      {!!message && (
        <p className={styles.error}>{message}</p>
      )}

      <section className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              className={styles.control}
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.control}
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirm">
              Confirm Password
            </label>
            <input
              className={styles.control}
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.buttonPrimary} ${isFormInvalid() ? styles.buttonDisabled : ""
                }`}
              disabled={isFormInvalid()}
              type="submit"
            >
              Sign Up
            </button>

            <button
              className={styles.buttonSecondary}
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignUpForm;
