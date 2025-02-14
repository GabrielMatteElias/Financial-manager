export function isEmpty(...values) {
    // Itera sobre cada valor passado como argumento
    return values.some(value => {
        // Verifica se o valor é "falsy" (null, undefined, "", 0, NaN, false)
        if (!value) return true;

        // Verifica se é um objeto e se está vazio
        if (typeof value === 'object') {
            return Object.keys(value).length === 0;
        }

        // Caso seja uma string, verifica se está vazia
        if (typeof value === 'string') {
            return value.trim().length === 0;
        }

        return false;
    });
}

