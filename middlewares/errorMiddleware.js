export const errorMiddleware = (err, req, res, next) => {
  res.status(500).send({
    success: false,
    message: "Something went wrong!",
    err,
  });
};
