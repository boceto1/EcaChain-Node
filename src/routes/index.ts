/**
 * Llamado de la libreria express utilizado para usar dentro de las peticiones HTTP
 */
import express from 'express';
const app = express();

/**
 * Implementacion de bodyParser que permite el uso de application/json en el body de las peticiones
 */
import BlockRoutes from './block.routes';
import TransactionRoutes from './transaction.routes';
import TransactionPoolRoutes from './transactionPool.routes';
import DataTransactionRoutes from './transactions.routes';
import DataUserRoutes from './userdata.routes';

/**
 * Rutas de acceso para endpoints de generacion de bloques, transacciones y datos de la blockchain
 */
app.use('/blocks', BlockRoutes);
app.use('/transactions', TransactionRoutes);
app.use('/pool', TransactionPoolRoutes);
app.use('/data/transactions', DataTransactionRoutes);

/**
 * Ruta de acceso para los endpoints de usuarios obtenidos desde la base de datos
 */
app.use('/data/user', DataUserRoutes);

export default app;
