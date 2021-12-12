import { repositories,registerRepository, initialize as init } from 'goals';
import _ from 'lodash';
import LocalSessionRepository from './LocalSessionRepository';
import LocalSessionsRepository from './LocalSessionsRepository';

export default function initialize() {
    init();
    const sessionsRepository = new LocalSessionsRepository();
    _.forEach(repositories, (type, name) => {
        if(name==='sessions') {
            registerRepository(type, sessionsRepository);
        } else {
            sessionsRepository.registerSession(name);
            registerRepository(type, new LocalSessionRepository(name));
        }
    });
}