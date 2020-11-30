sap.ui.define(["sap/ui/model/json/JSONModel"], function(JSONModel){
	return {
		createFruitModel: function(){
			var oFruitModel = new JSONModel();
			oFruitModel.loadData("models/mockdata/demoData.json");
			return oFruitModel;
		}	
	};
});