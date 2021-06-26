import { PORT } from './common/config';
import app from './app';
import { connectToDB } from './database/db';

connectToDB(() => {
  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
});

