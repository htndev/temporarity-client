import createSagaMiddleware from 'redux-saga';
import rootSaga from './root';

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.run(rootSaga);

export default sagaMiddleware;
