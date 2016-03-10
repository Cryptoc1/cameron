Cameron
=======

Introducing Cameron, the friendly API. Because everybody likes pick-me-ups.

Development
-----------

Clone, install, and run, baby. Smooth as butter.

```bash
git clone https://github.com/trmml/cameron

cd cameron && npm install # installs dependencies
npm start # runs on localhost:2267!
```

API Endpoints
-------------

### `/compliment`
Provides a markov compliment.

```
https://cameron-api.herokuapp.com/compliment
```

### `/compliment/:name`
Provides a markov compliment addressing `/:name`.

```
https://cameron-api.herokuapp.com/compliment/cameron
https://cameron-api.herokuapp.com/compliment?name=cameron
```

Parameters
---------
### Format
Cameron uses `?format=` for any non-HTML response. At the moment the only response supported is JSON.

```
https://cameron-api.herokuapp.com/compliment?format=json
```

LICENSE
-------

[License](LICENSE)
