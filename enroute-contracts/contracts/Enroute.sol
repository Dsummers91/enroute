pragma solidity ^0.4.19;

import './Identity.sol';

contract Enroute {
  address public owner;
  mapping (bytes32 => Shipment) shipments;
  Identity public identity;

  struct Shipment {
    uint state;
  }

  constructor(address _identity) {
    owner = msg.sender;  
    identity = Identity(_identity);
  }
  
  function confirmShipment(bytes32 _shipment) canShip(_shipment) {
    shipments[_shipment].state += 1; 
  }


  modifier canShip(bytes32 _shipment) {
    uint state = shipments[_shipment].state;
    require(identity.getAccess(this, msg.sender, state));
    _;
  }
}
