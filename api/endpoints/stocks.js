import {Stock} from '../models/stock.js'
import {Product} from '../models/products.js'

export function stocks_routes (router) {
  
  // Create a new stock
router.post('/create/stock', async (req, res) => {
  try {
    console.log('Data received:', req.body);
    const stock = new Stock(req.body);
    await stock.save();
    res.status(200).json({ response:'stock correctamente creado:','stock': stock});
  } catch (error) {
    console.error('Error al crear el stock:', error);
    res.status(400).json({ error: error.message });
  }
});

// Endpoint para editar un stock por su ID
router.put('/edit/stock/:id', async (req, res) => {
  try {
    const stockId = req.params.id;
    const updatedData = req.body;

    // Busca el stock por ID
    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({ error: 'stock no encontrado' });
    }

    // Actualiza los datos del stock
    Object.assign(stock, updatedData);

    // Guarda los cambios
    await stock.save();

    res.status(200).json({ mensaje: 'stock correctamente actualizado', stock: stock });
  } catch (error) {
    console.error('Error al actualizar el stock:', error);
    res.status(400).json({ error: error.message });
  }
});

// Read all stock
router.get('/stocks', async (req, res) => {
  try {
    const stocks = await Stock.find()
    .populate('id_product', 'name cost_sale')// Poblar el nombre y el precio del producto
      .populate('id_store', 'store_name')// Poblar el almacen del producto
      .populate('id_tax', 'tax_value')

       // Poblar el nombre del almacén
       console.log('stocks ssss',stocks) 
      
      const formattedStocks = stocks.map(stock => ({
        req_id : stock._id,
        product_name:stock.id_product.name, // Muestra el nombre del producto
        price:stock.id_product.cost_sale, // Muestra el precio del producto
        store_name: stock.id_store.store_name, // Muestra el nombre del almacén
        tax_value:stock.id_tax.tax_value,
        stock: stock.stock,
        state: stock.state,
      }));
  
    res.json(formattedStocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 


// Endpoint para obtener productos sin stock
router.get('/productsNoStock', async (req, res) => {
  try {
    // Encuentra todos los productos
    const products =   await Product.find().populate('store', 'store_name');

    // Filtra los productos que no tienen stock
    const productosSinStock = await Promise.all(
      products.map(async (product) => {
        const stock = await Stock.findOne({
          id_product: product._id,
        });

        if (!stock) {
          return product;
        }
        return null;
      })
    );

    // Filtra los productos nulos (que tienen stock)
    const productosFiltrados = productosSinStock.filter(
      (product) => product !== null
    );
    

    return res.json(productosFiltrados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});


}
