import {Product} from '../models/products.js'

export function product_routes (router) {
  
  // Create a new product          
router.post('/create/product', async (req, res) => {
  try {
    console.log('Data received:', req.body);
    const product = new Product(req.body);
    await product.save();
    res.status(200).json({response:'Producto correctamente creado', 'product': product});
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(400).json({ error: error.message });
  }
});

// Endpoint para editar un producto por su ID
router.put('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    // Busca el producto por ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualiza los datos del producto
    Object.assign(product, updatedData);

    // Guarda los cambios
    await product.save();

    res.status(200).json({ mensaje: 'Producto correctamente actualizado', producto: product });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(400).json({ error: error.message });
  }
});

// Read all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('store tax', 'store_name tax_value'); // Utiliza populate para obtener los datos de la tienda
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  
  
}
