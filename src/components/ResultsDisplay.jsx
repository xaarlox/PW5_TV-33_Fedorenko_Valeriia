//Файл містить компонент ResultsDisplay, який відповідає за відображення результатів розрахунків після того, як вони були обчислені

export function ResultsDisplay({ results }) {
    if (!results || !results.mode) return null;

    const { mode } = results;

    return (
        <div className="results-container">
            {mode === "reliability" && (
                <div className="result-section">
                    <h2>Результати порівняння надійності</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Параметр</th>
                                <th>Одноколова система</th>
                                <th>Двоколова система</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Інтенсивність відмов, 1/рік</td>
                                <td>{results.w_oc ?? '-'}</td>
                                <td>{results.w_ds ?? '-'}</td>
                            </tr>
                            <tr>
                                <td>Середній час відновлення, год</td>
                                <td>{results.t_oc ?? '-'}</td>
                                <td>{results.t_ds ?? '-'}</td>
                            </tr>
                            <tr>
                                <td>Коефіцієнт аварійного простою</td>
                                <td>{results.k_emergency_oc ?? '-'}</td>
                                <td>{results.k_emergency_ds ?? '-'}</td>
                            </tr>
                            <tr>
                                <td>Коефіцієнт планового простою</td>
                                <td>{results.k_planned_oc ?? '-'}</td>
                                <td>{results.k_planned_ds ?? '-'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="reliability-conclusion">
                        <strong>Висновок:</strong> {results.conclusion ?? 'Виконайте розрахунок для порівняння систем'}
                    </div>
                </div>
            )}

            {mode === "damage" && (
                <div className="result-section">
                    <h2>Результати розрахунку збитків</h2>

                    <h3>Формули розрахунку</h3>

                    <div className="formula-box">
                        <p>Аварійне недовідпущення електроенергії:</p>
                        <div className="formula">
                            ΔWав = {results.failureRate} × {results.recoveryTimeYears} × {results.maxLoad} × {results.usageTime} = <strong>{results.emergencyUndersupply}</strong> кВт·год
                        </div>
                    </div>

                    <div className="formula-box">
                        <p>Планове недовідпущення електроенергії:</p>
                        <div className="formula">
                            ΔWпл = {results.plannedOutageYears} × {results.maxLoad} × {results.usageTime} = <strong>{results.plannedUndersupply}</strong> кВт·год
                        </div>
                    </div>

                    <div className="formula-box">
                        <p>Загальні збитки:</p>
                        <div className="formula">
                            З = {results.emergencyLossRate} × {results.emergencyUndersupply} + {results.plannedLossRate} × {results.plannedUndersupply} = <strong>{results.totalLosses}</strong> грн
                        </div>
                    </div>

                    <h3>Підсумкові результати</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Тип недовідпущення</th>
                                <th>Обсяг, кВт·год</th>
                                <th>Збитки, грн</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Аварійне</td>
                                <td>{results.emergencyUndersupply ?? '-'}</td>
                                <td>{results.emergencyLosses ?? '-'}</td>
                            </tr>
                            <tr>
                                <td>Планове</td>
                                <td>{results.plannedUndersupply ?? '-'}</td>
                                <td>{results.plannedLosses ?? '-'}</td>
                            </tr>
                            <tr>
                                <td><strong>Всього</strong></td>
                                <td>{results.totalEnergy ?? '-'}</td>
                                <td>{results.totalLosses ?? '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}