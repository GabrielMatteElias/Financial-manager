export function formatadorMonetario(value) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

//Deixa numero no input 100.000,00
export function formatCurrency(inputValue) {
    // Remove qualquer caractere não numérico exceto ponto e vírgula
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    if (!numericValue) return "";

    // Adiciona as casas decimais
    const intValue = parseInt(numericValue, 10) / 100;

    // Formata com separadores de milhar
    return intValue;
};

//2024-12-31 --> 31/12/2024
export function formatadorData(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// ========= CPF E CNPJ =========
// 85242561258 --> 852.425.612-58
// Função para formatar CPF ou CNPJ
const formataCpfCnpj = (value) => {
    const cleanValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    // Formatação para CPF (11 dígitos)
    if (cleanValue.length === 11) {
        return cleanValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    }

    // Formatação para CNPJ (14 dígitos)
    if (cleanValue.length === 14) {
        return cleanValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }

    if (cleanValue.length === 14) {
        return
    }

    return cleanValue; // Retorna o valor limpo caso não seja nem CPF nem CNPJ
};

// Função para remover todos os caracteres não numéricos (limpeza)
const limparCpfCnpj = (value) => {
    return value.replace(/\D/g, ''); // Remove tudo que não for número
};

// Função para formatar o valor ao colar no campo de CPF/CNPJ
export function lidarComColagemCpfCnpj(event) {
    const valorColado = event.clipboardData.getData('text/plain'); // Pega o valor colado
    return formataCpfCnpj(valorColado); // Formata o valor colado antes de retornar
};

// Função para validar e limitar o tamanho do CPF/CNPJ no input
export function validarTamanhoCpfCnpj(value) {
    let cleanValue = limparCpfCnpj(value); // Limpa o valor (removendo caracteres não numéricos)

    if (cleanValue.length > 14) {
        cleanValue = cleanValue.substring(0, 14); // Trunca o valor para 14 caracteres
    }

    return formataCpfCnpj(cleanValue); // Formata e retorna o valor já com a formatação adequada
};

//Formata telefone para (**)*****-****
export function formatarTelefone(valor) {
    if (!valor) return valor;

    const telefoneNumeros = valor.replace(/[^\d]/g, "");
    const telefoneTamanho = telefoneNumeros.length;

    if (telefoneTamanho <= 2) {
        return `(${telefoneNumeros}`;
    } else if (telefoneTamanho <= 7) {
        return `(${telefoneNumeros.slice(0, 2)}) ${telefoneNumeros.slice(2)}`;
    } else {
        return `(${telefoneNumeros.slice(0, 2)}) ${telefoneNumeros.slice(
            2,
            7
        )}-${telefoneNumeros.slice(7, 11)}`;
    }
};