// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Veritru {

    struct Article {
        string ipfs_cid;
        bool exists;
        mapping(address => bool) hasVoted;
        mapping(address => bool) votes;
        mapping(address => int) confidenceLevel;
        mapping(address => uint) expScore;
        int[] confidenceLevels;
        uint[] expScores;
        address[] voters;
    }

    mapping(string => Article) public articles;
    string[] public articleCIDs;

    function vote(string memory _ipfs_cid, bool _vote, int _confidence, uint _expScore) public {
        require(_confidence >= -1 && _confidence <= 1, "Confidence level must be between -1 and 1");
        
        Article storage article = articles[_ipfs_cid];

        // Check if the article exists, if not, create it
        // After that, it proceeds with the vote
        if (!article.exists) {
            require(bytes(_ipfs_cid).length > 0, "IPFS CID cannot be empty");

            article.ipfs_cid = _ipfs_cid;
            article.exists = true;
            articleCIDs.push(_ipfs_cid);
        }
        
        // If article already exists, continue to vote
        // Check if reviewer already voted
        require(!article.hasVoted[msg.sender], "You have already voted for this article");

        article.votes[msg.sender] = _vote;
        article.confidenceLevel[msg.sender] = _confidence;
        article.expScore[msg.sender] = _expScore;
        article.confidenceLevels.push(_confidence);
        article.expScores.push(_expScore);
        article.hasVoted[msg.sender] = true;
        article.voters.push(msg.sender);
    }

    function getVote(string memory _ipfs_cid, address _voter) public view returns (bool) {
        Article storage article = articles[_ipfs_cid];
        return article.votes[_voter];
    }

    function getConfidenceLevel(string memory _ipfs_cid, address _voter) public view returns (int) {
        Article storage article = articles[_ipfs_cid];
        return article.confidenceLevel[_voter];
    }

    function getExpScore(string memory _ipfs_cid, address _voter) public view returns (uint) {
        Article storage article = articles[_ipfs_cid];
        return article.expScore[_voter];
    }

    function getTrueVotes(string memory _ipfs_cid) public view returns (uint) {
        Article storage article = articles[_ipfs_cid];

        if (!article.exists) {
            return 0;
        }

        uint trueVotes = 0;
        for (uint i = 0; i < article.voters.length; i++) {
            address voter = article.voters[i];
            if (article.votes[voter]) {
                trueVotes++;
            }
        }
        return trueVotes;
    }

    function getFalseVotes(string memory _ipfs_cid) public view returns (uint) {
        Article storage article = articles[_ipfs_cid];

        if (!article.exists) {
            return 0;
        }

        uint falseVotes = 0;
        for (uint i = 0; i < article.voters.length; i++) {
            address voter = article.voters[i];
            if (!article.votes[voter]) {
                falseVotes++;
            }
        }
        return falseVotes;
    }

    function getTotalVotes(string memory _ipfs_cid) public view returns (uint) {
        Article storage article = articles[_ipfs_cid];

        if (!article.exists) {
            return 0;
        }
        return article.voters.length;
    }

    function getConfidenceLevels(string memory _ipfs_cid) public view returns (int[] memory) {
        Article storage article = articles[_ipfs_cid];

        if (!article.exists) {
            return new int[](0);
        }

        return article.confidenceLevels;
    }

    function getExpScores(string memory _ipfs_cid) public view returns (uint[] memory) {
        Article storage article = articles[_ipfs_cid];

        if (!article.exists) {
            return new uint[](0);
        }

        return article.expScores;
    }

    function getTotalArticles() public view returns (uint) {
        return articleCIDs.length;
    }
}
