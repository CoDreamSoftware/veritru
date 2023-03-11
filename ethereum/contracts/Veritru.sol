// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.0 < 0.9.0;

contract Veritru {
    struct Reviewer {
        address account_address;
        string username;
        uint tenure;
        uint organization;
        uint role;
        uint frequency;
        uint accuracy;
    }

    mapping(address => Reviewer) public reviewers;
    address[] public reviewerMappingKeys;

    // // // // // // // // // // // //
    //  WHEN REGISTER AS REVIEWER  //
    // // // // // // // // // // //
    function createReviewer(
        address _account_address,
        string memory _username,
        uint _tenure, 
        uint _organization, 
        uint _role
    ) public {
        Reviewer storage v = reviewers[msg.sender];
        reviewerMappingKeys.push(msg.sender);
        v.account_address = _account_address;
        v.username = _username;
        v.tenure = _tenure;
        v.organization = _organization;
        v.role = _role;
    }

    function getReviewer(address _addr) public view returns (
        address, string memory, uint, uint, uint
    ) {
        Reviewer memory v = reviewers[_addr];
        return (
            v.account_address,
            v.username,
            v.tenure,
            v.organization,
            v.role
        );
    }

    function getAllReviewers() public view returns (Reviewer[] memory){
        Reviewer[] memory result = new Reviewer[](reviewerMappingKeys.length);
        for (uint i = 0; i < reviewerMappingKeys.length; i++) {
            result[i] = reviewers[reviewerMappingKeys[i]];
        }
        return result;
    }

    // // // // // // // // // // // // // // // //
    //  IF REVIEWED AN ARTICLE, ADD FREQUENCY  //
    // // // // // // // // // // // // // // //
    function setFrequency(uint _frequency) public {
        Reviewer storage v = reviewers[msg.sender];
        v.frequency += _frequency;
    }

    function getFrequency(address _addr) public view returns (uint) {
        Reviewer storage v = reviewers[_addr];
        return v.frequency;
    }

    // // // // // // // // // // // // // // // // // // // //
    //  IF ARTICLE IS FACTUAL SET ACCURACY + 1 OTHERWISE 0 //
    // // // // // // // // // // // // // // // // // // //
    function setAccuracy(uint _accuracy) public {
        Reviewer storage v = reviewers[msg.sender];
        v.accuracy += _accuracy;
    }

    function getAccuracy(address _addr) public view returns (uint) {
        Reviewer storage v = reviewers[_addr];
        return v.accuracy;
    }

    // // // // // // // // // // // //
    // WHEN SUBMITTING NEW ARTICLE //
    // // // // // // // // // // //
    address[] public deployedArticles;

    function createArticle(string memory ipfs_cid, string memory headline) public {
        address newArticle = address(new Article(ipfs_cid, headline, msg.sender));
        deployedArticles.push(newArticle);
    }

    function getDeployedArticles() public view returns (address[] memory) {
        return deployedArticles;
    }

    // // // // // // // // // // // // // //
    //  COMPUTE REVIEWER EXP = EXP SCORE  //
    // // // // // // // // // // // // //
    function calcExpScore(address _addr) public view returns (uint) {
        Reviewer memory v = reviewers[_addr];
        return v.tenure + v.organization + v.role;
    }

    // // // // // // // // // // // // // // // // // // //
    //  COMPUTE ACCURACY / FREQUENCY = REPUTATION SCORE  //
    // // // // // // // // // // // // // // // // // //
    function calcReputationScore(address _addr) public view returns (uint) {
        Reviewer memory v = reviewers[_addr];
        return (v.accuracy / v.frequency);
    }
}

contract Article {
    string public ipfs_cid;
    string public headline;
    address public creator;

    constructor (
        string memory _ipfs_cid,
        string memory _headline,
        address _creator
    ) {
        ipfs_cid = _ipfs_cid;
        headline = _headline;
        creator = _creator;
    }

    struct Voter {
        bool voted;
        uint vote;
        int confidence;
    }

    uint votesTrue;
    uint votesFalse;
    mapping(address => Voter) public voters;
    Veritru public veritru;
    string public result;

    function getArticleDetails() public view returns (
        address, string memory, string memory, string memory
    ) {
        return (creator, ipfs_cid, headline, result);
    }

    function setVote(bool _vote, int _confidence) public {
        require(!voters[msg.sender].voted, "You already voted.");
        require(_confidence >= -1 && _confidence <= 1, "Invalid confidence level.");

        voters[msg.sender].voted = true;
        voters[msg.sender].confidence = _confidence;

        if (_vote) {
            if (_confidence == 1) {
                votesTrue += 2;
            } else if (_confidence == 0) {
                votesTrue += 1;
            } else {
                votesTrue += 0;
            }
        } else {
            if (_confidence == 1) {
                votesFalse += 2;
            } else if (_confidence == 0) {
                votesFalse += 1;
            } else {
                votesFalse += 0;
            }
        }

        veritru.setFrequency(1);
        validate();
    }

    function getTrueVotes() public view returns (uint) {
        return votesTrue;
    }

    function getFalseVotes() public view returns (uint) {
        return votesFalse;
    }

    function getVoteSum() public view returns (uint) {
        return votesTrue + votesFalse;
    }

    // // // // // // // // // // // // // //
    //           COMPUTE OUTCOME         //
    // // // // // // // // // // // // //
    function validate() public {
        // uint expScore = articleStorage.calcExpScore();
        // uint repScore = articleStorage.calcReputationScore();

        uint totalVotes = getVoteSum();
        uint threshold = totalVotes / 2;

        if (votesTrue > threshold) {
            result = "The vote passed.";
        } else if (votesFalse > threshold) {
            result = "The vote failed.";
        } else {
            result = "The vote is tied.";
        }
    }

    function getResult() public view returns (string memory) {
        return result;
    }
}