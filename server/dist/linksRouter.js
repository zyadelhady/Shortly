"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const Links_1 = require("./Links");
const uniqid_1 = __importDefault(require("uniqid"));
const router = express_1.Router();
function testIfValidURL(str) {
    const pattern = new RegExp('^https?:\\/\\/' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
router.route('/').post(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const LinksRepository = typeorm_1.getConnection().getRepository(Links_1.Link);
            const { url } = req.body;
            if (!url) {
                return res.status(400).json({ error: 'please add url' });
            }
            if (!testIfValidURL(url)) {
                return res.status(400).json({ error: 'invalid url' });
            }
            const slug = uniqid_1.default();
            const link = yield LinksRepository.create({ url, slug });
            const results = yield LinksRepository.save(link);
            res.status(200).json({ data: { results } });
        }
        catch (e) {
            return res.status(400).json({ error: e.toString() });
        }
    });
});
router.route('/:slug').get(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const LinksRepository = typeorm_1.getConnection().getRepository(Links_1.Link);
            const { slug } = req.params;
            if (!slug) {
                return res.status(400).json({ error: 'please add slug' });
            }
            const link = yield LinksRepository.findOne({ slug });
            if (!link)
                return res.status(400).json({ error: 'there is no link with this id' });
            res.redirect(`${link.url}`);
        }
        catch (e) {
            return res.status(400).json({ error: e.toString() });
        }
    });
});
exports.default = router;
