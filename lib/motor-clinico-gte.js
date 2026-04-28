/**
 * MOTOR CLÍNICO GTE - ESTÁNDAR HDC 1991
 * Procesa la lógica de evaluación para el programa Guacara Te Escucha
 */
export function calcularFaseGTE(edad, respuestas) {
    let puntuacionTotal = 0;
    let indicadoresCriticos = 0;

    // --- LÓGICA PARA NIÑOS (9-11 AÑOS) - PROTOCOLO HDC 2026 ---
    if (edad >= 9 && edad <= 11) {
        let rojas = 0;
        let amarillas = 0;

        // Definición de ítems según el sentido de la respuesta roja
        const itemsNoRojo = [1, 5, 7, 9, 12];
        const itemsSiRojo = [2, 3, 4, 6, 8, 10, 11, 13];

        respuestas.forEach(r => {
            // 1. Conteo de Amarillas (A veces es amarillo para todos los ítems)
            if (r.valor === "AV") {
                amarillas++;
            } 
            // 2. Conteo de Rojas (Según el ítem y la respuesta)
            else if (r.valor === "Si" && itemsSiRojo.includes(r.id)) {
                rojas++;
            } 
            else if (r.valor === "No" && itemsNoRojo.includes(r.id)) {
                rojas++;
            }
        });

        // --- ASIGNACIÓN DE FASES SEGÚN PROTOCOLO ---
        
        // Fase 3: Alerta máxima (5+ Rojas Y 5+ Amarillas)
        if (rojas >= 5 && amarillas >= 5) return "Fase 3";
        
        // Fase 2: Riesgo persistente (5+ Rojas Y máximo 4 Amarillas)
        if (rojas >= 5 && amarillas <= 4) return "Fase 2";
        
        // Fase 1: Fortalezas adaptativas (5+ Amarillas Y hasta 4 Rojas)
        if (amarillas >= 5 && rojas <= 4) return "Fase 1";

        // Caso base: Si no cumple los umbrales de riesgo, se mantiene en observación (Fase 1)
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
