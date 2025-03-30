import { expect } from 'chai'
import { createSandbox, SinonStub } from 'sinon'
import { HTTPTransport, queryStringify } from './HTTPTransport'

describe('HTTPTransport', () => {
  const sandbox = createSandbox()
  let http: HTTPTransport
  let request: SinonStub

  beforeEach(() => {
    http = new HTTPTransport({ baseUrl: 'https://ya.ru' })
    request = sandbox.stub(http, 'request').callsFake(() => Promise.resolve({} as XMLHttpRequest))
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should create a query with primitives', () => {
    const query = queryStringify({ a: 1, b: '2', c: true })

    expect(query).to.equal('?a=1&b=2&c=true')
  })

  it('should create a query string with array', () => {
    const query = queryStringify({ a: [1, 2, 3], b: '2' })

    expect(query).to.equal('?a=1,2,3&b=2')
  })

  it('should be created', () => {
    expect(http).to.be.instanceOf(HTTPTransport)
  })

  it('should make a GET request', () => {
    const url = '/test'
    const options = { data: { a: 1, b: '2' } }

    http.get(url, options)

    expect(request.calledWithMatch(url, { ...options, method: 'GET' })).to.be.equal(true)
  })

  it('should make a POST request', () => {
    const url = '/test'
    const options = { data: { a: 1, b: '2' } }

    http.post(url, options)

    expect(request.calledWithMatch(url, { ...options, method: 'POST' })).to.be.equal(true)
  })

  it('should make a PUT request', () => {
    const url = '/test'
    const options = { data: { a: 1, b: '2' } }

    http.put(url, options)

    expect(request.calledWithMatch(url, { ...options, method: 'PUT' })).to.be.equal(true)
  })

  it('should make a DELETE request', () => {
    const url = '/test'
    const options = { data: { id: 1 } }

    http.delete(url, options)

    expect(request.calledWithMatch(url, { ...options, method: 'DELETE' })).to.be.equal(true)
  })
})
