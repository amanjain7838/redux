import * as actions from './actiontypes';

// store.dispatch({
//     type:actions.BUG_ADDED,
//     payload:{
//         description:"bug1"
//     }
// })


export const bugAdded=description=>({
    type:actions.BUG_ADDED,
    payload:{
        description
    }
})
export const bugResolved=id=>({
    type:actions.BUG_RESOLVED,
    payload:{
        id
    }
})
export const bugRemoved=id=>({
    type:actions.BUG_REMOVED,
    payload:{
        id
    }
})