sap.ui.define([
	"acc/fin/ar/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, MessageBox, MessageToast, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("acc.fin.ar.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf acc.fin.ar.view.View2
		 */
		onInit: function() {
			//this.oRouter = this.getOwnerComponent().getRouter();
			Controller.prototype.onInit.apply(this);
			this.oRouter.getRoute("spiderman").attachMatched(this.herculis, this);
		},
		herculis: function(oEvent){
			var sScooby = oEvent.getParameters().arguments.scooby;
			this.getView().bindElement("/" + sScooby);
			this.getView().byId("suppData").bindElement("To_Supplier");
			var productId = $.map(sScooby.split("'"), function(substr, i) {
			   return (i % 2) ? substr : null;
			})[0];
			this.getView().byId("myImg").setSrc("/sap/opu/odata/SAP/ZOCT_FIRST_SRV/ProductSet('" + productId + "')/$value");
		},
		//oCore: sap.ui.getCore(),
		onBack: function(){
			var oAppCon = this.getView().getParent();
			oAppCon.to("idMukesh");
		},
		onSave: function(){
			MessageBox.confirm("Are you Enjoying??",{
				title: "Confirmation",
				onClose: this.onClose
			});
		},
		cityPopup: null,
		suppPopup: null,
		inpField: "",
		onSelectValue: function(oEvent){
				var selectedItem = oEvent.getParameter("selectedItem");
				var sTitle = selectedItem.getLabel();
				sap.ui.getCore().byId(this.inpField).setValue(sTitle);
		},
		onValueHelp: function(oEvent){
			this.inpField = oEvent.getSource().getId();
			//lo_alv->set_table_for_first_display
			//MessageBox.confirm("this functionality is under construction");
			if(!this.cityPopup){
				this.cityPopup = sap.ui.xmlfragment("acc.fin.ar.fragments.popup", this);	
				this.cityPopup.bindAggregation("items",{
					path: "/CitySet",
					template: new sap.m.DisplayListItem({
						label: "{LAND1}",
						value: "{LANDX}"
					})
				});
				this.cityPopup.setTitle("Cities Data");
				this.cityPopup.setMultiSelect(false);
				this.getView().addDependent(this.cityPopup);
			}
			this.cityPopup.open();
		},
		onPopupSearch: function(oEvent){
				var toBeSearched = oEvent.getParameter("value");
				var nameOfPopup = oEvent.getParameter("itemsBinding").getPath();
				if(nameOfPopup.indexOf("cities") !== -1){
					var oFilter = new Filter("name", FilterOperator.Contains, toBeSearched);
					this.cityPopup.getBinding("items").filter([oFilter]);
				}else{
					oFilter = new Filter("name", FilterOperator.Contains, toBeSearched);
					this.suppPopup.getBinding("items").filter([oFilter]);
				}
		},
		onFilter: function(){
			//lo_alv->set_table_for_first_display
			//MessageBox.confirm("this functionality is under construction");
			if(!this.suppPopup){
				this.suppPopup = sap.ui.xmlfragment("acc.fin.ar.fragments.popup", this);	
				this.suppPopup.bindAggregation("items",{
					path: "/suppliers",
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{type}"
					})
				});
				this.suppPopup.setTitle("Supplier Data");
				this.getView().addDependent(this.suppPopup);
			}
			this.suppPopup.open();
		},
		onClose:function(check){
			if(check === "OK"){
				MessageToast.show("Yes i trust you that you are practicing and enjoying Roger!!!");
			}
		},
		onCancel: function(){
			MessageBox.error("This is crazy enough to cancel the transaction, i will tell mamma");
		},
		onSupplierSearch: function(oEvent){
			var search = oEvent.getParameter("query");
			var oFilter = new Filter("name", FilterOperator.Contains, search);
			this.getView().byId("suppTab").getBinding("items").filter([oFilter]);
		}
		
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf acc.fin.ar.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf acc.fin.ar.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf acc.fin.ar.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});