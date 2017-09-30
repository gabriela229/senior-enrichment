

const ERROR = 'ERROR';
const  RESET_ERROR = 'RESET_ERROR';


export function displayError(){
  const action = {type: ERROR};
  return action;
}

export const resetError = () => {
  return {type: RESET_ERROR};
}

export default function reducer(state = '', action){
  switch (action.type){
    case ERROR:
      return 'Please complete all fields';
    case RESET_ERROR:
      return '';
    default:
      return state;
  }
}
