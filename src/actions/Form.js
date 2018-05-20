// agenda_item should be
// {Title: 'x', Recommendations: 'y', Summary: 'z', Id: 'a'}
const agenda_item_received = agenda_item => ({
  type: 'AGENDA_ITEM_RECEIVED',
  payload: agenda_item,
});

export default agenda_item_received;
