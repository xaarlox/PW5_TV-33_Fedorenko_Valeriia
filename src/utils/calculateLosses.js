//Функція для розрахунку збитків

export function calculateLossesResults(formData) {
    const {
        failureRate,
        recoveryTime,
        plannedOutageTime,
        maxLoad,
        usageTime,
        emergencyLossRate,
        plannedLossRate
    } = formData;

    if (
        !failureRate || !recoveryTime || !plannedOutageTime ||
        !maxLoad || !usageTime || !emergencyLossRate || !plannedLossRate
    ) {
        throw new Error("Будь ласка, заповніть всі поля!");
    }

    //Перетворення часу відновлення з годин у роки
    const recoveryTimeYears = recoveryTime * 1e-3;
    const plannedOutageYears = plannedOutageTime * 1e-3;

    //Розрахунок недовідпущення
    const emergencyUndersupply = failureRate * recoveryTimeYears * maxLoad * usageTime;
    const plannedUndersupply = plannedOutageYears * maxLoad * usageTime;

    //Розрахунок збитків
    const emergencyLosses = emergencyLossRate * emergencyUndersupply;
    const plannedLosses = plannedLossRate * plannedUndersupply;
    const totalLosses = emergencyLosses + plannedLosses;
    const totalEnergy = emergencyUndersupply + plannedUndersupply;

    return {
        failureRate,
        recoveryTimeYears: recoveryTimeYears.toExponential(2),
        maxLoad,
        usageTime,
        emergencyUndersupply: emergencyUndersupply.toFixed(0),
        plannedOutageYears: plannedOutageYears.toExponential(2),
        plannedUndersupply: plannedUndersupply.toFixed(0),
        emergencyLossRate,
        emergencyLosses: emergencyLosses.toFixed(0),
        plannedLossRate,
        plannedLosses: plannedLosses.toFixed(0),
        totalLosses: totalLosses.toFixed(0),
        totalEnergy: totalEnergy.toFixed(0)
    };
}