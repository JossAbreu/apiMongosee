import {Service} from '../models/service.js'

export function service_routes (router) {
  
  // Create a new service        
router.post('/create/service', async (req, res) => {
  try {
    console.log('Data received:', req.body);
    const service = new Service(req.body);
    await service.save();
    res.status(200).json({response:'service correctamente creado', 'service': service});
  } catch (error) {
    console.error('Error al crear el service:', error);
    res.status(400).json({ error: error.message });
  }
});

// Endpoint para editar un service por su ID
router.put('/service/:id', async (req, res) => {
  try {
    const servicetId = req.params.id;
    const updatedData = req.body;

    // Busca el servicio por ID
    const service = await Service.findById(servicetId);

    if (!service) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualiza los datos del producto
    Object.assign(service, updatedData);

    // Guarda los cambios
    await service.save();

    res.status(200).json({ mensaje: 'service correctamente actualizado', service: service });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(400).json({ error: error.message });
  }
});

// Read all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find().populate('tax', 'tax_value'); // Utiliza populate para obtener los datos del impuesto 
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  
  
}
