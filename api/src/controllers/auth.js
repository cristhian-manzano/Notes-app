const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const firebaseApp = require('../config/firebase');
const { signUpValidate } = require('../validations/auth');

const signUp = async (req, res, next) => {
  try {
    const { value, error } = signUpValidate(req.body);

    if (error) {
      return res
        .status(422)
        .json({ error: error.message, message: 'validation error!' });
    }

    const auth = getAuth(firebaseApp);

    const user = await createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password
    ).catch((e) => {
      console.log(e.message); // eslint-disable-line no-console
    });

    if (!user) {
      return res.status(424).json({ message: 'cannot create user' });
    }

    return res.json({
      message: 'User created!',
      email: user.email,
      accessToken: user.accessToken,
    });
  } catch (e) {
    return next(e);
  }
};

module.exports = { signUp };
