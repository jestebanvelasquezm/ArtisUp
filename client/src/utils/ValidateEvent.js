export const ValidateEvent = (input) => {
    let errors = {};
    if (!input.eventName) {
        errors.eventName = 'requerido'
    }
    if (!input.description) {
        errors.description = 'requerido'
    }
    if (!input.imagesEvent) {
        errors.imagesEvent = 'requerido'
    }
    if (!input.city) {
        errors.city = 'requerido'
    }
    if (!input.country) {
        errors.country = 'requerido'
    }
    if (!input.country) {
        errors.country = 'requerido'
    }
    if (!input.place) {
        errors.place = 'requerido'
    }
    if (!input.day) {
        errors.day = 'requerido'
    }
    if (!input.hour) {
        errors.hour = 'requerido'
    }
    if (!input.finish) {
        errors.finish = 'requerido'
    }
    if (!input.premiumTickets) {
        errors.premiumTickets = 'requerido'
    }
    if(!(/^0*?[0-9]\d*$/g.test(input.premiumTickets))){
        errors.premiumTickets = 'solo numeros positivos'
    }
    if (!input.boxTickets) {
        errors.boxTickets = 'requerido'
    }
    if(!(/^0*?[0-9]\d*$/g.test(input.boxTickets))){
        errors.boxTickets = 'solo numeros positivos'
    }
    if (!input.generalTickets) {
        errors.generalTickets = 'requerido'
    }
    if(!(/^0*?[0-9]\d*$/g.test(input.generalTickets))){
        errors.generalTickets = 'solo numeros positivos'
    }
    if (!input.priceOne) {
        errors.priceOne = 'requerido'
    }
    if(!(/^0*?[0-9]\d*$/g.test(input.priceOne))){
        errors.priceOne = 'solo numeros positivos'
    }
    if (!input.priceTwo) {
        errors.priceTwo = 'requerido'
    }
    if(!(/^0*?[0-9]\d*$/g.test(input.priceTwo))){
        errors.priceTwo = 'solo numeros positivos'
    }
    if (!input.priceThree) {
        errors.priceThree = 'requerido'
    }
    if(!(/^0*?[0-9]\d*$/g.test(input.priceThree))){
        errors.priceThree = 'solo numeros positivos'
    }
    if (!input.categories) {
        errors.categories = 'requerido'
    }

    return errors
};

