const app = require('./server/app');

const port = process.env.PORT || Number(app.get('port'));
app.listen(port, () => console.log(`Listening on ${port}!`));
