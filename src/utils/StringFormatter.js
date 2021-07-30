export default class StringFormatter {
    static capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    }
};
