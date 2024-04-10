import {Company} from '../models/company.js'

export function company_routes (router) {
  
  // Create a new service        
router.post('/create/company', async (req, res) => {
  try {
    console.log('Data received:', req.body);
    const company = new Company(req.body);
    await company.save();
    res.status(200).json({response:'company correctamente creado', 'company data': company});
  } catch (error) {
    console.error('Error al crear el service:', error);
    res.status(400).json({ error: error.message });
  }
});

// Endpoint para editar un service por su ID
router.put('/edit/company/:id', async (req, res) => {
  try {
    const companytId = req.params.id;
    const updatedData = req.body;

    // Busca el servicio por ID
    const company = await Company.findById(companytId);

    if (!service) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualiza los datos del producto
    Object.assign(company, updatedData);

    // Guarda los cambios
    await company.save();

    res.status(200).json({ mensaje: 'service correctamente actualizado', company: company });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(400).json({ error: error.message });
  }
});

// Read all services
router.get('/company', async (req, res) => {
  try {
    const company = await Company.find() 
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  
  
}
