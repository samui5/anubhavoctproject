sap.ui.define(
	["sap/ui/core/mvc/Controller"],
	function(Controller){
		return 	Controller.extend("acc.fin.ar.controller.BaseController",{
			
			
			oCore: sap.ui.getCore(),
			
			anubhav: "demo",
			onInit: function(){
				this.oRouter = this.getOwnerComponent().getRouter();	
			},
			
			reusableMethod: function(a,b){
				return a + b;	
			}
			
		});
});