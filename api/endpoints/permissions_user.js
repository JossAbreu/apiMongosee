import {Permission_user} from '../models/permissions_users.js'
import {User} from '../models/users.js'

export function permission_user_routes (router) {
  
// Ruta para asignar permisos a un usuario
router.post('/assign_permissions/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { permissions } = req.body;

    // Verifica si el usuario existe
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Asigna los permisos al usuario
    const updatedUserPermissions = await Permission_user.findOneAndUpdate(
      { user_id: userId },
      { $set: { permissions } },
      { new: true, upsert: true }
    );

    res.json(updatedUserPermissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit an existing permission
// Edit an existing permission
router.put('/edit/permission_user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Verifica si se proporciona el campo 'user_id'
    if (!userId) {
      return res.status(400).json({ error: 'El parámetro userId es obligatorio' });
    }

    // Busca el permiso existente por userId
    const existingPermission = await Permission_user.findOne({ user_id: userId });
    if (!existingPermission) {
      return res.status(404).json({ error: 'Permiso no encontrado para el usuario' });
    }

    console.log('Data received for editing:', req.body);

    // Actualiza solo los campos proporcionados en la solicitud
    const updateFields = {};
    for (const category in req.body.permissions) {
      if (existingPermission.permissions[category]) {
        updateFields[`permissions.${category}`] = { ...existingPermission.permissions[category], ...req.body.permissions[category] };
      }
    }

    // Actualiza el permiso existente con los nuevos datos
    const updatedPermission = await Permission_user.findOneAndUpdate(
      { user_id: userId },
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({ response: 'Permiso editado:', 'permission user': updatedPermission });
  } catch (error) {
    console.error('Error al editar el permiso:', error);
    res.status(500).json({ error: error.message });
  }
});

  
  
// Read all permissions
router.get('/permissions', async (req, res) => {
  try {
    const permission = await Permission_user.find()
    .populate('user_id', '_id')// Poblar el nombre y el precio del producto
    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 


// // Endpoint para obtener productos sin stock
// router.get('/productsNoStock', async (req, res) => {
//   try {
//     // Encuentra todos los productos
//     const products =   await Product.find().populate('store', 'store_name');

//     // Filtra los productos que no tienen stock
//     const productosSinStock = await Promise.all(
//       products.map(async (product) => {
//         const stock = await Stock.findOne({
//           id_product: product._id,
//         });

//         if (!stock) {
//           return product;
//         }
//         return null;
//       })
//     );

//     // Filtra los productos nulos (que tienen stock)
//     const productosFiltrados = productosSinStock.filter(
//       (product) => product !== null
//     );
    

//     return res.json(productosFiltrados);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Error interno del servidor' });
//   }
// });


}
