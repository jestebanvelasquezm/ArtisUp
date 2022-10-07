export const Validate = (input)=> {
    let errors= {}
    if(!input.nickName){
        errors.nickName = 'requerido'
    }
    if(!input.userName){
        errors.userName = 'requerido'
    }
    if(!input.email){
        errors.email = 'requerido'
    }
    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email) ){
        errors.email = " example@gmail.com";
    }
    if(!input.phone){
        errors.phone = 'requerido'
    }
    if(!input.city){
        errors.city = 'requerido'
    }
    if(!input.country){
        errors.country = 'requerido'
    }
    if(!input.password){
        errors.password = 'requerido'
    }
    if(!input.c_password || input.c_password !== input.password){
        errors.c_password = 'deben coincidir'
    }
    if(!input.rol){
        errors.rol = 'requerido'
    }
    return errors
}

