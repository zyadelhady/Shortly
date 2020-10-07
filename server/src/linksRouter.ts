import { Router } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { Link } from './Links';
import { Request, Response } from 'express';
import uniqueId from 'uniqid';

const router = Router();

function testIfValidURL(str: string) {
  const pattern = new RegExp(
    '^https?:\\/\\/' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator

  return !!pattern.test(str);
}

router.route('/').post(async function (req: Request, res: Response) {
  try {
    const LinksRepository = getConnection().getRepository(Link);

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'please add url' });
    }
    if (!testIfValidURL(url)) {
      return res.status(400).json({ error: 'invalid url' });
    }

    const slug = uniqueId();

    const link = await LinksRepository.create({ url, slug });
    const results = await LinksRepository.save(link);
    res.status(200).json({ data: { results } });
  } catch (e) {
    return res.status(400).json({ error: e.toString() });
  }
});

router.route('/:slug').get(async function (req: Request, res: Response) {
  try {
    const LinksRepository = getConnection().getRepository(Link);

    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ error: 'please add slug' });
    }

    const link = await LinksRepository.findOne({ slug });
    if (!link)
      return res.status(400).json({ error: 'there is no link with this id' });

    res.redirect(`${link.url}`);
  } catch (e) {
    return res.status(400).json({ error: e.toString() });
  }
});

export default router;
