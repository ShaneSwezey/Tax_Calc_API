calculateBracket = (brackets, income)  => {
    let value = parseInt(income, 10);
    let bracket;
    switch(true) {
        case value >= brackets[6].bottomFilter:
            bracket = brackets[6].taxRate;
            break;
        case value >= brackets[5].bottomFilter:
            bracket = brackets[5].taxRate;
            break;
        case value >= brackets[4].bottomFilter:
            bracket = brackets[4].taxRate;
            break;
        case value >= brackets[3].bottomFilter:
            bracket = brackets[3].taxRate;
            break;
        case value >= brackets[2].bottomFilter:
            bracket = brackets[2].taxRate;
            break;
        case value >= brackets[1].bottomFilter:
            bracket = brackets[1].taxRate;
            break;
        default:
            bracket = brackets[0].taxRate;
    }
    return bracket;
}

calculateTax = (brackets, income)  => {
    let value = parseInt(income, 10);
    let difference;
    let taxSum = 0;
    for (let i = brackets.length - 1; i >= 0; i--) {
        if (value >= brackets[i].bottomFilter) {
            difference = value - brackets[i].bottomFilter;
            taxSum += difference * (brackets[i].taxRate / 100);
            console.log(`taxSum: ${taxSum}`);
            value -= difference - 1;
        }
    }
    return taxSum;
}

module.exports = {
    calculateBracket : calculateBracket,
    calculateTax: calculateTax
};