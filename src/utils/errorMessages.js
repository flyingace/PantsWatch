export const isRequired = fieldName => `${ fieldName } is required`;

export const mustChoose = fieldName => `You must choose a ${ fieldName }`;

export const mustMatch = otherFieldName => {
    return (fieldName) => `${ fieldName } must match ${ otherFieldName }`;
};

export const minLength = length => {
    return (fieldName) => `${ fieldName } must be at least ${ length } characters`;
};


