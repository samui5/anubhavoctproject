sap.ui.define([
	"acc/fin/ar/controller/BaseController",
	"acc/fin/ar/util/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("acc.fin.ar.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf acc.fin.ar.view.View1
		 */
		onInit: function() {
			//this.oRouter = this.getOwnerComponent().getRouter();
			Controller.prototype.onInit.apply(this);
			
			this.oRouter.getRoute("spiderman").attachMatched(this.herculis, this);
		},
		herculis: function(oEvent){
			var sScooby = oEvent.getParameters().arguments.scooby;
			var Items = this.getView().byId("myFruits").getItems();
			for(var i=0;i<Items.length;i++){
				var sPath = Items[i].getBindingContextPath();
				if(sPath.indexOf(sScooby) !== -1){
					Items[i].setSelected(true);
					break;
				}
			}
		},
		formatter: formatter,
		onSearch: function(oEvent){
			//Read the value from screen what user enetered when Search is pressed
			var sValue = oEvent.getParameter("query");
			if(!sValue){ 
				sValue = oEvent.getParameter("newValue");
			}
			//We need list control object
			var oList = this.getView().byId("myFruits");
			if(sValue.indexOf("-") !== -1){
				//read call to read a single product
				var oDataModel = this.getView().getModel();
				oDataModel.read("/ProductSet('" + sValue + "')",{
					success: function(data){
						//here is your popup code will come
						var oDialog = new sap.m.Dialog({
							content: [
								new sap.ui.layout.form.SimpleForm({
									content: [
										new sap.m.Label({text: "ID"}),
										new sap.m.Text({text: data.PRODUCT_ID}),
										new sap.m.Label({text: "Name"}),
										new sap.m.Text({text: data.NAME}),
										new sap.m.Label({text: "Supplier"}),
										new sap.m.Text({text: data.SUPPLIER_NAME})
									]
								})	
							],
							title: "Product Checklist",
							endButton: new sap.m.Button({
								text: "Close",
								press: function(){
									oDialog.close();
								}
							})
						});
						oDialog.open();
					},
					error: function(oErr){
						debugger;
					}
				});
			}else{
				//Get The items binding - we need to filter items
				var oItems = oList.getBinding("items");
				//Construct a filter object
				var oFilter = new sap.ui.model.Filter("CATEGORY", sap.ui.model.FilterOperator.Contains, sValue);
				//var oFilter2 = new sap.ui.model.Filter("type", sap.ui.model.FilterOperator.Contains, sValue);
				var oFilterMega = new sap.ui.model.Filter({
					filters: [oFilter],
					and: false
				});
				//var oSorter = new sap.ui.model.Sorter("name");
				
				//Inject this to the binding of items
				oItems.filter([oFilter]);
				//oItems.sort(oSorter);
			}
			
		},
		onAdd: function(){
			this.oRouter.navTo("add");
		},
		onSelectionChange: function(oEvent){
			var aSelItems = oEvent.getParameter("listItems")	;
			for (var i=0; i<aSelItems.length; i++) {
				var oItem = aSelItems[i];
				console.log(oItem.getTitle());
			}
		},
		onNextItem: function(oEvent){
			var selectedItem = oEvent.getParameter("listItem");
			var sPath = selectedItem.getBindingContextPath();
			// var oParent =  this.getView().getParent().getParent();
			// var oView2 = oParent.getDetailPages()[1];
			// oView2.bindElement(sPath);
			//"/fruits/10" --> split by slash and take last item
			var sIndex = sPath.split("/")[sPath.split("/").length - 1];
			this.onNext(sIndex);
		},
		onNext: function(fruitNo){
			//alert("the functionlity is under development");
			//navigate to view2?
			// console.log(this.reusableMethod(5,3));
			// var oAppCon = this.getView().getParent().getParent();
			// oAppCon.toDetail("idAnil");
			this.oRouter.navTo("spiderman",{
				scooby: fruitNo
			});
		},
		onDelete: function(oEvent){
			var toBeDeleted = oEvent.getParameter("listItem");
			var oList = oEvent.getSource();
			oList.removeItem(toBeDeleted);
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf acc.fin.ar.view.View1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf acc.fin.ar.view.View1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf acc.fin.ar.view.View1
		 */
		//	onExit: function() {
		//
		//	}

	});

});