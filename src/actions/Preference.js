export const preference_selected = preference => {
    console.log(`%cPreference Selected: ${preference.title} in ${preference.location} `, 'color: #18bc9c');
    return {
        type: `PREFERENCE_SELECTED`,
        payload: preference
    }
}