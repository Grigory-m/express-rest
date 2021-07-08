# RS School REST service

# Express
---

|              |                                  |                                         |
|--------------|----------------------------------|-----------------------------------------|
| Requests     | [total, rate, throughput]        | 6000, 50.01, 49.99                      |
| Duration     | [total, attack, wait]            | 2m, 2m, 54.862µs                        |
| Latencies    | [min, mean, 50, 90, 95, 99, max] | 222.6ms, 63.3ms, 1.43s, 2.53s, 4.1s     |
| Success      | [ratio]                          | 100.00%                                 |
| Status Codes | [code:count]                     | 200:3600  201:1200  204:1200            |


# Fastify
---

|              |                                  |                                         |
|--------------|----------------------------------|-----------------------------------------|
| Requests     | [total, rate, throughput]        | 6000, 50.01, 49.97                      |
| Duration     | [total, attack, wait]            | 2m, 2m, 95.158µs                        |
| Latencies    | [min, mean, 50, 90, 95, 99, max] | 439.5ms, 88.9ms, 2.6s, 4.1s, 5.63s      |
| Success      | [ratio]                          | 100.00%                                 |
| Status Codes | [code:count]                     | 200:3600  201:1200  204:1200            |

## Docker

- run application with command: <kbd>docker-compose up</kbd> 

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
