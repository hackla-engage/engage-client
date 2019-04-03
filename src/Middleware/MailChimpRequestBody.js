import { RSSA } from 'redux-api-middleware'

export default function() {
    return function(next) {
        return function(action) {
            const rssaAction = action[RSSA]
            
        }
    }
}