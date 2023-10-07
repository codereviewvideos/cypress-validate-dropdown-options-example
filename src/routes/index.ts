import express from "express";
import sortByOptions from "../service/sort-by-options";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.redirect("/check-your-answers");
});

router.get(
  "/check-your-answers",
  (req: express.Request, res: express.Response) => {
    res.render("check-your-answers.njk", {
      selections: req.session.selections,
    });
  },
);

router.get("/sort-by", (req: express.Request, res: express.Response) => {
  const availableOptions = sortByOptions({
    selectedOptions: req.session.selections ?? [],
  });

  res.render("index.njk", {
    availableOptions,
  });
});

router.post("/sort-by", (req: express.Request, res: express.Response) => {
  req.session.selections = [...(req.session.selections || []), req.body.sort];

  res.redirect("/check-your-answers");
});

router.get("/clear", (req: express.Request, res: express.Response) => {
  req.session.selections = [];
  res.redirect("/");
});

export default router;
