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
import { addSelectedAccount } from "./helpers/addSelectedAccount.js";
import SettingModel from "./Database/Gen-Setting.js";

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

app.use(express.json());

app.post("/api/setting/general", async (req, res) => {
  const data = req.body;
  // const session = res.locals.shopify.session;
  // const shop = session.shop;
  // data["shop"] = shop;
  try {
    if (!data) {
      const user = new SettingModel(data);
      await user.save();
      res.status(200).send({ message: "Settings Saved Successfully" });
    } else {
      await SettingModel.findOneAndUpdate({}, data, { upsert: true });
      res.status(200).send({ message: "Settings Updated Successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/api/setting/general", async (req, res) => {
  const data = await SettingModel.find();
  try {
    res.status(200).send({ data });
  } catch (err) {
    res.status(400).send({ message: "Error" });
  }
});

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js
app.use("/api/*", shopify.validateAuthenticatedSession());

//--------------------------------------starting pont------

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

app.delete("/api/delete", async (req, res) => {
  const id = req.body;
  const condition = { _id: { $in: id } };
  // await AccountModel.findByIdAndDelete(id).exec()
  await AccountModel.deleteMany(condition).exec();

  res.send("delete");
});

app.post("/api/Account", async (req, res) => {
  const data = req.body;
  const session = res.locals.shopify.session;
  const shop = session.shop;
  data["shop"] = shop;
  try {
    await AccountModel.findOneAndUpdate({ _id: data?._id }, { selected: true });
    const user = new AccountModel(data);

    if (data.selected) {
      const allData = await AccountModel.find({ selected: true }); // Fetch all selected data from the database

      const metavalue = {
        namespace: "whatsApp",
        key: "Mobile",
        value: JSON.stringify(allData),
        type: "json",
      };
      const output = await addSelectedAccount(session, metavalue);
      console.log(output);
      if (output) {
        res.status(200).send({ output });
      } else {
        res
          .status(500)
          .send({ output, error: true, message: "ADDING ISSUE IN META FIELD" });
      }
    }

    await user.save();
    res.status(200).send({ message: "Data Save Successfully" });
  } catch (err) {
    console.log(err);
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

app.delete("/api/Select", async (req, res) => {
  const data = req.body;
  const session = res.locals.shopify.session;

  try {
    await AccountModel.findOneAndUpdate(
      { _id: data?._id },
      { selected: false }
    );

    if (!data.selected) {
      const allData = await AccountModel.find({ selected: true }); // Fetch all selected data from the database

      const metavalue = {
        namespace: "whatsApp",
        key: "Mobile",
        value: JSON.stringify(allData),
        type: "json",
      };
      const output = await addSelectedAccount(session, metavalue);
      console.log(output);
      if (output) {
        res.status(200).send({ output });
      } else {
        res
          .status(500)
          .send({ output, error: true, message: "ADDING ISSUE IN META FIELD" });
      }
    }

    const user = new AccountModel(data);
    await user.save();
    res.status(200).send({ message: "Data UnSelected Successfully" });
  } catch (error) {
    res.status(400).json(console.log("Error"));
  }
});

//------------------------------------------------------------------------------
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
