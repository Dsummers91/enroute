/// Contains who is who, cause i'm not gonna solve identity this weekend!


pragma solidity ^0.4.19;

contract Identity {
  address public owner;
  mapping(address => bytes4) public interfaces;
  mapping(bytes32 => bool) public access;

  constructor() {
    owner = msg.sender;
  }
  
  // @param type Interface hash of record type
  // @param address address of member looking for access;
  function setAccess(address _member, bool _hasAccess) {
    bytes4 senderInterface = interfaces[msg.sender];
    access[keccak256(senderInterface, _member)] = _hasAccess;
  }

  function setAddressInterface(address _addr, bytes4 _interface) public onlyOwner {
    interfaces[_addr] = _interface;
  }

  function getAccess(address _contract, address _member) public view returns (bool) {
    bytes4 senderInterface = interfaces[_contract];
    return access[keccak256(senderInterface, _member)];
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

}

