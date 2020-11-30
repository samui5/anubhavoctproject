sap.ui.define(["sap/ui/core/UIComponent",
			   "acc/fin/ar/models/model"],
			function(UIComponent, Models){
				//Component was missing in Component Declaration
				return UIComponent.extend("acc.fin.ar.Component",{
					metadata: {
						manifest: "json"
					},
					init: function(){
						//Call the SAP's Super class constructor
						UIComponent.prototype.init.apply(this);
						//Later now we can use free stuff from parent
						var oRouter = this.getRouter();
						oRouter.initialize(); //seek for Routing configuration
					}
					// createContent: function(){
						
					// 	var oAppView = new sap.ui.view({
					// 		viewName: "acc.fin.ar.view.App",
					// 		type: "XML"
					// 	});
						
					// 	// var oFruitModel = Models.createFruitModel();
					// 	// oAppView.setModel(oFruitModel);
						
					// 	var oView1 = new sap.ui.view("idMukesh",{
					// 		viewName: "acc.fin.ar.view.View1",
					// 		type: "XML"
					// 	});
						
					// 	var oAppCon = oAppView.byId("idAppCon");
					// 	oAppCon.addMasterPage(oView1);

					// 	var oEmpty = new sap.ui.view("idEmpty",{
					// 		viewName: "acc.fin.ar.view.Empty",
					// 		type: "XML"
					// 	});
						
					// 	oAppCon.addDetailPage(oEmpty);
						
					// 	var oView2 = new sap.ui.view("idAnil",{
					// 		viewName: "acc.fin.ar.view.View2",
					// 		type: "XML"
					// 	});
						
					// 	oAppCon.addDetailPage(oView2);
						
					// 	return oAppView;
					// }
				});
});