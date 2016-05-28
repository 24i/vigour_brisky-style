'use strict'
require('brisky-core').prototype.inject(require('../'))

const test = require('tape')
const s = require('vigour-state/s')
const render = require('brisky-core/render')

test('static styles', function (t) {
  var elem = render({
    style: {
      padding: '100px'
    }
  })

  t.equals(elem.style.padding, '100px', 'add style property')

  elem = render({
    style: {
      padding: '100px',
      margin: '50px'
    }
  })

  t.true(
    (elem.style.padding === '100px') &&
    (elem.style.margin === '50px'),
    'add multiple styles')

  t.end()
})

test('state styles', function (t) {
  var elem = render({
    style: {
      display: {
        $: 'thing'
      }
    }
  }, {
    thing: 'none'
  })

  t.equals(elem.style.display, 'none', 'add display property using state')

  const state = s({
    thing: 'none'
  })

  elem = render({
    $: 'thing',
    style: {
      display: {
        $: true
      }
    }
  }, state)

  t.equals(elem.style.display, 'none', 'add display property using state true')

  state.set({
    thing: 'block'
  })

  t.equals(elem.style.display, 'block', 'add display property using state true, update')

  t.end()
})

test('context styles', function (t) {
  var elem = render({
    types: {
      thing: {
        $: 'thing',
        foo: {
          style: {
            display: {
              $: true,
              $transform (val) {
                return val
              }
            }
          }
        }
      }
    },
    a: {
      type: 'thing'
    },
    b: {
      type: 'thing'
    }
  }, {
    thing: 'none'
  })

  t.equals(elem.childNodes[0].childNodes[0].style.display, 'none', 'add display property using state')
  t.end()
})
