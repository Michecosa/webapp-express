const connection = require("../database/db");

const index = (req, res) => {
  const sql = `SELECT * FROM movies`;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    for (let i = 0; i < results.length; i++) {
      results[i].image_url =
        req.protocol + "://" + req.get("host") + "/" + results[i].image;
    }

    res.json(results);
  });
};

const show = (req, res) => {
  const { id } = req.params;
  const movieSQL = `SELECT * FROM movies WHERE id=?`;
  const reviewSQL = `
    SELECT R.*
    FROM movies AS M
    JOIN reviews AS R ON M.id = R.movie_id
    WHERE R.movie_id = ?`;

  connection.query(movieSQL, [id], (err, movieResults) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Database query failed", message: err.message });

    if (movieResults.length === 0)
      return res.status(404).json({ error: "Movie not found" });

    const movie = movieResults[0];

    movie.image_url =
      req.protocol + "://" + req.get("host") + "/" + movie.image;

    connection.query(reviewSQL, [id], (err, reviewResults) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Database query failed", message: err.message });

      movie.reviews = reviewResults;
      res.json(movie);
    });
  });
};

module.exports = {
  index,
  show,
};
