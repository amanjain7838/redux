const BUG_ADDED="bugAdded";
const BUG_RESOLVED="bugResolved";
const BUG_REMOVED="bugRemoved";
const PROJECT_ADDED="projectAdded";

const bugAdded=(description,projectid)=>({
    type:BUG_ADDED,
    payload:{
        description,
        projectid
    }
})
const projectAdded=description=>({
    type:PROJECT_ADDED,
    payload:{
        description
    }
})
const bugResolved=id=>({
    type:BUG_RESOLVED,
    payload:{
        id
    }
})
const bugRemoved=id=>({
    type:BUG_REMOVED,
    payload:{
        id
    }
})
let last=0;
function bugsReducer(state=[],action)
{
    switch(action.type)
    {
        case BUG_ADDED:
            return [
                ...state,
                {
                    id:++last,
                    description:action.payload.description,
                    projectId:action.payload.projectid,
                    resolved:false
                }
            ];
        case BUG_RESOLVED:
            return state.map(bug=>bug.id!=action.payload.id?bug:{...bug,resolved:true})
        case BUG_REMOVED:
            return state.filter(bug=>bug.id!=action.payload.id)
        default:
            return state;
    }
}
function projectReducer(state=[],action)
{
    switch(action.type)
    {
        case PROJECT_ADDED:
            return [
                ...state,
                {
                    id:++last,
                    description:action.payload.description,
                }
            ];
        default:
            return state;
    }
}
import {createStore,applyMiddleware,compose} from 'redux';
import {combineReducers} from 'redux';
import logger from './logger';
import func from './func';

export const combinereducers=combineReducers({
    bugs:bugsReducer,
    project:projectReducer
})
const store =createStore(combinereducers,compose(applyMiddleware(logger,func),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

// import store from './store';
// import * as actions from './actions';
// console.log(store)

store.subscribe(()=>{
    console.log("store updated",store.getState());
})
store.dispatch((dispatch,getState)=>{
    store.dispatch(projectAdded("pr1"))
    console.log(store.getState())
})
// store.dispatch(projectAdded("pr2"))
// store.dispatch(bugAdded("bug2",2))
// store.dispatch(bugAdded("bug1",1))
// store.dispatch(bugResolved(1))

// store.dispatch(actions.bugRemoved(1))
//selectors
const getbugs=state=>(state.bugs.map(bug=>{
    bug.projectdetails=state.project.filter(project=>project.id==bug.projectId)
    return bug
}));
console.log(getbugs(store.getState()));
