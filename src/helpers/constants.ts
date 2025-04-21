export const COLOR_LIST = ["#70deff","#FC73C8","#EDBF85","#11A777","#ee7674"]

export const groupedEvents = (events) => {

    let returnObj = {}

    for (let event of events) {
        if (returnObj[event['track_title']]) {
            returnObj[event['track_title']].push(event)
        } else {
            returnObj[event['track_title']] = [event]
        }
    }

    for (let key in returnObj) {
        returnObj[key].sort((a: any, b: any) => {
            return new Date(a['start_time']).getTime() - new Date(b['start_time']).getTime();
        })
    }

    return returnObj;
};