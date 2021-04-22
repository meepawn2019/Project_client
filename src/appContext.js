import {createContext} from 'react'
const authContext = createContext({
    id:'',
    changeId: ()=>{}
});
export default  authContext;