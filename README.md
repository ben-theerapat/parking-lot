# Parking lot

[![Build Status](https://app.travis-ci.com/OoI3enZaoo/parking-lot.svg?branch=master)](https://app.travis-ci.com/OoI3enZaoo/parking-lot)
[![Coverage Status](https://coveralls.io/repos/github/OoI3enZaoo/parking-lot/badge.svg?branch=master)](https://coveralls.io/github/OoI3enZaoo/parking-lot?branch=master)

# Assumption
```
- Scenario: free parking lot without human intervention.
- parking lot:
  - can create unlimited parking lots.
  - can set the number of slots in each parking lot.
- car
  - the car must park at the same slot size only.
- size:
  - slots sizes: small, medium, large.
  - car sizes: small, medium, large.
- pricing: free.

```

## Running the API
### Development

- Install [Node.js 15.12.0](https://nodejs.org/en/) 
- Update the environment variables in .env file (you can see the example in `.env.example`) 
- Run `npm install`
- Run `npm run start:dev`

### Production
- Install [Docker](https://github.com/docker)
- Install [Docker Compose](https://github.com/docker/compose)
- Run `docker-compose up -d` 


## Test Scripts

Tests are written using [Jest](https://jestjs.io/) and can be run using
```
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

*for production you have to run `docker exec -it parkinglot_api sh` before running test scripts*

## Document APIs
- `Swagger`: Once the application is running you can visit [http://localhost:3000/api](http://localhost:3000/api) to see the Swagger interface.
- `Postman`: https://documenter.getpostman.com/view/1178609/Uyr5oK1W


## MongoDB Databases
```
 - parkingLots
        - _id
        - rank
        - name
        - slots
          - smalls
            - slotId
            - isAvailable
          - mediums
            - slotId
            - isAvailable
          - larges
            - slotId
            - isAvailable
        - createdAt
 - tickets
        - _id
        - parkingLotId
        - slotId
        - plateNumber
        - carSize
        - exitAt
        - createdAt
```
## API Endpoints

- POST `/parkinglot` 
to create parking lot
- POST `/car/park` 
 to park a car in a parking lot

-  POST `/car/exit`
to check out a parking

-  GET `/car/status`
to get available slots of all parking slots

-  GET `/ticket?vehicleSize=large`
to get ticket


## TODOs
- [x] E2E test
- [x] Unit test
- [ ] [JWT](https://jwt.io/introduction) for Authentication
- [ ] Example for client use
- [ ] Dockerfile for development


  

## Reference

- [The official Nestjs documentation](https://docs.nestjs.com/first-steps)

- [Testing](https://docs.nestjs.com/fundamentals/testing)
