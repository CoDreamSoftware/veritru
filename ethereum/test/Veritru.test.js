const Veritru = artifacts.require('Veritru')

contract('Veritru', (accounts) => {
    let veritru

    beforeEach(async () => {
        veritru = await Veritru.new()
    })

    it('should vote for a new article', async () => {
        const ipfsCID = 'Qm123'
        await veritru.vote(ipfsCID, true, { from: accounts[0] })
        const articleExists = await veritru.articles(ipfsCID)
        assert(articleExists.exists, 'Article should exist after voting')
    })

    it('should not allow voting twice for the same article', async () => {
        const ipfsCID = 'Qm123'
        await veritru.vote(ipfsCID, true, { from: accounts[0] })

        try {
            await veritru.vote(ipfsCID, false, { from: accounts[0] })
            assert.fail('Should not be able to vote twice')
        } catch (error) {
            assert(
                error.message.includes(
                    'You have already voted for this article'
                ),
                'Error should be about voting twice'
            )
        }
    })

    it('should get the vote of a reviewer for an article', async () => {
        const ipfsCID = 'Qm123'
        await veritru.vote(ipfsCID, true, { from: accounts[0] })

        const vote = await veritru.getArticleVote(ipfsCID, accounts[0])
        assert(vote, 'Vote should be true')
    })

    it('should count true and false votes for an article', async () => {
        const ipfsCID = 'Qm123'
        await veritru.vote(ipfsCID, true, { from: accounts[0] })
        await veritru.vote(ipfsCID, true, { from: accounts[1] })
        await veritru.vote(ipfsCID, false, { from: accounts[2] })

        const trueVotes = await veritru.getArticleTrueVotes(ipfsCID)
        const falseVotes = await veritru.getArticleFalseVotes(ipfsCID)

        assert.equal(trueVotes.toNumber(), 2, 'True votes count should be 2')
        assert.equal(falseVotes.toNumber(), 1, 'False votes count should be 1')
    })

    it('should get the total votes for an article', async () => {
        const ipfsCID = 'Qm123'
        await veritru.vote(ipfsCID, true, { from: accounts[0] })
        await veritru.vote(ipfsCID, true, { from: accounts[1] })
        await veritru.vote(ipfsCID, false, { from: accounts[2] })

        const totalVotes = await veritru.getArticleTotalVotes(ipfsCID)
        assert.equal(totalVotes.toNumber(), 3, 'Total votes count should be 3')
    })

    it('should get the outcome of the votes for an article', async () => {
        const ipfsCID = 'Qm123'
        await veritru.vote(ipfsCID, true, { from: accounts[0] })
        await veritru.vote(ipfsCID, true, { from: accounts[1] })
        await veritru.vote(ipfsCID, false, { from: accounts[2] })

        const outcome = await veritru.getArticleOutcome(ipfsCID)
        assert.equal(outcome, 'True', "Outcome should be 'True'")

        // Add more votes
        await veritru.vote(ipfsCID, false, { from: accounts[3] })

        const outcome2 = await veritru.getArticleOutcome(ipfsCID)
        assert.equal(
            outcome2,
            'Undetermined',
            "Outcome should be 'Undetermined'"
        )

        // Add one more false vote
        await veritru.vote(ipfsCID, false, { from: accounts[4] })

        const outcome3 = await veritru.getArticleOutcome(ipfsCID)
        assert.equal(outcome3, 'False', "Outcome should be 'False'")
    })
})
