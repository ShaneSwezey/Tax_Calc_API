const SOCIAL_SECURITY_CAP = 128400;
const SOCIAL_SECURITY_RATE = 0.062;
const MEDICARE_RATE = 0.0145;

const WAGES_OVER_MARRIEDJ = 250000;
const WAGES_OVER_MARRIEDS = 125000;
const WAGES_OVER_EVERYBODYELSE = 200000;
const ADDITIONAL_RATE = 0.009;

const SELF_EMPLOYMENT_CAP = 128400;
const SELF_EMPLOYMENT_RATE = 0.153;
const SELF_EMPLOYMENT_MEDICARE_RATE = 0.029;

const MARRIEDJ = 'marriedj'; // Married filing jointly
const MARRIEDS = 'marrieds'; // Married filing seperately

calculateSocialSecurityTax = (income) => {
    const taxableIncome = income < SOCIAL_SECURITY_CAP ? income : SOCIAL_SECURITY_CAP;
    const tax = taxableIncome * SOCIAL_SECURITY_RATE;
    return tax;
};

calculateMedicareTax = (income, fileStatus) => {
    let tax = income * MEDICARE_RATE;
    tax += calculateAdditionalRate(income, fileStatus);
    return tax;
};

calculateSelfEmployment = (income, fileStatus) => {
    let taxableIncome = income > SELF_EMPLOYMENT_CAP ? SELF_EMPLOYMENT_CAP : income;
    let tax = taxableIncome * SELF_EMPLOYMENT_RATE;
    tax += calculateAdditionalRate(income, fileStatus);
    return tax;
};

calculateSelfEmploymentMedicare = (income) => {
    let taxableIncome = income > SELF_EMPLOYMENT_CAP ? SELF_EMPLOYMENT_CAP : income;
    let tax = taxableIncome * SELF_EMPLOYMENT_MEDICARE_RATE;
    return tax;
};

calculateAdditionalRate = (income, fileStatus) => {
    let tax = 0;
    switch(fileStatus) {
        case fileStatus === MARRIEDJ && income > WAGES_OVER_MARRIEDJ:
            tax += (income - WAGES_OVER_MARRIEDJ) * ADDITIONAL_RATE;
            break;
        case fileStatus === MARRIEDS && income > WAGES_OVER_MARRIEDS:
            tax += (income - WAGES_OVER_MARRIEDS) * ADDITIONAL_RATE;
            break;
        case (fileStatus !== MARRIEDJ || fileStatus !== MARRIEDS) && income > WAGES_OVER_EVERYBODYELSE:
            tax += (income - WAGES_OVER_EVERYBODYELSE) * ADDITIONAL_RATE;
            break;
        default:
            return tax;
    }
    return tax;
};