export const testController = async (req, res, next) => {
  const { name } = req?.body;
  if (!name) {
    next("Please provide your name.");
    return;
  }
  res.status(200).send(`Your name is ${name}`);
};
