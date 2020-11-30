sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("acc.fin.ar.controller.Add", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf acc.fin.ar.view.Add
		 */
		onInit: function() {
			var oLocalModel = new JSONModel({
				"productData": {
								"PRODUCT_ID": "",
								"TYPE_CODE": "PR",
								"CATEGORY": "Notebooks",
								"NAME": "My Data",
								"DESCRIPTION": "New Supersonic Laptop",
								"SUPPLIER_ID": "0100000046",
								"SUPPLIER_NAME": "SAP",
								"PRICE": "999.00",
								"CURRENCY_CODE": "EUR",
								"DIM_UNIT": "CM"
							}
				}
			);
			this.getView().setModel(oLocalModel,"localView");
		},
		onSave: function(){
			var oDataModel = this.getView().getModel();
			var localData = this.getView().getModel("localView").getProperty("/productData");
			oDataModel.create("/ProductSet", localData, {
				success: function(data){
					MessageToast.show("Wow, Your prodct Saved in SAP!");
				},
				error: function(){
					MessageToast.show("OOPS!! something is not right");
				}
			});
		},
		suppPopup: null,
		onSelectValue: function(oEvent){
				var selectedItem = oEvent.getParameter("selectedItem");
				var sTitle = selectedItem.getLabel();
				this.inpField.setValue(sTitle);
		},
		onValueHelp: function(oEvent){
			this.inpField = oEvent.getSource();
			
			if(!this.suppPopup){
				this.suppPopup = sap.ui.xmlfragment("acc.fin.ar.fragments.popup", this);
				this.suppPopup.bindAggregation("items",{
					path: "/SupplierSet",
					template: new sap.m.DisplayListItem({
						label: "{BP_ID}",
						value: "{COMPANY_NAME}"
					})
				});
				this.suppPopup.setMultiSelect(false);
				this.suppPopup.setTitle("Supplier Data");
				this.getView().addDependent(this.suppPopup);
				
			}
			this.suppPopup.open();
		},
		onMostExp: function(){
			var oDataModel = this.getView().getModel();
			var that = this;
			oDataModel.callFunction("/GetMostExpensiveProduct",{
				urlParameters:{
					"I_CATEGORY"	: "Notebooks"
				},
				success: function(data){
					that.getView().getModel("localView").setProperty("/productData", data);
				},
				error: function(){
					
				}
			});
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf acc.fin.ar.view.Add
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf acc.fin.ar.view.Add
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf acc.fin.ar.view.Add
		 */
		//	onExit: function() {
		//
		//	}

	});

});