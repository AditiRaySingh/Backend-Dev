//................................my logic code  all function i write.....

function capitalize(str) {
    return str.toUpperCase();
}

function reverse(str) {
    return str.split('').reverse().join('');
}

function countVowels(str) {
    let count = 0;

    for (let i = 0; i < str.length; i++) {
        if (
            str[i] === 'a' || str[i] === 'e' || str[i] === 'i' ||
            str[i] === 'o' || str[i] === 'u' ||
            str[i] === 'A' || str[i] === 'E' || str[i] === 'I' ||
            str[i] === 'O' || str[i] === 'U'
        ) {
            count++;
        }
    }

    return count;
}

module.exports = {
    capitalize: capitalize,
    reverse: reverse,
    countVowels: countVowels
};

