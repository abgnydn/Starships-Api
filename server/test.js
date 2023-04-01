const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const app = require("./index");

chai.use(chaiHttp);

const isSorted = (arr, param, order) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let a = arr[i][param];
    let b = arr[i + 1][param];

    if (typeof a === "string") a = a.toLowerCase();
    if (typeof b === "string") b = b.toLowerCase();

    if (isNaN(a) || isNaN(b)) continue; // If the value is unknown or not a number, skip the comparison.

    if (order === "asc" && a > b) return false;
    if (order === "desc" && a < b) return false;
  }
  return true;
};

const testParams = [
  "name",
  "model",
  "manufacturer",
  "cost_in_credits",
  "length",
  "max_atmosphering_speed",
  "crew",
  "passengers",
  "cargo_capacity",
  "consumables",
  "hyperdrive_rating",
  "MGLT",
  "starship_class",
];

testParams.forEach((param) => {
  describe(`GET /starships?sort_by=${param}&order=asc`, () => {
    beforeEach(function (done) {
      this.timeout(10000); // A very long environment setup.
      setTimeout(done, 2500);
    });
    it(`should return a list of starships sorted by ${param} in ascending order`, (done) => {
      chai
        .request(app)
        .get("/starships")
        .query({ sort_by: param, order: "asc" })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe(`GET /starships?sort_by=${param}&order=desc`, () => {
    beforeEach(function (done) {
      this.timeout(10000); // A very long environment setup.
      setTimeout(done, 2500);
    });
    it(`should return a list of starships sorted by ${param} in descending order`, (done) => {
      chai
        .request(app)
        .get("/starships")
        .query({ sort_by: param, order: "desc" })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });
  });
});
