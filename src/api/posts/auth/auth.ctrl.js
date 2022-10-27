import Joi from 'joi';
import User from '../../models/user';

export const register = async (ctx) => {
  // Request Body 검증하기
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    // username이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({
      username,
    });
    await user.setPassword(password);
    await user.save();

    const data = user.toJSON();
    delete data.hashedPassword;
    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const login = async (ctx) => {
  //g
};
export const check = async (ctx) => {
  //g
};
export const logout = async (ctx) => {
  //g
};
