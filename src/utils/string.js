import {brazilAreaCodes} from "@assets/js/brazilDDDs.js";

const validateCPF = (number) => {
    const cpf = number.replace(/[^\d]/g, '');

    // O CPF precisa ter 11 números
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais (ex: 000.000.000-00)
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Valida o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let primeiroDigitoVerificador = (soma * 10) % 11;
    if (primeiroDigitoVerificador === 10 || primeiroDigitoVerificador === 11) {
        primeiroDigitoVerificador = 0;
    }
    if (primeiroDigitoVerificador !== parseInt(cpf[9])) {
        return false;
    }

    // Valida o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    let segundoDigitoVerificador = (soma * 10) % 11;
    if (segundoDigitoVerificador === 10 || segundoDigitoVerificador === 11) {
        segundoDigitoVerificador = 0;
    }
    if (segundoDigitoVerificador !== parseInt(cpf[10])) {
        return false;
    }

    // CPF válido
    return true;
}

const validatePhoneNumber = (number) => {
    const phoneNumber = number.replace(/\D/g, '');

    if (phoneNumber.length < 10 || phoneNumber.length > 11) {
        return false;
    }

    const areaCode = parseInt(phoneNumber.slice(0, 2));
    const mainNumber = phoneNumber.slice(2);

    if (!brazilAreaCodes.includes(areaCode)) {
        return false;
    }

    if (phoneNumber.length === 10 && /^[2-5]\d{3}\d{4}$/.test(mainNumber)) {
        return true;
    }

    return phoneNumber.length === 11 && /^9\d{4}\d{4}$/.test(mainNumber);
}

export {
    validateCPF,
    validatePhoneNumber
}