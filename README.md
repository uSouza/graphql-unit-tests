# GraphQL Unit Tests Project

GraphQL Unit Tests is a graphQL nodejs API with unit tests in your resolvers.

## Installation

This application can be executed with [docker](https://www.docker.com).

In the root directory of application, execute:

```bash
npm install
```
Add this lines bellow in your etc/hosts file
```bash
127.0.0.1	api.local.com
127.0.0.1	mongodb.local.com
```
After this steps, your application must be available in  api.local.com
## Usage
Run the application containers with command bellow:
```bash
docker-compose up
```
Run the unit tests with command:
```bash
npm run test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
