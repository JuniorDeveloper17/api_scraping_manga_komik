'user strict';

const responses = require('../res/response');
const axios = require('axios');
const cheerio = require('cheerio');

exports.index = function (req, res) {
    responses.succes('api employeed v.1.0', res);
};

exports.get_by_kategory = async function (req, res) {
    const kategory = req.params.kategory;
    const response = await axios.get(`https://komiku.id/daftar-komik/?tipe=${kategory}`);
    const html = await response.data;
    const $ = cheerio.load(html);

    const title = [];
    const image = [];
    const status = [];
    const type = [];
    const updateAt = [];
    const url = [];

    $('.ls4 .ls4v a img').each((index, element) => {
        const value = $(element).attr('data-src');
        image.push(value);
    });

    $('.ls4 .ls4v a').each((index, element) => {
        const value = $(element).attr('href');
        url.push(value);
    });

    $('.ls4 .ls4j h4 a').each((index, element) => {
        const value = $(element).text();
        title.push(value);
    });

    $('.ls4 .ls4j span').each((index, element) => {
        const value = $(element).text();
        if (value.includes('Status')) {
            status.push(value);
        }
    });

    $('.ls4 .ls4j span').each((index, element) => {
        const value = $(element).text();
        if (value.includes('Update')) {
            updateAt.push(value);
        }
    });

    $('.ls4 .ls4j span').each((index, element) => {
        const value = $(element).text().toLowerCase();
        if (value.includes(`${kategory}`)) {
            type.push(value);
        }
    });

    const api = [];
    for (var i = 0; i < Math.min(title.length, image.length); i++) {
        var obj = {
            "title": title[i],
            "image": image[i],
            "status": status[i],
            "tipe": type[i],
            "updateAt": updateAt[i],
            "url": url[i]
        };
        api.push(obj);
    }

    responses.succes(api, res);
}

exports.search = async function (req, res) {
    const key = req.params.key;
    const response = await axios.get(`https://data.komiku.id/cari/?post_type=manga&s=${key}`);
    const html = await response.data;
    const $ = cheerio.load(html);

    const title = [];
    const image = [];
    const url = [];
    const type = [];
    const deskripsi = [];

    $('.daftar .bge .bgei img').each((index, element) => {
        const value = $(element).attr('data-src');
        image.push(value);
    });

    $('.daftar .bge .bgei a').each((index, element) => {
        const value = $(element).attr('href');
        url.push(value);
    });

    $('.daftar .bge .bgei .tpe1_inf').each((index, element) => {
        const value = $(element).text().trim();
        type.push(value);
    });

    $('.daftar .bge .kan a h3').each((index, element) => {
        const value = $(element).text().trim();
        title.push(value);
    });

    $('.daftar .bge .kan p').each((index, element) => {
        const value = $(element).text().trim();
        deskripsi.push(value);
    });

    const api = [];
    for (var i = 0; i < Math.min(title.length, image.length); i++) {
        var obj = {
            "title": title[i],
            "image": image[i],
            "tipe": type[i],
            "deskripsi": deskripsi[i],
            "url": url[i]
        };
        api.push(obj);
    }

    responses.succes(api, res);
}

exports.trending_komik = async function (req, res) {
    const response = await axios.get(`https://komiku.id/`);
    const html = await response.data;
    const $ = cheerio.load(html);

    const title = [];
    const image = [];
    const type = [];
    const url = [];
    const like = [];

    $('#Trending_Komik .ls12 .ls2 .ls2v a img').each((index, element) => {
        const value = $(element).attr('data-src');
        image.push(value);
    });

    $('#Trending_Komik .ls12 .ls2 .ls2v a').each((index, element) => {
        const value = $(element).attr('href');
        url.push(value);
    });

    $('#Trending_Komik .ls12 .ls2 .ls2v .vw').each((index, element) => {
        const value = $(element).text().trim();
        like.push(value);
    });

    $('#Trending_Komik .ls12 .ls2 .ls2j h4').each((index, element) => {
        const value = $(element).text().trim();
        title.push(value);
    });

    $('#Trending_Komik .ls12 .ls2 .ls2j .ls2t').each((index, element) => {
        const value = $(element).text().trim();
        type.push(value);
    });

    const api = [];
    for (var i = 0; i < Math.min(title.length, image.length); i++) {
        var obj = {
            "title": title[i],
            "image": image[i],
            "tipe": type[i],
            "like": like[i],
            "url": url[i]
        };
        api.push(obj);
    }

    responses.succes(api, res);
}

