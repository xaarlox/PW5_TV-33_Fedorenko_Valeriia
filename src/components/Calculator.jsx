//Файл містить компонент Calculator, який керує всім процесом

import { useState } from 'react';
import { CalculatorForm } from './CalculatorForm';
import { ResultsDisplay } from './ResultsDisplay';
import { calculateLossesResults } from '../utils/calculateLosses';
import { calculateReliabilityResults } from '../utils/calculateReliability';
import './Calculator.css';

export default function Calculator() {
    const [results, setResults] = useState(null);

    const handleCalculate = (formData) => {
        let calculatedResults;
        if (formData.mode === "reliability") {
            calculatedResults = calculateReliabilityResults(formData);
        } else if (formData.mode === "damage") {
            calculatedResults = calculateLossesResults(formData);
        }
        setResults({ ...calculatedResults, mode: formData.mode });
    };

    return (
        <div className="container">
            <h1>🧮 Калькулятор надійності систем електропередачі</h1>
            <CalculatorForm onCalculate={handleCalculate} />
            <ResultsDisplay results={results} />
        </div>
    );
}