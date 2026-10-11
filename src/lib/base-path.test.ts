import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import {
  DEFAULT_SITE_URL,
  normalizeBasePath,
  routerBasename,
  siteRootUrl,
  stripBasePath,
  withBasePath,
} from './base-path.ts'

describe('normalizeBasePath', () => {
  it('falls back to the root when nothing is provided', () => {
    assert.equal(normalizeBasePath(undefined), '/')
    assert.equal(normalizeBasePath(''), '/')
    assert.equal(normalizeBasePath('/'), '/')
  })

  it('always wraps the sub-path with slashes', () => {
    assert.equal(normalizeBasePath('sachadvr.fr'), '/sachadvr.fr/')
    assert.equal(normalizeBasePath('/sachadvr.fr'), '/sachadvr.fr/')
    assert.equal(normalizeBasePath('/sachadvr.fr/'), '/sachadvr.fr/')
    assert.equal(normalizeBasePath('//a/b//'), '/a/b/')
  })
})

describe('routerBasename', () => {
  it('drops the trailing slash but keeps the root', () => {
    assert.equal(routerBasename('/'), '/')
    assert.equal(routerBasename('/sachadvr.fr/'), '/sachadvr.fr')
  })
})

describe('stripBasePath', () => {
  it('leaves paths untouched on a root deployment', () => {
    assert.equal(stripBasePath('/en/cgu', '/'), '/en/cgu')
    assert.equal(stripBasePath('', '/'), '/')
  })

  it('removes the sub-path prefix', () => {
    assert.equal(stripBasePath('/sachadvr.fr/', '/sachadvr.fr/'), '/')
    assert.equal(stripBasePath('/sachadvr.fr', '/sachadvr.fr/'), '/')
    assert.equal(stripBasePath('/sachadvr.fr/en/cgu', '/sachadvr.fr/'), '/en/cgu')
  })

  it('does not strip a prefix that only shares the same start', () => {
    assert.equal(stripBasePath('/sachadvr.fr-old/en', '/sachadvr.fr/'), '/sachadvr.fr-old/en')
  })
})

describe('withBasePath', () => {
  it('leaves paths untouched on a root deployment', () => {
    assert.equal(withBasePath('/', '/'), '/')
    assert.equal(withBasePath('/en', '/'), '/en')
    assert.equal(withBasePath('en', '/'), '/en')
  })

  it('places language prefixes under the sub-path', () => {
    assert.equal(withBasePath('/', '/sachadvr.fr/'), '/sachadvr.fr/')
    assert.equal(withBasePath('/en', '/sachadvr.fr/'), '/sachadvr.fr/en')
    assert.equal(withBasePath('/ja/cgu', '/sachadvr.fr/'), '/sachadvr.fr/ja/cgu')
  })

  it('is the inverse of stripBasePath', () => {
    const base = '/sachadvr.fr/'
    assert.equal(stripBasePath(withBasePath('/zh/links', base), base), '/zh/links')
  })
})

describe('siteRootUrl', () => {
  it('defaults to the canonical domain', () => {
    assert.equal(siteRootUrl(undefined, '/'), DEFAULT_SITE_URL)
    assert.equal(siteRootUrl('', '/'), DEFAULT_SITE_URL)
  })

  it('ignores the sub-path when the deploy origin is unknown', () => {
    assert.equal(siteRootUrl(undefined, '/sachadvr.fr/'), DEFAULT_SITE_URL)
  })

  it('joins the deploy origin and the sub-path without trailing slash', () => {
    assert.equal(siteRootUrl('https://sachadvr.github.io', '/sachadvr.fr/'), 'https://sachadvr.github.io/sachadvr.fr')
    assert.equal(siteRootUrl('https://sachadvr.github.io/', '/sachadvr.fr'), 'https://sachadvr.github.io/sachadvr.fr')
    assert.equal(siteRootUrl('https://example.com', '/'), 'https://example.com')
  })
})
