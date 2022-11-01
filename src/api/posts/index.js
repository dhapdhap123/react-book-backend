import Router from 'koa-router';
import checkLoggedin from '../../lib/checkLoggedIn';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedin, postsCtrl.write);
posts.get('/:id', postsCtrl.getPostById, postsCtrl.read);
posts.delete(
  '/:id',
  checkLoggedin,
  postsCtrl.getPostById,
  postsCtrl.checkOwnPost,
  postsCtrl.remove,
);
posts.patch(
  '/:id',
  checkLoggedin,
  postsCtrl.getPostById,
  postsCtrl.checkOwnPost,
  postsCtrl.update,
);
const post = new Router();
posts.use('/:id', post.routes());

export default posts;
