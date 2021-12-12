import _ from "lodash";
import moment from "moment";
import LocalSessionRepository from "./LocalSessionRepository";

export default class LocalSessionsRepository  {
    constructor ( ) {
        this.names = []
    }

    registerSession(name) {
        this.names.push(name)
    }

    getAllByYear (year) {
        let result = [];

        this.names.forEach(type => {
            const items = new LocalSessionRepository(type).getData()
                .filter(s => moment(s.date).year() === year)
                .map(s => ({...s, type}));
            result = [ ...result, ...items ];
        })

        return _.reverse(_.sortBy(result,["date"]))
    }
}
