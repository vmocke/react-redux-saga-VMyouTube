export const updateObject = (oldObject: object, updatedProperties: any) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};

export const checkValidity = (
    value: string,
    rules: { required: any; minLength: number; maxLength: number; isEmail: any; isNumeric: any },
) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
};

export const spinnerTimeout = (setLocalSpinnerName: any, time: number) => {
    setLocalSpinnerName(true);
    setTimeout(() => {
        setLocalSpinnerName(false);
    }, time);
};
