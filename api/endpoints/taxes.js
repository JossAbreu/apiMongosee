import {Tax} from '../models/tax.js'

export function taxes_routes (router) {
  
  // Create a new Tax

  router.post('/create/tax', async (req, res) => {
    try {
      console.log('Data received:', req.body);
  
      // Intenta buscar un impuesto con la misma combinación de tax y state
      const existingTax = await Tax.findOne({ tax_value: req.body.tax_value, state: req.body.state });
  
      if (existingTax) {
        // Si ya existe un impuesto con la misma información, envía un mensaje de error
        return res.status(409).json({ error: 'Ya existe un impuesto con esta información.' });
      }
  
      // Si no hay un impuesto existente con la misma información, crea y guarda el nuevo impuesto
      const tax = new Tax(req.body);
      await tax.save();
      res.status(200).json({ 'impuesto correctamente creado:': tax });
    } catch (error) {
      console.error('Error al crear el impuesto:', error);
      res.status(400).json({ error: error.message });
    }
  });


// Endpoint para editar un tax por su ID
router.put('/edit/tax/:id', async (req, res) => {
  try {
    const taxId = req.params.id;
    const updatedData = req.body;

    // Busca el tax por ID
    const tax = await Tax.findById(taxId);

    if (!tax) {
      return res.status(404).json({ error: 'tax no encontrado' });
    }

    // Verifica si ya existe un tax con el mismo valor en el campo único
    const existingTax = await Tax.findOne({ tax_value: updatedData.tax_value, _id: { $ne: taxId } });
    if (existingTax) {
      return res.status(409).json({ error: 'Ya existe un tax con el mismo valor en el campo único' });
    }

    // Actualiza los datos del tax
    Object.assign(tax, updatedData);

    // Guarda los cambios
    await tax.save();

    res.status(200).json({ mensaje: 'tax correctamente actualizado', Impuesto: tax });
  } catch (error) {
    console.error('Error al actualizar el tax:', error);
    res.status(400).json({ error: error.message });
  }
});


// Read all taxs
  router.get('/taxes', async (req, res) => {
    try {
      const taxes = await Tax.find();
      res.json(taxes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

}
