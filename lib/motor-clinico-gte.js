/**
 * MOTOR CLÍNICO GTE - ESTÁNDAR HDC 1991
 * Procesa la lógica de evaluación para el programa Guacara Te Escucha
 */
export function calcularFaseGTE(edad, respuestas) {
    let puntuacionTotal = 0;
    let indicadoresCriticos = 0;

    // --- LÓGICA PARA NIÑOS (9-11 AÑOS) ---
    if (edad >= 9 && edad <= 11) {
        respuestas.forEach(r => {
            if (r.valor === "Si") puntuacionTotal += 3;
            else if (r.valor === "AV") puntuacionTotal += 2;
            else puntuacionTotal += 1;

            if (r.esCritico && r.valor === "Si") indicadoresCriticos++;
        });

        if (indicadoresCriticos >= 1 || puntuacionTotal >= 28) return "Fase 3";
        if (puntuacionTotal >= 19) return "Fase 2";
        return "Fase 1";
    }

    // --- LÓGICA PARA PRE-ADOLESCENTES (12-14 AÑOS) ---
    else if (edad >= 12 && edad <= 14) {
        puntuacionTotal = respuestas.reduce((acc, curr) => acc + curr.valor, 0);
        indicadoresCriticos = respuestas.filter(r => r.esCritico && r.valor >= 3).length;

        if (indicadoresCriticos >= 3 || puntuacionTotal >= 42) return "Fase 3";
        if (puntuacionTotal >= 28) return "Fase 2";
        return "Fase 1";
    }

    // --- LÓGICA PARA ADOLESCENTES (15-17 AÑOS) ---
    else if (edad >= 15 && edad <= 17) {
        puntuacionTotal = respuestas.reduce((acc, curr) => acc + curr.valor, 0);
        indicadoresCriticos = respuestas.filter(r => r.esCritico && r.valor >= 4).length;

        if (indicadoresCriticos >= 4 || puntuacionTotal >= 58) return "Fase 3";
        if (puntuacionTotal >= 38) return "Fase 2";
        return "Fase 1";
    }

    return "Fase 1";
}
