import Router from 'koa-router';
import posts from './posts';
import auth from './posts/auth/index';

const api = new Router();

api.use('/posts', posts.routes());
api.use('.auth', auth.routes());

module.exports = api;

export default api;
