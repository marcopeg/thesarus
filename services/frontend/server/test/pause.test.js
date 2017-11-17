/* eslint-env node, mocha */
/* eslint
    import/no-extraneous-dependencies: off,
    func-names: off,
    prefer-arrow-callback: off,
    no-unused-expressions: off
*/

import { expect } from 'chai'
import pause from '../src/lib/pause'

describe('lib/pause.js', function () {
    it('should resolve after a given timemout', function (done) {
        const start = Date.now()
        const delay = 5

        pause(delay)
            .then(() => {
                expect(Date.now() - start >= delay).to.be.true
                done()
            })
            .catch(done)
    })
})
