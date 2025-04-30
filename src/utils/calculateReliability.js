//Функція для порівняння надійності

export function calculateReliabilityResults(formData) {
    const {
        w_breaker110,
        w_line110,
        w_transformer,
        w_breaker10,
        w_connection,
        numConnections,
        w_sectionBreaker,
        t_breaker110,
        t_line110,
        t_transformer,
        t_breaker10,
        t_connection,
        plannedOutage
    } = formData;

    if (
        !w_breaker110 || !w_line110 || !w_transformer || !w_breaker10 || !w_connection ||
        !numConnections || !w_sectionBreaker || !t_breaker110 || !t_line110 || !t_transformer ||
        !t_breaker10 || !t_connection || !plannedOutage
    ) {
        throw new Error("Будь ласка, заповніть всі поля!");
    }

    //Розрахунок одноколової системи
    const w_oc = w_breaker110 + w_line110 + w_transformer + w_breaker10 + (w_connection * numConnections);
    const t_oc = (
        w_breaker110 * t_breaker110 + 
        w_line110 * t_line110 + 
        w_transformer * t_transformer + 
        w_breaker10 * t_breaker10 + 
        (w_connection * numConnections * t_connection)
    ) / w_oc;
    const k_emergency_oc = (w_oc * t_oc) * 1e-3;
    const k_planned_oc = 1.2 * plannedOutage * 1e-3;

    //Розрахунок двоколової системи
    const w_dk = 2 * w_oc * (k_emergency_oc + k_planned_oc);
    const w_ds = w_dk + w_sectionBreaker;
    const t_ds = t_oc * 0.7;
    const k_emergency_ds = (w_ds * t_ds) * 1e-3;
    const k_planned_ds = k_planned_oc * 0.8;

    //Висновок
    const isMoreReliable = w_ds < w_oc;

    return {
        w_oc: w_oc.toFixed(3),
        w_ds: w_ds.toFixed(4),
        t_oc: t_oc.toFixed(1),
        t_ds: t_ds.toFixed(1),
        k_emergency_oc: k_emergency_oc.toExponential(2),
        k_emergency_ds: k_emergency_ds.toExponential(2),
        k_planned_oc: k_planned_oc.toExponential(2),
        k_planned_ds: k_planned_ds.toExponential(2),
        conclusion: isMoreReliable
            ? "Двоколова система електропередачі є значно надійнішою за одноколову"
            : "Одноколова система демонструє кращі показники надійності"
    };
}