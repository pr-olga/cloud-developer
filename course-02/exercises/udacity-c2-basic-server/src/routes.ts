import { Request, Response } from 'express';
import { Car, cars as cars_list } from './cars';

module.exports = (app: any) => {
  let cars:Car[]  = cars_list;

  // Root URI call
  app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  // Get a greeting to a specific person
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get( "/persons/:name",
    ( req: Request, res: Response ) => {
      let { name } = req.params;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get( "/persons/", ( req: Request, res: Response ) => {
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as
  // an application/json body to {{host}}/persons
  app.post( "/persons",
    async ( req: Request, res: Response ) => {

      const { name } = req.body;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  // @TODO Add an endpoint to GET a list of cars
  // it should be filterable by make with a query paramater
  // /cars?make=the_make
  app.get( "/cars/", ( req: Request, res: Response ) => {
    let { make } = req.query;

    try {
      if (!make) {
        return res.status(200).send(cars);
      }

      return res.status(200).send(cars.filter(c => c['make'] === make));
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured.'
      })
    }

    return res.status(200).send(`response`);
  } );


  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found
  // /cars/:id
  app.get( "/cars/:id", ( req: Request, res: Response ) => {
    let { id } = req.params;

    try {
      if (!id) {
        return res.status(400).send(`id is required`);
      }

      return cars.find(c => c['id'] === Number(id))
      ? res.status(200).send(cars.find(c => c['id'] === Number(id)))
      : res.status(404).send('car is not found');
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured.'
      })
    }

    return res.status(200).send(`response`);
  } );

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
}