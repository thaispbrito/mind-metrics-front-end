// Import chart components
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './DashboardView.module.css';

const DashboardView = ({
    user,
    period,
    setPeriod,
    stressAvg,
    focusAvg,
    chartData,
    selectedLogs,
    evaluatedGoals,
    recommendations,
    formatDate,
    weather,
    latestLog,
    weatherMessage
}) => {

    return (
        <main lassName={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>{user.username}'s Analytics</h1>
            </header>

            {/* Latest Weather */}
            <section className={styles.section}>
                <h2>Current Weather</h2>
                {weather ? (
                    <div className={styles.weatherContainer}>
                        <div>
                            <p className={styles.info}>Based on the location from your most recent daily log ({new Date(latestLog.date).toLocaleDateString()}) </p>
                            <p className={styles.info}>Location: {weather.location}</p>
                            <p className={styles.info}>Temperature: {weather.temp}°C</p>
                            <p className={styles.info}><img src={weather.icon} alt={weather.condition}></img> {weather.condition}</p>

                            {weatherMessage && (
                                <p className={styles.info}><em>{weatherMessage}</em></p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className={styles.info}>No weather data available.</p>
                )}
            </section>

            {/* Set period */}
            <section className={styles.section}>
                <label>
                    Show logs from last{' '}
                    <select className={styles.select} value={period} onChange={evt => setPeriod(Number(evt.target.value))}>
                        <option value={3}>3 Days</option>
                        <option value={7}>7 Days</option>
                        <option value={14}>14 Days</option>
                        <option value={30}>30 Days</option>
                    </select>
                </label>
            </section>

            {/* Show averages */}
            <section className={styles.section}>
                <div className={styles.averages}>
                    <p>Average Stress: {stressAvg.toFixed(1)}</p>
                    <p>Average Focus: {focusAvg.toFixed(1)}</p>
                </div>
            </section>

            {/* Stress & Focus Chart */}
            <section className={styles.section}>
                <h2>Stress & Focus Trends</h2>
                {chartData.length ? (
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[0, 5]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Stress" stroke="#FF4C4C" />
                                <Line type="monotone" dataKey="Focus" stroke="#4C9AFF" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <p className={styles.info}>No logs to display in chart.</p>
                )}
            </section>

            {/* Daily Logs */}
             <section className={styles.section}>
                <h2>Daily Logs</h2>
                {selectedLogs.length ? (
                    selectedLogs.map(log => (
                        <div key={log._id} className={styles.logCard}>
                            <p>Date: {formatDate(log.date)}</p>
                            <p>Mood: {log.mood}</p>
                            <p>Stress: {log.stressLevel}</p>
                            <p>Focus: {log.focusLevel}</p>
                        </div>
                    ))
                ) : (
                    <p className={styles.info}>No logs in the selected period.</p>
                )}
            </section>

            {/* Goals */}
            <section className={styles.section}>
                <h2>Your Goals</h2>
                {evaluatedGoals.length ? (
                    evaluatedGoals.map(goal => (
                        <div key={goal._id} className={styles.goalCard}>
                            <p><strong>{goal.title}</strong></p>

                            {goal.met === null ? (
                                <span> Not enough data</span>
                            ) : goal.met ? (
                                <span> className={styles.goalStatus} Met ✅</span>
                            ) : (
                                <span className={styles.goalStatus}> Not met ❌</span>
                            )}

                            {goal.value !== null && (
                                <p> Avg: {goal.value} / Target: {goal.targetValue} </p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className={styles.info}>No active goals in this period.</p>
                )}
            </section>

            {/* Recommendations */}
            <section className={styles.section}>
                <h2>Recommendations</h2>
                {recommendations.length ? (
                    <ul className={styles.recommendations}>
                        {recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.info}>Great job! No major recommendations at the moment.</p>
                )}
            </section>
        </main >
    );
};

export default DashboardView;
