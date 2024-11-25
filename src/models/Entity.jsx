export default class Entity {
    updateField(fieldName, value) {
        if (Object.hasOwnProperty.call(this, fieldName))
            this[fieldName] = value;
    }
}