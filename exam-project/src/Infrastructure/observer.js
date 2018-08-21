
//we append functions to event names.
//and we trigger all functions attached to an eventName
//we will use this for the header and the notifications

let subscriptions = {
    'loginUser' : [],
    'notification' : []
};

export default {
    events: {
        loginUser: 'loginUser',
        notification: 'notification'
    },
    
    subscribe: (eventName, func) => subscriptions[eventName].push(func),
    
    trigger: (eventName, data) => subscriptions[eventName].forEach(fn => fn(data))
}