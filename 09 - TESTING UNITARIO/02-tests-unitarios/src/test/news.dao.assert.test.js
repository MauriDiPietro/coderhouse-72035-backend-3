//mocha + assert
import assert from "node:assert";
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
    assert.equal(Array.isArray(news), true);
    assert.equal(news.length, 0);
  })

  it("Debería crear una nueva noticia", async () => {
    const nuevaNoticia = {
      title: "Noticia de prueba",
      body: "Contenido de la noticia de prueba",
      author: "Autor de prueba",
      image: "https://example.com/image.jpg",
    };

    const noticiaCreada = await dao.createNew(nuevaNoticia);
    assert.ok(noticiaCreada._id);
    assert.equal(noticiaCreada.title, nuevaNoticia.title);
    assert.equal(noticiaCreada.body, nuevaNoticia.body);
    assert.equal(noticiaCreada.author, nuevaNoticia.author);
    assert.equal(noticiaCreada.image, nuevaNoticia.image);
    const allNews = await dao.getAllNews();
    assert.equal(allNews.length, 1);
  });
});
