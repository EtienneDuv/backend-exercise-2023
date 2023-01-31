import userData from './userData';
import articleData from './articleData';
import defaults from './defaults';

export default {
    defaults,
    ...userData,
    ...articleData
};