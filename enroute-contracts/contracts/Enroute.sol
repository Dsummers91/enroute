pragma solidity ^0.4.19;

import './Identity.sol';

contract Enroute {
  address public owner;
  mapping (bytes32 => Shipment) shipments;
  Identity public identity;

  enum Actor {
    Manufacturer,
    DeliveryTruck,
    Supermarket
  }

  struct Shipment {
    Actor currentOwner;
  }

  constructor(address _identity) {
    owner = msg.sender;  
    identity = Identity(_identity);
  }
  
  function confirmShipment(bytes32 _shipment) canShip(_shipment) {
    
  }


  modifier canShip(bytes32 _shipment) {
    uint state = uint(shipments[_shipment].currentOwner);
    require(identity.getAccess(this, msg.sender, state));
    _;
  }
}
