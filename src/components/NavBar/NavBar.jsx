import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import styles from "./NavBar.module.css";

const NavBar = () => {

    const { user, setUser } = useContext(UserContext);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        // Clear the user state
        setUser(null);
    };

    return (
        <nav className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.leftGroup}>
                    <Link to="/" className={styles.brand} aria-label="Go to home">
                        <span className={styles.logoDot} />
                        <span className={styles.brandText}>MindMetrics</span>
                    </Link>

                    {user && (
                        <ul className={styles.menu}>
                            <li>
                                <Link className={styles.link} to="/dailylogs">
                                    Daily Logs
                                </Link>
                            </li>

                            <li>
                                <Link className={styles.link} to="/goals">
                                    Goals
                                </Link>
                            </li>

                            <li>
                                <Link className={styles.link} to="/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>

                <div className={styles.rightGroup}>
                    {user ? (
                        <Link
                            className={styles.btn}
                            to="/"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Link>
                    ) : (
                        <>
                            <Link className={styles.btn} to="/sign-in">
                                Sign In
                            </Link>
                            <Link className={styles.btn} to="/sign-up">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

