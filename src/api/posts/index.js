import Router from 'koa-router';
import checkLoggedin from '../../lib/checkLoggedIn';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedin, postsCtrl.write);

const post = new Router();
posts.get('/', postsCtrl.read);
posts.delete('/', checkLoggedin, postsCtrl.checkOwnPost, postsCtrl.remove);
posts.patch('/', checkLoggedin, postsCtrl.checkOwnPost, postsCtrl.update);
posts.use('/:id', postsCtrl.getPostById, post.routes());

export default posts;
