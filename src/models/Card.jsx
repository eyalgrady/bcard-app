import Entity from "./Entity";

export default class Card extends Entity {
    constructor(
        title = '',
        subtitle = '',
        description = '',
        phone = '',
        email = '',
        web = '',
        url = '',
        alt = '',
        state = '',
        country = '',
        city = '',
        street = '',
        houseNumber = '',
        zip = '',
    ) {
        super();
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.phone = phone;
        this.email = email;
        this.web = web;
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
    }
}
