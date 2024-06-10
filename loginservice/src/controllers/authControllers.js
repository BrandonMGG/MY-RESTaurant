
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const register = async (req, res) => {
  const { username, password } = req.body; //verifica el usuario y el password
  try {
    //trata de crear el usuario nuevo
    const user = await User.create({ username, password }); // crea el usuario en la base de datos
    res.status(201).json({ success: true, data: user }); // si todo sale bien devuelve esta respuesta
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  //verifica si el usuario esta logueado
  const { username, password } = req.body;
  try {
    //busca el usuario en la base de datos
    const user = await User.findOne({ username });

    //si el usuario existe y el password hace math entoncess genera el token
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    //creacion del token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