exports.popular = async function (req, res) {
    const response = await axios.get(`https://komiku.id/`);
    const html = await response.data;
    const $ = cheerio.load(html);

    const title = [];
    const image = [];
    const type = [];
    const url = [];
    const like = [];

    $('#Komik_Hot .ls12 .ls2 .ls2v a img').each((index, element) => {
        const value = $(element).attr('data-src');
        image.push(value);
    });

    $('#Komik_Hot .ls12 .ls2 .ls2v a').each((index, element) => {
        const value = $(element).attr('href');
        url.push(value);
    });

    $('#Komik_Hot .ls12 .ls2 .ls2v .vw').each((index, element) => {
        const value = $(element).text().trim();
        like.push(value);
    });

    $('#Komik_Hot .ls12 .ls2 .ls2j h4').each((index, element) => {
        const value = $(element).text().trim();
        title.push(value);
    });

    $('#Komik_Hot .ls12 .ls2 .ls2j .ls2t').each((index, element) => {
        const value = $(element).text().trim();
        type.push(value);
    });

    const api = [];
    for (var i = 0; i < Math.min(title.length, image.length); i++) {
        var obj = {
            "title": title[i],
            "image": image[i],
            "tipe": type[i],
            "like": like[i],
            "url": url[i]
        };
        api.push(obj);
    }

    responses.succes(api, res);

}

exports.update_terbaru = async function (req, res) {
    const response = await axios.get(`https://komiku.id/`);
    const html = await response.data;
    const $ = cheerio.load(html);

    const title = [];
    const image = [];
    const updateAt = [];
    const chapter = [];
    const url = [];

    $('#Terbaru .ls4 .ls4j h4 a').each((index, element) => {
        const value = $(element).text().trim();
        title.push(value);
    });

    $('#Terbaru .ls4 .ls4j .ls4s').each((index, element) => {
        const value = $(element).text().trim();
        updateAt.push(value);
    });

    $('#Terbaru .ls4 .ls4j .ls24').each((index, element) => {
        const value = $(element).text().trim();
        chapter.push(value);
    });

    $('#Terbaru .ls4 .ls4v a img').each((index, element) => {
        const value = $(element).attr('data-src');
        image.push(value);
    });

    $('#Terbaru .ls4 .ls4v a').each((index, element) => {
        const value = $(element).attr('href');
        url.push(value);
    });

    const api = [];
    for (var i = 0; i < Math.min(title.length, image.length); i++) {
        var obj = {
            "title": title[i],
            "image": image[i],
            "updateAt": updateAt[i],
            "chapter": chapter[i],
            "url": url[i]
        };
        api.push(obj);
    }

    responses.succes(api, res);
}

exports.detail = async function (req, res) {
    const url = req.params.url;
    const response = await axios.get(`https://komiku.id/manga/${url}/`);
    const html = await response.data;
    const $ = cheerio.load(html);




    const title = $('#Judul h1').text().trim();
    const deskripsi = $('#Judul .desc').text().trim();
    const image = $('#Informasi .ims img').attr('src');

    const jenis = $('#Informasi .inftable tr td:eq(3)').map((index, element) => {
        const value = $(element).text().trim();
        return value;
    }).get();

    const konsep = $('#Informasi .inftable tr td:eq(5)').map((index, element) => {
        const value = $(element).text().trim();
        return value;
    }).get();

    const komikus = $('#Informasi .inftable tr td:eq(7)').map((index, element) => {
        const value = $(element).text().trim();
        return value;
    }).get();

    const status = $('#Informasi .inftable tr td:eq(9)').map((index, element) => {
        const value = $(element).text().trim();
        return value;
    }).get();

    const umur_pembaca = $('#Informasi .inftable tr td:eq(11)').map((index, element) => {
        const value = $(element).text().trim();
        return value;
    }).get();

    const genre = [];

    $('#Informasi .genre a').each((index, element) => {
        const value = $(element).text().trim();
        const value2 = $(element).attr('href');

        const obj = {
            "genre": value,
            "url": value2
        }
        genre.push(obj);
    });

    const chapter = [];

    $('#Chapter ._3Rsjq tr:gt(1)').each((index, element) => {
        const value = $(element).children('.judulseries').text().trim();
        const value2 = $(element).children('.tanggalseries').text().trim();
        const value3 = $(element).children('.judulseries').children('a').attr('href');

        const obj = {
            "chapter": value,
            "tanggal": value2,
            "url": value3
        }
        chapter.push(obj);
    });

    const objs = {
        "title": title,
        "image": image,
        "deskripsi": deskripsi,
        "jenis": jenis[0],
        "konsep": konsep[0],
        "komikus": komikus[0],
        "status": status[0],
        "umur_pembaca": umur_pembaca[0],
        "genre": genre,
        "chapter": chapter
    }

    responses.succes(objs, res);
}

exports.baca = async function (req, res) {

    const url = req.params.url;
    const response = await axios.get(`https://komiku.id/ch/${url}/`);
    const html = await response.data;
    const $ = cheerio.load(html);

    const image = [];
    $('#Baca_Komik .ww').each((index, element) => {
        const value = $(element).attr('src');
        image.push(value);
    });

    responses.succes(image, res);
}