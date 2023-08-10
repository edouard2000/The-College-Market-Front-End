import axios from "axios"
export const ROOT_URL = 'http://localhost:9090/'

export const ActionsType = {
    DELETE_ACCOUNT : 'DELETE_ACCOUNT',
    AUTHENTICATE_USER : 'AUTHENTICATE_USER',
    DEAUTHENTICATE_USER : 'DEAUTHENTICATE_USER',
    AUTHENTICATION_ERROR : 'AUTHENTICATION_ERROR',
    GET_CONVERSATIONS : 'GET_CHAT_PERSONS',
    GET_MESSAGES : 'GET_MESSAGES'
}

export function createAccount(userInfo){
    console.log('sending Info');
    return (dispatch, navigate)=>{
        console.log('entering in the returned function');
        try {
            axios.post(`${ROOT_URL}signup`, {userInfo}).then((response)=>{
                console.log('got the response');
                if(response){
                    dispatch({
                        type: ActionsType.AUTHENTICATE_USER
                    })
                    navigate('/')
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export function SignIn(Email, Password){
    // you can write some other functionalities here
    console.log('reached in the signin action function');
    return (dispatch, navigate)=>{
        try {
            axios.post(`${ROOT_URL}signin`, {Email, Password}).then(response=>{
                if(response){
                    dispatch({
                        type: ActionsType.AUTHENTICATE_USER
                    })
                    localStorage.setItem(('userToken', response.userToken))
                    navigate('/')
                    console.log('navigated to home');
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}


export function getConversations(userId){
    return(dispatch)=>{
        axios.get(`${ROOT_URL}getPersons/${userId}`).then(response=>{
            if(response){
                dispatch({
                    type: ActionsType.GET_CONVERSATIONS,
                    payload : response.data // This is a and object of maps ({{person->{firstName : firstName, LastName : LastName, image}, conversatio ->conversationId}})
                })
            }
        })
    }
}

// get messages I don't need this
// export function getChatMessages(conversationId){
//     return (dispatch)=>{
//         axios.get(`${ROOT_URL}getMessages/${conversationId}`).then(response=>{
//             if(response){
//                 dispatch(
//                     {
//                         type: ActionsType.GET_MESSAGES,
//                         payload: response.data
//                     }
//                 )
//             }
//         })
//     }
// }




