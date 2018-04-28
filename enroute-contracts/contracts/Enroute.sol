pragma solidity ^0.4.19;


contract Enroute {
  address public owner;
  mapping (bytes32 => Shipment) shipments;

  enum Actor {
    Manufacturer,
    DeliveryTruck,
    Supermarket
  }

  struct Shipment {
    Actor currentOwner;
  }

  constructor() {
    owner = msg.sender;
  }
  
  function confirmShipment() {


  }
}
