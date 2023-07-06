// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import mongoose from "mongoose";
import AccountModel from "./Database/AccountSchema.js";
import SupportModel from "./Database/SupportsSchemaa.js"

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);
mongoose.connect("mongodb://0.0.0.0:/Account");

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());
//--------------------------------------starting pont------

app.post("/api/Account", async (req, res) => {

  const data = req.body;
  const session = res.locals.shopify.session;
  const shop = session.shop;
  data["shop"] = shop;

  await AccountModel.findOneAndUpdate({ _id: data?._id }, { selected: true });
  // await AccountModel.findOne({ _id: data?._id });
  const user = new AccountModel(data);
  try {
    await user.save();
    res.status(200).send({ message: "Data Save Successfully" });
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/Account/:id", async (req, res) => {
  const accountId = req.params.id;
  const updatedData = req.body;
  const session = res.locals.shopify.session;

  const shop = session.shop;
  updatedData["shop"] = shop;

  try {
    const updatedUser = await AccountModel.findByIdAndUpdate(
      accountId,
      updatedData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("Account not found");
    }

    res.send("Data updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});






app.get("/api/Account", async (req, res) => {
  const data = await AccountModel.find();
  try {
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(console.log("Error"));
  }
});

app.delete("/api/delete", async (req, res) => {
  const id = req.body
  const condition = { _id: { $in: id } };
  // console.log(id)
  // await AccountModel.findByIdAndDelete(id).exec()
  await AccountModel.deleteMany(condition).exec()

  res.send("delete")

})


app.delete("/api/Select", async (req, res) => {
  const { ids } = req.body;
  console.log(ids, "THERE IS AN ID");
  const condition = { _id: { $in: ids } };

  await AccountModel.updateMany(condition, { selected: false }).exec();
  res.send("delete");
});

//--------------------------------------------------------------------------------------------------------------------------------------
app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));
console.log(`SERVER IS RUNNING ${PORT}`);

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
