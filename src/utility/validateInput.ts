interface propsTypes {
    value: string,
    type: string,
}

export const validateInput = ({value, type}: propsTypes) => {
    switch (type) {
        case 'passw':
            if(value.length <= 10) { return true; } else return false;
        case 'ConfPassw':
          if(value.length <= 10) { return true; } else return  false;
        case 'username':
          if(value.length >= 3) { return true; } else return false;
        case 'email':
          if(value.includes('@') && value.includes('.com') && !/[A-Z]/.test(value)) { return true; } else return false;
        case 'otp': 
            if(value.length === 6 && /^[0-9]+$/.test(value)) { return true;} else return false;
        default:
          break;
      }
}