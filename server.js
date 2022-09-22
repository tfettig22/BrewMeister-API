const express = require('express');
const app = express();
const cors = require('cors');
const { response } = require('express');

app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3002);
app.locals.title = 'BrewMeister API';

app.get('/', (request, response) => {
  response.send('BrewMeister API');
});

app.locals.beers = [];

app.get('/beers', async (request, response) => {
  const beers = app.locals.beers;
  if (!beers.length) {
    return response.sendStatus(404);
  } else {
  response.status(200).json({ beers })
  }
});

app.post('/beers', (request, response) => {
  const id = Date.now();
  const beer = request.body;

  for (let requiredParameter of ['beerID', 'name', 'tagline', 'abv', 'ibu', 'notes']) {
    if (!beer[requiredParameter]) {
      response
        .status(422)
        .send({ error: `Expected format: { beerID: <Number> name: <String>, tagline: <String>, abv: <Number>, ibu: <Number>, notes: <String> }. You're missing a '${requiredParameter}' property.`});
    }
  }
  const { beerID, name, tagline, abv, ibu, notes } = beer;
  app.locals.beers.push({ id, beerID, name, tagline, abv, ibu, notes });
  response.status(201).json({ id, beerID, name, tagline, abv, ibu, notes });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on Port ${app.get('port')}.`);
});