import 'reflect-metadata';
import config from 'config';
import sequelize from './infrastructure/sequelize/connection';
import { createApp } from './infrastructure/http/app';

async function bootstrap() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log(`Database connection established successfully.`);

    // Create and start the Express app
    const app = createApp();
    const PORT = config.get(`server.port`);

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
      console.log(`📚 API Documentation available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.log(error);
    console.error(`Failed to start server:`, error);
    process.exit(1);
  }
}

// Start the application
bootstrap();
