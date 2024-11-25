import Entity from "./Entity";

export default class User extends Entity {
    constructor(
        first = '',
        middle = '',
        last = '',
        email = '',
        url = '',
        state = '',
        city = '',
        houseNumber = '',
        phone = '',
        password = '',
        alt = '',
        country = '',
        street = '',
        zip = '',
        isBusiness = false
    ) {
        super();
        this.name = {
            first: first,
            middle: middle,
            last: last
        };
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.image = {
            url: url,
            alt: alt
        };
        this.address = {
            state: state,
            city: city,
            houseNumber: houseNumber,
            country: country,
            street: street,
            zip: zip
        };
        this.isBusiness = isBusiness;
    }
}
