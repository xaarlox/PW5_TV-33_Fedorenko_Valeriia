//Файл містить компонент CalculatorForm, який дозволяє користувачу ввести дані для подальших розрахунків

import { useState } from 'react';

const initialState = {
    w_breaker110: '',
    w_line110: '',
    w_transformer: '',
    w_breaker10: '',
    w_connection: '',
    numConnections: '',
    w_sectionBreaker: '',
    t_breaker110: '',
    t_line110: '',
    t_transformer: '',
    t_breaker10: '',
    t_connection: '',
    plannedOutage: '',
    failureRate: '',
    recoveryTime: '',
    plannedOutageTime: '',
    maxLoad: '',
    usageTime: '',
    emergencyLossRate: '',
    plannedLossRate: '',
    mode: 'reliability'
};

export function CalculatorForm({ onCalculate }) {
    const [formData, setFormData] = useState(initialState);

    //Функція, що оновлює стан відповідно до введених даних
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "mode" ? value : parseFloat(value),
        }));
    };

    //Функція, яка запобігає стандартній поведінці форми та передає введені дані у функцію onCalculate
    const handleSubmit = (event) => {
        event.preventDefault();
        onCalculate(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Тип розрахунку:</label>
                <select name="mode" value={formData.mode} onChange={handleChange}>
                    <option value="reliability">Порівняння надійності</option>
                    <option value="damage">Розрахунок збитків</option>
                </select>
            </div>

            {formData.mode === "reliability" && (
                <>
                    <div className="form-group form-section-header">
                        <h3>Параметри інтенсивності відмов (1/рік)</h3>
                    </div>
                    <div className="form-group">
                        <label>Вимикач 110 кВ:</label>
                        <input type="number" name="w_breaker110" value={formData.w_breaker110} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Лінія 110 кВ:</label>
                        <input type="number" name="w_line110" value={formData.w_line110} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Трансформатор:</label>
                        <input type="number" name="w_transformer" value={formData.w_transformer} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Вимикач 10 кВ:</label>
                        <input type="number" name="w_breaker10" value={formData.w_breaker10} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Кабельне з'єднання 10 кВ:</label>
                        <input type="number" name="w_connection" value={formData.w_connection} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Кількість з'єднань:</label>
                        <input type="number" name="numConnections" value={formData.numConnections} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Секційний вимикач:</label>
                        <input type="number" name="w_sectionBreaker" value={formData.w_sectionBreaker} onChange={handleChange} required />
                    </div>

                    <div className="form-group form-section-header">
                        <h3>Час відновлення (год)</h3>
                    </div>
                    <div className="form-group">
                        <label>Вимикач 110 кВ:</label>
                        <input type="number" name="t_breaker110" value={formData.t_breaker110} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Лінія 110 кВ:</label>
                        <input type="number" name="t_line110" value={formData.t_line110} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Трансформатор:</label>
                        <input type="number" name="t_transformer" value={formData.t_transformer} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Вимикач 10 кВ:</label>
                        <input type="number" name="t_breaker10" value={formData.t_breaker10} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Кабельне з'єднання 10 кВ:</label>
                        <input type="number" name="t_connection" value={formData.t_connection} onChange={handleChange} required />
                    </div>

                    <div className="form-group form-section-header">
                        <h3>Плановий простій (год/рік)</h3>
                    </div>
                    <div className="form-group">
                        <label>Тривалість:</label>
                        <input type="number" name="plannedOutage" value={formData.plannedOutage} onChange={handleChange} required />
                    </div>
                </>
            )}

            {formData.mode === "damage" && (
                <>
                    <div className="form-group form-section-header">
                        <h3>Параметри системи</h3>
                    </div>
                    <div className="form-group">
                        <label>Інтенсивність відмов, 1/рік:</label>
                        <input type="number" name="failureRate" value={formData.failureRate} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Середній час відновлення, год:</label>
                        <input type="number" name="recoveryTime" value={formData.recoveryTime} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Час планового простою, год/рік:</label>
                        <input type="number" name="plannedOutageTime" value={formData.plannedOutageTime} onChange={handleChange} required />
                    </div>

                    <div className="form-group form-section-header">
                        <h3>Параметри навантаження</h3>
                    </div>
                    <div className="form-group">
                        <label>Максимальне навантаження, МВт:</label>
                        <input type="number" name="maxLoad" value={formData.maxLoad} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Час ви-ня макс. навантаження, год/рік:</label>
                        <input type="number" name="usageTime" value={formData.usageTime} onChange={handleChange} required />
                    </div>

                    <div className="form-group form-section-header">
                        <h3>Питомі збитки, грн/кВт·год</h3>
                    </div>
                    <div className="form-group">
                        <label>Від аварійного недовідпущення:</label>
                        <input type="number" name="emergencyLossRate" value={formData.emergencyLossRate} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Від планового недовідпущення:</label>
                        <input type="number" name="plannedLossRate" value={formData.plannedLossRate} onChange={handleChange} required />
                    </div>
                </>
            )}

            <button type="submit">Розрахувати</button>
        </form>
    );
}