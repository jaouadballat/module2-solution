(function(){
  'use strict';
  angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController )
        .controller('AlreadyBoughtController', AlreadyBoughtController )
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController (ShoppingListCheckOffService){
    var toBuy = this;
    toBuy.getItems = function(){
      try {
        return ShoppingListCheckOffService.getToBuyItems();
      } catch (e) {
        toBuy.msg = e.message;
        console.log(e.message);
    }
  }

  toBuy.buyItem = function(indexItem){
  console.log('Buy item');
        return ShoppingListCheckOffService.buyItem(indexItem);
  }
}
  function AlreadyBoughtController (ShoppingListCheckOffService){
    var alreadyBought = this;
    alreadyBought.items = function(){
      try {
        alreadyBought.msge = null;
        return ShoppingListCheckOffService.getBoughtItems();

      } catch (e) {
        alreadyBought.msge  = e.message;
        console.log(e.message);
      }
    }

  }

  function ShoppingListCheckOffService(){
    var service = this;
    var shoppingListItem = [
      {name: "Zotrol 100mg", quantity: 3},
      {name: "Zyloric A00mg", quantity : 4},
      {name: "Cortoncyl 5mg", quantity: 13 },
      {name: "Prezar 50mg", quantity: 10},
      {name: "Serolex 10mg", quantity: 12}
    ];

    var boughtItems = [];

    service.getToBuyItems = function(){
      if(shoppingListItem.length == 0){
      throw new Error('Everything is bought!');
      }else{
        return shoppingListItem;
      }
    }

    service.getBoughtItems = function(){
      if(boughtItems.length == 0){
        throw new Error('Nothing bought yet');
      }else{
        return boughtItems;
      }
    }

    service.buyItem = function(indexItem){
      var item = shoppingListItem[indexItem];
      boughtItems.push(item);
      shoppingListItem.splice(indexItem, 1);

    }
  }

})();
