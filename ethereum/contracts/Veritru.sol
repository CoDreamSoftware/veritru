// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.0 < 0.9.0;

contract Veritru {
    struct Reviewer {
        address reviewer_address;
        string username;
        uint tenure;
        uint organization;
        uint role;
        uint frequency;
        uint accuracy;
    }

    struct Article {
        address uploader;
        string ipfs_cid;
        string headline;
        string category;
        string result;
    }

    struct Vote {
        address voter;
        bool voted;
        string ipfs_cid;
        int vote;
        int confidence;
    }

    mapping(address => Reviewer) public reviewers;
    mapping(string => Article) public articles;
    mapping(address => Vote) public votes;

    // // // // // // // // // // // //
    // //      FOR REVIEWER      // //
    // // // // // // // // // // //
    address[] public reviewerMappingKeys;

    function createReviewer(
        address _reviewer_address,
        string memory _username,
        uint _tenure, 
        uint _organization, 
        uint _role
    ) public {
        Reviewer storage v = reviewers[msg.sender];
        reviewerMappingKeys.push(msg.sender);
        v.reviewer_address = _reviewer_address;
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
            v.reviewer_address,
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

    // // // // // // // // // // // //
    // //      FOR ARTICLE      // //
    // // // // // // // // // // //
    string[] public articleMappingKeys;

    function createArticle(
        address _uploader,
        string memory _ipfs_cid,
        string memory _headline,
        string memory _category
    ) public {
        Article storage v = articles[_ipfs_cid];
        articleMappingKeys.push(_ipfs_cid);
        v.uploader = _uploader;
        v.ipfs_cid = _ipfs_cid;
        v.headline = _headline;
        v.category = _category;
    }

    function getArticle(string memory _ipfs_cid) public view returns (
        address, string memory, string memory, string memory
    ) {
        Article memory v = articles[_ipfs_cid];
        return (
            v.uploader,
            v.ipfs_cid,
            v.headline,
            v.category
        );
    }

    function getAllArticles() public view returns (Article[] memory){
        Article[] memory result = new Article[](articleMappingKeys.length);
        for (uint i = 0; i < articleMappingKeys.length; i++) {
            result[i] = articles[articleMappingKeys[i]];
        }
        return result;
    }

    // // // // // // // // // // // //
    // //        FOR VOTE        // //
    // // // // // // // // // // //
    address[] public voteMappingKeys;
    int public totalVotes;

    function setVote(
        string memory _ipfs_cid,
        int _vote, 
        int _confidence
    ) public {
        Vote storage v = votes[msg.sender];
        voteMappingKeys.push(msg.sender);

        v.voter = msg.sender;
        v.voted = true;

        v.ipfs_cid = _ipfs_cid;
        v.vote = _vote;
        v.confidence = _confidence;

        totalVotes += _vote;
        setFrequency(1);
    }

    function getVote(address _addr) public view returns (
        address, bool, string memory, int, int
    ) {
        Vote memory v = votes[_addr];
        return (
            v.voter,
            v.voted,
            v.ipfs_cid,
            v.vote,
            v.confidence
        );
    }

    function getAllVotes() public view returns (Vote[] memory) {
        Vote[] memory result = new Vote[](voteMappingKeys.length);
        for (uint i = 0; i < voteMappingKeys.length; i++) {
            result[i] = votes[voteMappingKeys[i]];
        }
        return result;
    }

    function getSumVotes() public view returns (int) {
        return totalVotes;
    }

    // // // // // // // // // // // // // //
    // //      FREQUENCY OF VOTE       // //
    // // // // // // // // // // // // //
    function setFrequency(uint _frequency) public {
        Reviewer storage v = reviewers[msg.sender];
        v.frequency += _frequency;
    }

    function getFrequency(address _addr) public view returns (uint) {
        Reviewer memory v = reviewers[_addr];
        return v.frequency;
    }

    // // // // // // // // // // // // // //
    // //       ACCURACY OF VOTE       // //
    // // // // // // // // // // // // //
    function setAccuracy(uint _accuracy) public {
        Reviewer storage v = reviewers[msg.sender];
        v.accuracy += _accuracy;
    }

    function getAccuracy(address _addr) public view returns (uint) {
        Reviewer memory v = reviewers[_addr];
        return v.accuracy;
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

    // // // // // // // // // // // 
    // //       RESULT        // //
    // // // // // // // // // //
    function setResult(
        string memory _ipfs_cid, 
        string memory _result
    ) public {
        Article storage v = articles[_ipfs_cid];
        v.result = _result;
    }

    function getResult(
        string memory _ipfs_cid
    ) public view returns (string memory) {
        Article memory v = articles[_ipfs_cid];
        return v.result;
    }
}