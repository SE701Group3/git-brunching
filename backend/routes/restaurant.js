import express from 'express';
import bodyParser from 'body-parser';

import connection from '../database';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 *
 * /restaurant:
 *   get:
 *     description: Fetch a restaurant object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         in: query
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns restaurant object
 */
router.get('/', (req, res) => {
  const input = req.query;

  if (!input.restaurantID) {
    res.status(400).json({ error: '/restaurant GET endpoint needs a restaurantID query param' });
    return;
  }

  connection.query('SELECT * FROM RESTAURANT WHERE ID = ? ', [req.query.restaurantID], (error, results) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.json(results);
  });
});

// Gets specific restaurant opening hours, used by front end to build restaurant opening hours for end user.
router.get('/openhours', (req, res) => {
  const input = req.query;
  if (!input.restaurantID) {
    res.status(400).json({ error: '/restaurant/openhours GET endpoint needs a restaurantID query param' });
    return;
  }

  connection.query(
    'SELECT DayOfWeek, OpenTime, CloseTime from HOURS WHERE RestaurantID = ?;', [input.restaurantID],
    (error, results) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json(results);
    }
  );
});

// Gets all restaurants ID and name from database. Used to get all available restaurants by front end.
router.get('/getall', (req, res) => {
  const input = req.query;

  if (JSON.stringify(input) !== '{}') {
    res.status(400).json({ error: '/restaurant/getall GET endpoint needs no query param' });
    return;
  }

  connection.query(
    'SELECT * FROM RESTAURANT',
    (error, results) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json(results);
    }
  );
});

/**
 * @swagger
 *
 * /restaurant:
 *   post:
 *     description: Adds a restaurant object to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of restaurant
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully added restaurant to database
 */
router.post('/', (req, res) => {
  const { body } = req;

  if (!body.name) {
    res.status(400).json({ error: '/restaurant POST endpoint needs name body param' });
    return;
  }

  connection.query('INSERT INTO RESTAURANT (`Name`) VALUES (?);', [body.name], error => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.json('added');
  });
});

/**
 * @swagger
 *
 * /restaurant:
 *   delete:
 *     description: Deletes a restaurant object to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         in: query
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted restaurant to database
 */
router.delete('/', (req, res) => {
  const input = req.query;

  if (!input.restaurantID) {
    res.status(400).json({ error: '/restaurant DELETE endpoint needs a restaurantID' });
    return;
  }

  connection.query('DELETE FROM RESTAURANT WHERE ID=?;', [input.restaurantID], error => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.json('deleted');
  });
});

/**
 * @swagger
 *
 * /restaurant/{restaurantID}/reservations:
 *   get:
 *     description: gets a collection of reservations for a given restaurant
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved
 */
router.get('/:restaurantID/reservations', (req, res) => {
  const id = req.params.restaurantID;

  if (!id) {
    res.status(400).json({ error: `path param: ${id} malformed` });
    return;
  }

  connection.query(
    'SELECT * FROM RESERVATION WHERE RestaurantID = ?', [id],
    (error, results) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json(results);
    }
  );
});

export default router;
