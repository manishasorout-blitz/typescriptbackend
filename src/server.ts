import App from '@/app';
import IndexRoute from '@routes/index.route';
import ExternalRoute from './routes/external.route';

const app = new App([new IndexRoute(), new ExternalRoute()]);

app.listen();
