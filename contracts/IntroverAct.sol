// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DatingContract {
    address public owner;
    address public ram;
    address public sita;
    uint256 public requestAmount;
    bool public ramRequested;
    bool public sitaPaid;
    bool public ramAccepted;
    bool public sitaAccepted;
    bool public photosConfirmed;
bool public lock;
    constructor(address _ram, address _sita) {
        owner = msg.sender;
        ram = _ram;
        sita = _sita;
        requestAmount = 0.3 ether; // Change the value as needed
    }

    modifier onlyRamSita() {
        require(msg.sender == ram || msg.sender == sita, "Only Ram or Sita can perform this action");
        _;
    }

    modifier bothAccepted() {
        require(ramAccepted && sitaAccepted, "Both Ram and Sita must accept the request");
        _;
    }

    modifier notConfirmed() {
        require(!photosConfirmed, "Photos already confirmed");
        _;
    }

    function sendRequest() external onlyRamSita {
        require(msg.sender == ram, "Only Ram can send the request");
        require(!ramRequested, "Ram already requested");
        ramRequested = true;
    }

    function acceptRequest() external onlyRamSita {
        require(msg.sender == sita, "Only Sita can accept the request");
        require(sitaPaid, "Sita must pay before accepting");
        sitaAccepted = true;
    }

    function sendPayment() external payable onlyRamSita {
        require(msg.sender == ram, "Only Ram can send payment");
        require(ramRequested, "Ram must request before sending payment");
        require(msg.value == requestAmount, "Please send the correct amount of Ether");
        ramAccepted = true;
    }

    function paySita() external payable onlyRamSita {
        require(msg.sender == sita, "Only Ram can pay Sita");
        require(ramAccepted, "Ram must accept before paying Sita");
        require(msg.value == requestAmount, "Please send the correct amount of Ether");
        sitaPaid = true;
    }

    function confirmPhotos() external payable bothAccepted notConfirmed {
        require(lock==false,"lock is activating");
        require(msg.sender == owner, "Only the contract owner can confirm photos");
        photosConfirmed = true;

        uint256 totalAmount = address(this).balance;
        uint256 serviceFee = (totalAmount * 2) / 100;
        uint256 remainingAmount = totalAmount - serviceFee;
        lock=true;
        payable(owner).transfer(serviceFee);
        payable(ram).transfer(remainingAmount / 2);
        payable(sita).transfer(remainingAmount / 2);
        lock=false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    receive() external payable {
        // Empty receive function to accept Ether
    }
}
