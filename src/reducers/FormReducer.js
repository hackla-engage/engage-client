export default function (state = null, action) {
  switch (action.type) {
  case 'AGENDA_ITEM_RECEIVED':
    return action.payload;
  default:
    return state;
  }
}
