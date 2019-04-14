// Action
export const REQUEST_TAGS = 'REQUEST_TAGS';

// Reducers
export default function reducer(state = [], action) {
  switch (action.type) {
    case REQUEST_TAGS:
      return [
        {
          title: 'Infrastructure',
          location: 'Santa Monica',
          info:
            'Infrastructure would include agendas dealing with the basic structures and facilities (e.g.,building, roads, and power) needed for the operation of the city of Santa Monica',
        },
        {
          title: 'Bicycle',
          location: 'Malibu',
          info:
            'Lorem ipsum dolor sit amet consectetur adipiscing, elit donec venenatis facilisi eleifend mollis, dignissim diam cum cubilia est. Etiam eleifend donec ornare pellentesque eget lobortis',
        },
        {
          title: 'Housing',
          location: 'Venice',
          info:
            'Lorem ipsum dolor sit amet consectetur adipiscing, elit donec venenatis facilisi eleifend mollis, dignissim diam cum cubilia est. Etiam eleifend donec ornare pellentesque eget lobortis',
        },
        {
          title: 'Environment',
          location: 'Manhattan Beach',
          info:
            'Lorem ipsum dolor sit amet consectetur adipiscing, elit donec venenatis facilisi eleifend mollis, dignissim diam cum cubilia est. Etiam eleifend donec ornare pellentesque eget lobortis',
        },
      ];
    default:
      return state;
  }
}

// Action Creator
export function preference_selected(preference) {
  console.log(
    `%cPreference Selected: ${preference.title} in ${preference.location} `,
    'color: #18bc9c'
  );
  return {
    type: 'PREFERENCE_SELECTED',
    payload: preference,
  };
}
