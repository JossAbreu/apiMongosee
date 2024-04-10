import {Store} from '../models/store.js'

export function stores_routes (router) {
  
  // Create a new Store
router.post('/create/store', async (req, res) => {
  try {
    console.log('Data received:', req.body);
    const store = new Store(req.body);
    await store.save();
    res.status(200).json({'Store correctamente creado:': store});
  } catch (error) {
    console.error('Error al crear el Store:', error);
    res.status(400).json({ error: error.message });
  }
});

// Endpoint para editar un Store por su ID
router.put('/edit/stores/:id', async (req, res) => {
  try {
    const storeId = req.params.id;
    const updatedData = req.body;

    // Busca el Store por ID
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ error: 'Store no encontrado' });
    }

    // Actualiza los datos del Store
    Object.assign(store, updatedData);

    // Guarda los cambios
    await store.save();

    res.status(200).json({ mensaje: 'Store correctamente actualizado', Alamacen: store });
  } catch (error) {
    console.error('Error al actualizar el Store:', error);
    res.status(400).json({ error: error.message });
  }
});

// Read all stores
  router.get('/stores', async (req, res) => {
    try {
      const stores = await Store.find();
      res.json(stores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
// get store for ID
router.get('/get/store/:storeId', async (req, res) => {
  try {
    const storeId = req.params.storeId;
    
    // Validar si el ID es válido antes de realizar la consulta
    if (!isValidObjectId(storeId)) {
      return res.status(400).json({ error: 'ID de tienda no válido' });
    }

    const store = await Store.findById(storeId);

    // Verificar si la tienda existe
    if (!store) {
      return res.status(404).json({ error: 'Tienda no encontrada' });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Función para validar si un ID de MongoDB es válido
function isValidObjectId(id) {
  return /^[a-f\d]{24}$/i.test(id);
}

}
