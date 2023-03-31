// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Veritru {

    struct Article {
        string ipfs_cid;
        bool exists;
        mapping(address => bool) hasVoted;
        mapping(address => bool) votes;
        address[] voters;
    }

    mapping(string => Article) public articles;

    // function submitArticle(string memory _ipfs_cid) public {
    //     require(bytes(_ipfs_cid).length > 0, "IPFS CID cannot be empty");
    //     require(!articles[_ipfs_cid].exists, "Article with this IPFS CID already exists");

    //     Article storage newArticle = articles[_ipfs_cid];
    //     newArticle.ipfs_cid = _ipfs_cid;
    //     newArticle.exists = true;
    // }

    // // // // // // // // // // // // // //
    // //   CAST VOTE OF THE REVIEWER  // //
    // // // // // // // // // // // // //
    function vote(string memory _ipfs_cid, bool _vote) public {
        Article storage article = articles[_ipfs_cid];

        // Check if the article exists, if not, create it
        // After that, it proceeds with the vote
        if (!article.exists) {
            require(bytes(_ipfs_cid).length > 0, "IPFS CID cannot be empty");

            article.ipfs_cid = _ipfs_cid;
            article.exists = true;
        }
        
        // If article already exists, continue to vote
        // Check if reviewer already voted
        require(!article.hasVoted[msg.sender], "You have already voted for this article");

        article.votes[msg.sender] = _vote;
        article.hasVoted[msg.sender] = true;
        article.voters.push(msg.sender);
    }

    // // // // // // // // // // // // // //
    // //   GET VOTE OF THE REVIEWER   // //
    // // // // // // // // // // // // //
    function getVote(string memory _ipfs_cid, address _voter) public view returns (bool) {
        Article storage article = articles[_ipfs_cid];
        return article.votes[_voter];
    }

    // // // // // // // // // // // // //
    // //    GET TOTAL TRUE VOTES   // //
    // // // // // // // // // // // //
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

    // // // // // // // // // // // // //
    // //   GET TOTAL FALSE VOTES   // //
    // // // // // // // // // // // //
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

    // // // // // // // // // //
    // //   TOTAL VOTES    // //
    // // // // // // // // //
    function getTotalVotes(string memory _ipfs_cid) public view returns (uint) {
        Article storage article = articles[_ipfs_cid];

        if (!article.exists) {
            return 0;
        }
        return article.voters.length;
    }

    // // // // // // // // // // // // // // // // // // // // // // //
    // //   OUTCOME OF THE VOTES BASED ON MAJORITY VOTING MODEL   // //
    // // // // // // // // // // // // // // // // // // // // // //
    function getArticleOutcome(string memory _ipfs_cid) public view returns (string memory) {
        Article storage article = articles[_ipfs_cid];
        require(article.exists, "Article with this IPFS CID does not exist");

        uint trueVotes = 0;
        uint falseVotes = 0;
        for (uint i = 0; i < article.voters.length; i++) {
            address voter = article.voters[i];
            if (article.votes[voter]) {
                trueVotes++;
            } else {
                falseVotes++;
            }
        }

        uint totalVotes = trueVotes + falseVotes;
        uint threshold = totalVotes / 2;

        if (trueVotes > threshold) {
            return "True";
        } else if (falseVotes > threshold) {
            return "False";
        } else {
            return "Undetermined";
        }
    }
}
