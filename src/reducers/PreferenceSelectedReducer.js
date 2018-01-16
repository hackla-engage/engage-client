export default function (state=null, action) {
    switch(action.type) {
        case "PREFERENCE_SELECTED":
            return action.payload;
            break;
    }
    return state;
}