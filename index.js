const PORT = process.env.PORT || 8888;

//CREATE THE APP OBJECT
const express = require("express");

// TO GET DATA FROM LINK, http client
const axios = require("axios");

// TO PARSE THE HTML DATA
const cheerio = require("cheerio");

const app = express();
// globa variable
let lesfactures = [];
//()  ()  ()

app.get("/", (req, res) => {
  res.json("this an api made just for COSIDER recrutement test");
});

const fetching = function (res) {
  axios
    .get(
      "https://raw.githubusercontent.com/elhoussam/Challenges/main/Very%20easy/006%20-%20Invoices/db.json"
    )
    .then((response) => {
      const html = response.data;
      lesfactures = html;
      // console.log(html);
      res.json(lesfactures);
      // const $ = cheerio.load(html);
      // $("pre", html).each(function () {
      //   const all = $(this).text();
      //   console.log(all);
      //   lesfactures.push(all);
      // });
      // res.json(lesfactures);
    })
    .catch((err) => console.log(err));
};
app.get("/invoices", (req, res) => {
  // scraping data online
  fetching(res);
});

app.get("/invoices/:invoiceID", (req, res) => {
  fetching(res);

  const ID = req.params.invoiceID;

  if (!ID) res.json({});
  console.log(ID);
  // lesfactures.find();
  let facture = lesfactures.find((fact) => fact.InvoiceID === ID);
  console.log(facture);
  if (!facture) res.json({});
  res.json(facture);
});

app.listen(PORT, () => console.log(" server here "));
