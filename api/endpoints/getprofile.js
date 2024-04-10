import { User } from "../models/users.js";
import { Permission_user } from "../models/permissions_users.js";
import jwt from 'jsonwebtoken';

export function get_profile(router) {
  // Middleware de autenticación para verificar el token
  const authenticateToken = (req, res, next) => {
    let token = req.header('Authorization');
    token = token.replace ('Bearer ' , '' ).trim(); 
    console.log('token:',token);
    if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) return res.status(403).json({ error: 'Token inválido' });
      req.user = user;
      console.log('req.user:',req.user)
      next();
    });
  };

  // Ruta para obtener el perfil del usuario autenticado
  router.get('/profile', authenticateToken, async (req, res) => {
    try {
      // El usuario está autenticado, puedes acceder a req.user para obtener información del usuario
      const userId = req.user.userId;
      console.log('userId:', userId);
      const user = await User.findById(userId)
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
      console.log('ususario bicado ' ,userId)
      const user_permissions = await Permission_user.findOne({ user_id: userId });
      /// retornar el perfil si no tiene permisos 
      if (!user_permissions) return res.status(200).json(
      {
        id: user._id,
        username: user.username,
        roll: user.roll,
        image: user.image,
        message: 'Este ussuario no tiene permisos '
       
      });
      
      // Aquí puedes devolver la información del perfil del usuario si tiene permisos
      return res.status(201).json(
      {
        id: user._id,
        username: user.username,
        roll: user.roll,
        image: user.image,
        Permission_user: user_permissions.permissions
        // Otros campos del perfil
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

 // Read all usera
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

}
