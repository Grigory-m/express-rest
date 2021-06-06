import OPTIONS from './common/config';
import app from './app';

const { PORT } = OPTIONS;

app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
