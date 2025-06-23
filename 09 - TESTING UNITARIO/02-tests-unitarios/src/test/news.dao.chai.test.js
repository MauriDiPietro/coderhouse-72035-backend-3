//chai + mocha

import { expect } from "chai";
import mongoose from "mongoose";
import DaoMongo from "../persistence/DAOS/mongo/news.mongo.dao.js";

describe("tests unitarios de DaoMongo", () => {
  before(async () => {
    DaoMongo.init();
    await mongoose.connection.collections["news"].drop();
  });

  after(() => console.log("✅ Tests finalizados"));

  const dao = new DaoMongo();

  it('Deberia retornar todas las noticias', async () => {
    const news = await dao.getAllNews();
    expect(news).to.be.an("array");
    expect(news).to.have.lengthOf(0);
    expect(news.length).to.be.equal(0);
  })

  it("Debería crear una nueva noticia", async () => {
    const nuevaNoticia = {
      title: "Noticia de prueba",
      body: "Contenido de la noticia de prueba",
      author: "Autor de prueba",
      image: "https://example.com/image.jpg",
    };

    const noticiaCreada = await dao.createNew(nuevaNoticia);
    expect(noticiaCreada).to.have.property("_id");
    expect(noticiaCreada.title).to.equal(nuevaNoticia.title);
    expect(noticiaCreada.body).to.equal(nuevaNoticia.body);
    expect(noticiaCreada.author).to.equal(nuevaNoticia.author);
    expect(noticiaCreada.image).to.equal(nuevaNoticia.image);
    const allNews = await dao.getAllNews();
    expect(allNews).to.have.lengthOf(1);
  });
});
